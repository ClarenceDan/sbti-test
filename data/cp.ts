import { CpReport } from '@/types';
import { dimensionMeta, dimensionOrder } from './dimensions';
import { TYPE_LIBRARY } from './types';
import { computeResultFromRawScores } from './scoring';

const SCORE_FORMULAS = [
  '高温互撩',
  '一言不合就来电',
  '稳定冒泡',
  '边拉扯边上头',
  '互相观察中',
  '小心轻放',
];

function describeScore(score: number) {
  if (score >= 86) {
    return {
      headline: '这对不是擦出火花，是直接把实验台点着了。',
      verdict: '高配高反应。只要别把彼此当对手，默契和上头都来得很快。',
      formula: SCORE_FORMULAS[0],
    };
  }

  if (score >= 72) {
    return {
      headline: '有吸引力，也有张力，属于越聊越容易上头的组合。',
      verdict: '属于很适合继续发展的类型。边界感说清楚了，会很有戏。',
      formula: SCORE_FORMULAS[1],
    };
  }

  if (score >= 58) {
    return {
      headline: '有来有回，时灵时不灵，靠经营能慢慢热起来。',
      verdict: '能成，但需要磨合。把误会说开，比拼命猜心思更重要。',
      formula: SCORE_FORMULAS[2],
    };
  }

  if (score >= 42) {
    return {
      headline: '这对的化学反应比较像先起雾，再决定要不要起火。',
      verdict: '拉扯感很强。你们不是没感觉，是需要更高质量的沟通。',
      formula: SCORE_FORMULAS[3],
    };
  }

  if (score >= 28) {
    return {
      headline: '有一点心动，但更多时候像两个人在互相猜说明书。',
      verdict: '建议慢一点。先看能不能尊重彼此的节奏，再谈火花。',
      formula: SCORE_FORMULAS[4],
    };
  }

  return {
    headline: '这不是没有化学反应，这是实验员已经在旁边摇头了。',
    verdict: '不是完全不行，但需要极强的耐心和自觉。不然很容易互相折磨。',
    formula: SCORE_FORMULAS[5],
  };
}

function formatDims(dims: string[]) {
  return dims.map((dim) => dimensionMeta[dim].name.replace(/^[A-Za-z0-9]+\s*/, '')).join('、');
}

export function buildCpReport(encodedA: string, encodedB: string): {
  report: CpReport;
  typeCodeA: string;
  typeCodeB: string;
} {
  const resultA = computeResultFromRawScores(encodedA);
  const resultB = computeResultFromRawScores(encodedB);

  const vectorA = dimensionOrder.map((dim) => resultA.rawScores[dim]);
  const vectorB = dimensionOrder.map((dim) => resultB.rawScores[dim]);

  const distance = vectorA.reduce((sum, score, index) => sum + Math.abs(score - vectorB[index]), 0);
  const chemistryScore = Math.max(12, Math.round((1 - distance / 60) * 100));

  const strongestDims = dimensionOrder
    .map((dim) => ({
      dim,
      diff: Math.abs(resultA.rawScores[dim] - resultB.rawScores[dim]),
      intensity: resultA.rawScores[dim] + resultB.rawScores[dim],
    }))
    .sort((left, right) => left.diff - right.diff || right.intensity - left.intensity)
    .slice(0, 3)
    .map((item) => item.dim);

  const tensionDims = dimensionOrder
    .map((dim) => ({
      dim,
      diff: Math.abs(resultA.rawScores[dim] - resultB.rawScores[dim]),
    }))
    .sort((left, right) => right.diff - left.diff)
    .slice(0, 3)
    .map((item) => item.dim);

  const typeA = TYPE_LIBRARY[resultA.finalType.code];
  const typeB = TYPE_LIBRARY[resultB.finalType.code];
  const scoreInfo = describeScore(chemistryScore);

  const sameWave = strongestDims.length ? formatDims(strongestDims) : '情绪频率';
  const conflictWave = tensionDims.length ? formatDims(tensionDims) : '边界感';

  const vibe = `${typeA.cn}和${typeB.cn}凑在一起，整体是“${scoreInfo.formula}”型反应。你们在${sameWave}上比较容易接上电，所以刚开始就会有一种“这人能听懂我”的感觉。`;
  const strengths = `这组最强的地方，是你们在${sameWave}上的默契不低。${typeA.cn}提供自己的节奏和态度，${typeB.cn}补上另一侧的能量，所以一旦目标一致，推进起来会比普通组合更顺。`;
  const hazards = `最需要小心的是${conflictWave}。这里的差异会让你们在亲密感、节奏感或者表达方式上容易误伤彼此。不是没感情，而是太容易各自默认“我这样很正常”。`;
  const scenario = `高概率名场面是：一开始聊得飞快，越聊越觉得对方有点意思；接着在${conflictWave}附近突然卡壳，一个觉得“你怎么这样”，另一个觉得“你怎么连这个都要管”。但如果愿意说人话，不装懂，这对反而越磨越有戏。`;

  return {
    report: {
      chemistryScore,
      formula: `${resultA.finalType.code} × ${resultB.finalType.code} = ${scoreInfo.formula}`,
      headline: scoreInfo.headline,
      vibe,
      strengths,
      hazards,
      scenario,
      verdict: scoreInfo.verdict,
    },
    typeCodeA: resultA.finalType.code,
    typeCodeB: resultB.finalType.code,
  };
}

export function getRewardCopy(score: number) {
  const rewards = [
    '请你喝奶茶🧋',
    '请你看电影🎬',
    '请你喝咖啡☕',
    '请你吃麦当劳🍟',
    '请你吃肯德基🍗',
    '请我喝奶茶🧋',
    '请我看电影🎬',
    '请我喝咖啡☕',
    '请我吃麦当劳🍟',
    '请我吃肯德基🍗',
  ];

  return rewards[score % rewards.length];
}
