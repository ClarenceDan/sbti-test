import { DEFAULT_LOCALE, LocaleCode, normalizeLocale } from '@/data/brand';

type IntroFaqItem = {
  q: string;
  a: string;
};

type CompareRow = {
  aspect: string;
  mbti: string;
  sbti: string;
};

type ModelSection = {
  title: string;
  desc: string;
};

export type SiteDictionary = {
  htmlLang: string;
  ogLocale: string;
  siteTitle: string;
  siteDescription: string;
  brandSubtitle: string;
  intro: {
    heroChip: string;
    heroKicker: string;
    heroTitleMain: string;
    heroTitleAccent: string;
    heroLead: string;
    heroSubcopy: string;
    statCompleted: string;
    statDurationValue: string;
    statDurationLabel: string;
    statLocalValue: string;
    statLocalLabel: string;
    startTest: string;
    browseTypes: string;
    rankingTitle: string;
    rankingMeasuredSuffix: string;
    rankingRealtime: string;
    rareTitle: string;
    blurb: string;
    whatIsTitle: string;
    whatIsDesc: string;
    typeGalleryTitle: string;
    typeGalleryDesc: string;
    compareTitle: string;
    compareDesc: string;
    faqTitle: string;
    faqDesc: string;
    compareHeaders: {
      aspect: string;
      mbti: string;
      sbti: string;
    };
    compareRows: CompareRow[];
    modelSections: ModelSection[];
    faqItems: IntroFaqItem[];
    inspiration: string;
    entertainmentOnly: string;
    poweredBy: string;
  };
  test: {
    questionLabel: string;
    specialQuestion: string;
    hiddenDimension: string;
    completeHint: string;
    autoHint: string;
    backHome: string;
    previous: string;
    random: string;
    submit: string;
  };
  result: {
    sharedBanner: string;
    sharedAction: string;
    simpleReading: string;
    scoreTitle: string;
    noteTitle: string;
    noteNormal: string;
    noteSpecial: string;
    dnaTitle: string;
    dnaHint: string;
    authorTitle: string;
    authorLines: string[];
    saveMoments: string;
    saveXiaohongshu: string;
    copyShareLink: string;
    copyDna: string;
    copyCpInvite: string;
    goCp: string;
    restart: string;
    home: string;
    qrPending: string;
    momentsSaved: string;
    xiaohongshuSaved: string;
    shareCopied: string;
    dnaCopied: string;
    cpInviteCopied: string;
    saveFailed: string;
    copyFailed: string;
    scoreUnit: string;
  };
  typePage: {
    eyebrow: string;
    backToTest: string;
    startTest: string;
    notFoundTitle: string;
    metadataSuffix: string;
    metadataDescription: string;
  };
  cp: {
    breadcrumb: string;
    title: string;
    descEmpty: string;
    descInvite: string;
    partnerType: string;
    unknownType: string;
    yourDna: string;
    testFirst: string;
    testHint: string;
    or: string;
    inputBoth: string;
    inputPlaceholderA: string;
    inputPlaceholderB: string;
    inputHint: string;
    generate: string;
    copyInvite: string;
    scoreLabel: string;
    vibe: string;
    strengths: string;
    hazards: string;
    scenario: string;
    verdict: string;
    copyReport: string;
    reset: string;
    note: string;
    invalidDna: string;
    failed: string;
    missingDna: string;
    inviteCopied: string;
    reportCopied: string;
  };
};

const englishCompareRows: CompareRow[] = [
  { aspect: 'Theory', mbti: 'Jungian type theory', sbti: '5 satirical behavior models' },
  { aspect: 'Dimensions', mbti: '4 dimensions', sbti: '15 dimensions' },
  { aspect: 'Scoring', mbti: 'Binary choices', sbti: 'Three-level scoring (L/M/H)' },
  { aspect: 'Types', mbti: '16 types', sbti: '26 types + 2 specials' },
  { aspect: 'Tone', mbti: 'Formal', sbti: 'Satirical and playful' },
  { aspect: 'Length', mbti: '93 questions', sbti: '30 questions (3-5 min)' },
  { aspect: 'Price', mbti: 'Official version paid', sbti: 'Free' },
];

const englishFaqItems: IntroFaqItem[] = [
  {
    q: 'Is SBTI accurate?',
    a: 'SBTI is meant for fun. It borrows structure from personality models, but the naming and descriptions are intentionally satirical.',
  },
  {
    q: 'How long does it take?',
    a: 'About 30 questions and roughly 3 to 5 minutes.',
  },
  {
    q: 'Is my data safe?',
    a: 'Most calculations happen in your browser. The site only stores anonymous completion and sharing stats, not your answers or contact details.',
  },
  {
    q: 'Can I share my result?',
    a: 'Yes. The result page can save share cards and copy a direct link.',
  },
  {
    q: 'What is the difference between SBTI and MBTI?',
    a: 'MBTI is more formal. SBTI is a sharper entertainment-style test built around 5 models, 15 dimensions, and 26 satirical archetypes.',
  },
  {
    q: 'How many personality types are there?',
    a: 'There are 26 standard types, plus 1 hidden DRUNK type and 1 fallback HHHH type.',
  },
  {
    q: 'How does the scoring work?',
    a: 'Each dimension has two questions. Scores map into L/M/H and then the system matches the closest 15-dimension pattern.',
  },
];

const englishModelSections: ModelSection[] = [
  { title: 'Self model', desc: 'S1 · S2 · S3' },
  { title: 'Emotion model', desc: 'E1 · E2 · E3' },
  { title: 'Attitude model', desc: 'A1 · A2 · A3' },
  { title: 'Action drive model', desc: 'Ac1 · Ac2 · Ac3' },
  { title: 'Social model', desc: 'So1 · So2 · So3' },
];

const zhDictionary: SiteDictionary = {
  htmlLang: 'zh-CN',
  ogLocale: 'zh_CN',
  siteTitle: 'SBTI 人格测试',
  siteDescription:
    '免费在线 SBTI 人格测试。30 道题、15 个维度、26 种人格类型，支持结果分享图与多语言页面。',
  brandSubtitle: 'SBTI 人格测试',
  intro: {
    heroChip: '15个维度 · 5大模型 · 26种人格',
    heroKicker: '人格测试新物种',
    heroTitleMain: 'SBTI 测试',
    heroTitleAccent: '人格测试',
    heroLead: 'MBTI已经过时，SBTI来了。',
    heroSubcopy:
      '一场荒诞又精准的人格审判，30 道题看穿你的 15 个灵魂维度。不用注册，不用付费，不用交出你的隐私。',
    statCompleted: '已完成测试',
    statDurationValue: '3-5 分钟',
    statDurationLabel: '出结果',
    statLocalValue: '本地出结果',
    statLocalLabel: '匿名统计热度',
    startTest: '开始测试',
    browseTypes: '先看人格类型',
    rankingTitle: '人气排行',
    rankingMeasuredSuffix: '人已测',
    rankingRealtime: '实时体感榜',
    rareTitle: '稀有人格',
    blurb:
      'SBTI（Satirical Behavioral Type Indicator，讽刺行为类型指标）是一款基于 5 大心理模型、15 个人格维度的娱乐型人格测试。它用 30 道精心设计的题目，通过三级评分（L/M/H）和模式匹配算法，为你匹配 26 种独特的人格类型。',
    whatIsTitle: 'SBTI 测试是什么？',
    whatIsDesc: '免费、直给、带点毒舌，但不上传你的数据。',
    typeGalleryTitle: '26 种人格类型',
    typeGalleryDesc: '你会是哪一种？测完才知道。',
    compareTitle: 'SBTI vs MBTI 对比',
    compareDesc: '不是谁更高级，而是谁更敢说真话。',
    faqTitle: '常见问题',
    faqDesc: '把最容易问的都先放这了。',
    compareHeaders: {
      aspect: '对比项',
      mbti: 'MBTI',
      sbti: 'SBTI 测试',
    },
    compareRows: [
      { aspect: '理论基础', mbti: '荣格心理类型理论', sbti: '5大心理模型（自我/情感/态度/行动/社交）' },
      { aspect: '维度数量', mbti: '4 个维度', sbti: '15 个维度' },
      { aspect: '评分方式', mbti: '二分法（E/I, S/N...）', sbti: '三级评分（L/M/H）' },
      { aspect: '类型数量', mbti: '16 种', sbti: '26 种 + 2 种特殊' },
      { aspect: '风格', mbti: '正式、心理学', sbti: '讽刺、娱乐' },
      { aspect: '题目数量', mbti: '93 题', sbti: '30 题（3-5分钟）' },
      { aspect: '费用', mbti: '官方版收费', sbti: '完全免费' },
    ],
    modelSections: [
      { title: '自我模型', desc: 'S1 · S2 · S3' },
      { title: '情感模型', desc: 'E1 · E2 · E3' },
      { title: '态度模型', desc: 'A1 · A2 · A3' },
      { title: '行动驱力模型', desc: 'Ac1 · Ac2 · Ac3' },
      { title: '社交模型', desc: 'So1 · So2 · So3' },
    ],
    faqItems: [
      {
        q: 'SBTI 测试准确吗？',
        a: 'SBTI 仅供娱乐。它基于心理学的五大模型框架设计，但人格类型的命名和描述带有强烈的讽刺风格。请勿将结果用于任何严肃的决策。',
      },
      { q: '测试需要多久？', a: '30 道题，大约 3-5 分钟即可完成。' },
      {
        q: '我的数据安全吗？',
        a: '结果计算主要在浏览器里完成。站点会记录匿名的完成数和分享热度，但不会保存你的答案或联系方式。',
      },
      { q: '可以分享结果吗？', a: '可以。结果页支持保存分享图，也可以复制链接直接发给朋友。' },
      {
        q: 'SBTI 和 MBTI 有什么区别？',
        a: 'MBTI 更偏正式人格分类，SBTI 则是更娱乐、更辛辣的 5 大模型、15 维度人格测试。',
      },
      {
        q: 'SBTI 有多少种人格类型？',
        a: '共 26 种常规人格，再加上 1 个隐藏人格 DRUNK 和 1 个兜底人格 HHHH。',
      },
      {
        q: 'SBTI 测试的评分算法是什么？',
        a: '每个维度两道题，每题 1-3 分，总分映射成 L/M/H，再去匹配最接近的 15 维人格模式。',
      },
    ],
    inspiration: '原始灵感：',
    entertainmentOnly: '本站仅供娱乐',
    poweredBy: 'Powered by',
  },
  test: {
    questionLabel: '第',
    specialQuestion: '补充题',
    hiddenDimension: '维度已隐藏',
    completeHint: '都做完了。现在可以把你的电子魂魄交给结果页审判。',
    autoHint: '每次选完会自动跳到下一题。懒得想时，点“随便选一个”也能继续。',
    backHome: '返回首页',
    previous: '上一题',
    random: '随便选一个',
    submit: '提交并查看结果',
  },
  result: {
    sharedBanner: '你正在查看好友的测试结果',
    sharedAction: '我也要测',
    simpleReading: '该人格的简单解读',
    scoreTitle: '十五维度评分',
    noteTitle: '友情提示',
    noteNormal: '本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。',
    noteSpecial: '本测试仅供娱乐。隐藏人格和傻乐兜底都属于故意埋的损招，请勿把它当成医学或心理学依据。',
    dnaTitle: '人格 DNA',
    dnaHint: '这是你当前结果的 16 位人格编码，可以直接拿去做 CP 配对。',
    authorTitle: '作者的话',
    authorLines: [
      '本测试首发于 B 站 up 主蛆肉儿串儿，初衷是劝诫一位爱喝酒的朋友戒酒。',
      '它本质上是一场娱乐型测试，文案带有夸张和讽刺，请不要把结果上升到严肃判断。',
      '如今这版由本站重新打磨了体验、品牌和分享能力，但灵魂仍旧是那股又损又准的味道。',
    ],
    saveMoments: '保存朋友圈卡片',
    saveXiaohongshu: '保存小红书卡片',
    copyShareLink: '复制分享链接',
    copyDna: '复制人格 DNA',
    copyCpInvite: '复制 CP 邀请',
    goCp: '去测 CP 化学反应',
    restart: '重新测试',
    home: '回到首页',
    qrPending: '二维码还在生成，稍等一下再保存。',
    momentsSaved: '朋友圈分享图已保存',
    xiaohongshuSaved: '小红书分享图已保存',
    shareCopied: '分享链接已复制',
    dnaCopied: '人格 DNA 已复制',
    cpInviteCopied: 'CP 邀请文案已复制',
    saveFailed: '保存失败，请重试',
    copyFailed: '复制失败，请手动复制链接',
    scoreUnit: '分',
  },
  typePage: {
    eyebrow: 'SBTI 人格档案',
    backToTest: '返回测试',
    startTest: '开始测试',
    notFoundTitle: '人格类型未找到',
    metadataSuffix: 'SBTI 人格类型',
    metadataDescription: '查看该人格的简介、长文解读和专属类型页。',
  },
  cp: {
    breadcrumb: 'CP化学反应',
    title: 'CP 化学反应实验室',
    descEmpty: '输入两个人的人格 DNA，看看这段关系是来电还是冒烟。',
    descInvite: '有人想和你测测化学反应',
    partnerType: '对方的人格类型',
    unknownType: '未知类型',
    yourDna: '你的人格 DNA 是？',
    testFirst: '还没测过？先去测试',
    testHint: '30道题 · 3分钟 · 测完自动回来看结果',
    or: '或',
    inputBoth: '输入双方的人格 DNA',
    inputPlaceholderA: '先输入第一个人的 16 位人格 DNA',
    inputPlaceholderB: '粘贴 16 位编码或完整结果链接',
    inputHint: '支持直接粘贴结果链接或 16 位人格 DNA',
    generate: '开测',
    copyInvite: '复制邀请文案',
    scoreLabel: '化学指数',
    vibe: '总体氛围',
    strengths: '互补优势',
    hazards: '爆炸隐患',
    scenario: '名场面预测',
    verdict: '最终判决',
    copyReport: '复制报告链接',
    reset: '换一对测',
    note: '这份 CP 报告是娱乐型人格匹配，不是命运判决书。拿来破冰、发群聊、互相调侃都很合适。',
    invalidDna: '这个 DNA 看起来不太对，请检查后再试。',
    failed: '化学反应实验失败了，请稍后再试。',
    missingDna: '请输入 16 位人格 DNA，或者直接粘贴结果链接。',
    inviteCopied: 'CP 邀请链接已复制',
    reportCopied: 'CP 报告链接已复制',
  },
};

const enDictionary: SiteDictionary = {
  htmlLang: 'en',
  ogLocale: 'en_US',
  siteTitle: 'SBTI Personality Test',
  siteDescription:
    'Free online SBTI personality test with 30 questions, 15 dimensions, 26 types, share cards, and multilingual landing pages.',
  brandSubtitle: 'SBTI Personality Test',
  intro: {
    heroChip: '15 dimensions · 5 models · 26 types',
    heroKicker: 'A sharper kind of personality test',
    heroTitleMain: 'SBTI Test',
    heroTitleAccent: 'Personality Test',
    heroLead: 'If MBTI feels old, SBTI hits harder.',
    heroSubcopy:
      'A weirdly accurate personality roast built from 30 questions and 15 inner dimensions. No signup, no paywall, no extra personal data.',
    statCompleted: 'tests finished',
    statDurationValue: '3-5 min',
    statDurationLabel: 'to get your result',
    statLocalValue: 'Browser-first result',
    statLocalLabel: 'anonymous popularity stats',
    startTest: 'Start test',
    browseTypes: 'Browse the types first',
    rankingTitle: 'Popular types',
    rankingMeasuredSuffix: 'people tested',
    rankingRealtime: 'Live vibe ranking',
    rareTitle: 'Rare types',
    blurb:
      'SBTI, or Satirical Behavioral Type Indicator, is an entertainment-first personality quiz built on 5 models and 15 dimensions. It uses 30 deliberate prompts plus L/M/H matching to map you to one of 26 signature types.',
    whatIsTitle: 'What is the SBTI test?',
    whatIsDesc: 'Free, fast, sharp-tongued, and light on data collection.',
    typeGalleryTitle: '26 personality types',
    typeGalleryDesc: 'Which one are you? The test will decide.',
    compareTitle: 'SBTI vs MBTI',
    compareDesc: 'Not about being more official. About being more brutally honest.',
    faqTitle: 'FAQ',
    faqDesc: 'Quick answers before you start.',
    compareHeaders: {
      aspect: 'Category',
      mbti: 'MBTI',
      sbti: 'SBTI',
    },
    compareRows: englishCompareRows,
    modelSections: englishModelSections,
    faqItems: englishFaqItems,
    inspiration: 'Original inspiration:',
    entertainmentOnly: 'For entertainment only',
    poweredBy: 'Powered by',
  },
  test: {
    questionLabel: 'Question',
    specialQuestion: 'Bonus question',
    hiddenDimension: 'Dimension hidden',
    completeHint: 'All done. Hand your digital soul over to the result screen.',
    autoHint: 'Each answer jumps to the next question automatically. If you cannot decide, the random button keeps things moving.',
    backHome: 'Back home',
    previous: 'Previous',
    random: 'Pick one for me',
    submit: 'See my result',
  },
  result: {
    sharedBanner: 'You are viewing a friend’s result',
    sharedAction: 'Take the test too',
    simpleReading: 'Quick read',
    scoreTitle: '15-dimension scores',
    noteTitle: 'Friendly warning',
    noteNormal: 'This test is just for fun. Do not use it as a diagnosis, hiring tool, dating rulebook, breakup trigger, or life sentence.',
    noteSpecial: 'This is still just for fun. The hidden and fallback types are intentional jokes, not medical or psychological evidence.',
    dnaTitle: 'Personality DNA',
    dnaHint: 'This 16-character code represents your current result and can be used for the CP chemistry match.',
    authorTitle: 'From the creator',
    authorLines: [
      'This test started as a playful Bilibili project from creator 蛆肉儿串儿.',
      'It is still an entertainment project, so the tone is exaggerated and satirical by design.',
      'This version focuses on cleaner experience, branding, and sharing, while keeping the same sharp spirit.',
    ],
    saveMoments: 'Save WeChat card',
    saveXiaohongshu: 'Save Xiaohongshu card',
    copyShareLink: 'Copy result link',
    copyDna: 'Copy DNA code',
    copyCpInvite: 'Copy CP invite',
    goCp: 'Open CP chemistry lab',
    restart: 'Retake test',
    home: 'Back home',
    qrPending: 'The QR code is still generating. Try again in a second.',
    momentsSaved: 'WeChat share card saved',
    xiaohongshuSaved: 'Xiaohongshu share card saved',
    shareCopied: 'Share link copied',
    dnaCopied: 'DNA code copied',
    cpInviteCopied: 'CP invite copied',
    saveFailed: 'Save failed. Please try again.',
    copyFailed: 'Copy failed. Please copy the link manually.',
    scoreUnit: 'pts',
  },
  typePage: {
    eyebrow: 'SBTI type profile',
    backToTest: 'Back to test',
    startTest: 'Start the test',
    notFoundTitle: 'Type not found',
    metadataSuffix: 'SBTI personality type',
    metadataDescription: 'Read the overview, longer description, and dedicated type page for this SBTI result.',
  },
  cp: {
    breadcrumb: 'CP Chemistry',
    title: 'CP Chemistry Lab',
    descEmpty: 'Paste two DNA codes and see whether this match sparks, clashes, or smokes.',
    descInvite: 'Someone invited you to test your chemistry together.',
    partnerType: 'Their personality type',
    unknownType: 'Unknown type',
    yourDna: 'What is your DNA code?',
    testFirst: 'Haven’t taken the test yet? Start here',
    testHint: '30 questions · about 3 minutes · then come back automatically',
    or: 'or',
    inputBoth: 'Enter both DNA codes',
    inputPlaceholderA: 'Enter the first 16-character DNA code',
    inputPlaceholderB: 'Paste a DNA code or a full result link',
    inputHint: 'You can paste a result URL or a 16-character DNA code.',
    generate: 'Run the match',
    copyInvite: 'Copy invite text',
    scoreLabel: 'chemistry',
    vibe: 'Overall vibe',
    strengths: 'Where it works',
    hazards: 'Potential collisions',
    scenario: 'Likely scene',
    verdict: 'Final verdict',
    copyReport: 'Copy report link',
    reset: 'Try another pair',
    note: 'This CP report is playful personality matching, not a destiny document. Great for icebreakers, group chats, and jokes.',
    invalidDna: 'That DNA code does not look right. Please double-check it.',
    failed: 'The chemistry lab failed this round. Please try again later.',
    missingDna: 'Please enter a 16-character DNA code or paste a result link.',
    inviteCopied: 'CP invite copied',
    reportCopied: 'CP report link copied',
  },
};

function makeLocalizedDictionary(
  base: SiteDictionary,
  overrides: Omit<Partial<SiteDictionary>, 'intro' | 'test' | 'result' | 'typePage' | 'cp'> & {
    intro?: Partial<SiteDictionary['intro']>;
    test?: Partial<SiteDictionary['test']>;
    result?: Partial<SiteDictionary['result']>;
    typePage?: Partial<SiteDictionary['typePage']>;
    cp?: Partial<SiteDictionary['cp']>;
  }
): SiteDictionary {
  return {
    ...base,
    ...overrides,
    intro: { ...base.intro, ...overrides.intro },
    test: { ...base.test, ...overrides.test },
    result: { ...base.result, ...overrides.result },
    typePage: { ...base.typePage, ...overrides.typePage },
    cp: { ...base.cp, ...overrides.cp },
  };
}

const localeDictionaries: Record<LocaleCode, SiteDictionary> = {
  zh: zhDictionary,
  en: enDictionary,
  ja: makeLocalizedDictionary(enDictionary, {
    htmlLang: 'ja',
    ogLocale: 'ja_JP',
    siteTitle: 'SBTI 性格テスト',
    siteDescription: '30問・15次元・26タイプの無料オンライン SBTI 性格テスト。',
    brandSubtitle: 'SBTI 性格テスト',
    intro: {
      heroKicker: 'ちょっと毒舌な性格テスト',
      heroLead: 'MBTI が物足りないなら、SBTI をどうぞ。',
      startTest: 'テストを始める',
      browseTypes: 'タイプ一覧を見る',
      rankingTitle: '人気タイプ',
      rankingMeasuredSuffix: '人が受験',
      rareTitle: 'レアタイプ',
      whatIsTitle: 'SBTI とは？',
      compareTitle: 'SBTI と MBTI の比較',
      faqTitle: 'よくある質問',
      inspiration: '元ネタ:',
      entertainmentOnly: 'エンタメ用です',
    },
    test: {
      questionLabel: '第',
      specialQuestion: '追加質問',
      hiddenDimension: '次元は非表示',
      backHome: 'トップへ戻る',
      previous: '前の質問',
      random: 'ランダムで選ぶ',
      submit: '結果を見る',
    },
    result: {
      sharedBanner: '友だちの結果を表示しています',
      sharedAction: '自分も受ける',
      simpleReading: '簡単な読み解き',
      scoreTitle: '15次元スコア',
      noteTitle: 'ひとこと注意',
      dnaTitle: '性格 DNA',
      authorTitle: '作者より',
      copyShareLink: '結果リンクをコピー',
      copyDna: 'DNA コードをコピー',
      copyCpInvite: 'CP 招待をコピー',
      goCp: 'CP 相性ラボへ',
      restart: 'もう一度テスト',
      home: 'トップへ戻る',
    },
    typePage: {
      eyebrow: 'SBTI タイププロフィール',
      backToTest: 'テストへ戻る',
      startTest: 'テストを始める',
      notFoundTitle: 'タイプが見つかりません',
      metadataSuffix: 'SBTI タイプ',
      metadataDescription: 'この SBTI タイプの概要と専用ページを確認できます。',
    },
    cp: {
      breadcrumb: 'CP 相性',
      title: 'CP ケミストリーラボ',
      descEmpty: '2人分の DNA を入れて、相性が火花か煙かを見てみましょう。',
      descInvite: '誰かがあなたを相性診断に招待しています。',
      partnerType: '相手のタイプ',
      yourDna: 'あなたの DNA コードは？',
      testFirst: 'まだ未受験ですか？先にテストへ',
      generate: '相性を見る',
      copyInvite: '招待文をコピー',
      copyReport: 'レポートリンクをコピー',
      reset: '別の組み合わせを試す',
    },
  }),
  ko: makeLocalizedDictionary(enDictionary, {
    htmlLang: 'ko',
    ogLocale: 'ko_KR',
    siteTitle: 'SBTI 성격 테스트',
    siteDescription: '30문항, 15개 차원, 26개 유형의 무료 온라인 SBTI 성격 테스트.',
    brandSubtitle: 'SBTI 성격 테스트',
    intro: {
      heroKicker: '조금 더 독한 성격 테스트',
      heroLead: 'MBTI가 익숙하다면, 이제 SBTI 차례입니다.',
      startTest: '테스트 시작',
      browseTypes: '유형 먼저 보기',
      rankingTitle: '인기 유형',
      rankingMeasuredSuffix: '명 참여',
      rareTitle: '희귀 유형',
      whatIsTitle: 'SBTI란?',
      compareTitle: 'SBTI vs MBTI',
      faqTitle: '자주 묻는 질문',
      inspiration: '원본 영감:',
      entertainmentOnly: '오락용 테스트',
    },
    test: {
      questionLabel: '문항',
      specialQuestion: '추가 문항',
      hiddenDimension: '차원 숨김',
      backHome: '홈으로',
      previous: '이전',
      random: '아무거나 고르기',
      submit: '결과 보기',
    },
    result: {
      sharedBanner: '친구의 결과를 보고 있습니다',
      sharedAction: '나도 테스트하기',
      simpleReading: '간단 해설',
      scoreTitle: '15개 차원 점수',
      noteTitle: '안내',
      dnaTitle: '성격 DNA',
      authorTitle: '제작자 코멘트',
      copyShareLink: '결과 링크 복사',
      copyDna: 'DNA 코드 복사',
      copyCpInvite: 'CP 초대 복사',
      goCp: 'CP 케미 실험실로',
      restart: '다시 테스트',
      home: '홈으로',
    },
  }),
  th: makeLocalizedDictionary(enDictionary, {
    htmlLang: 'th',
    ogLocale: 'th_TH',
    siteTitle: 'แบบทดสอบบุคลิก SBTI',
    siteDescription: 'แบบทดสอบบุคลิก SBTI ออนไลน์ฟรี 30 คำถาม 15 มิติ 26 บุคลิก',
    brandSubtitle: 'แบบทดสอบบุคลิก SBTI',
    intro: {
      heroKicker: 'แบบทดสอบบุคลิกสายแซะ',
      heroLead: 'ถ้า MBTI ธรรมดาไป ลอง SBTI ดู',
      startTest: 'เริ่มทดสอบ',
      browseTypes: 'ดูประเภทก่อน',
      rankingTitle: 'ประเภทยอดนิยม',
      rankingMeasuredSuffix: 'คนทำแบบทดสอบ',
      rareTitle: 'ประเภทหายาก',
      whatIsTitle: 'SBTI คืออะไร',
      compareTitle: 'SBTI เทียบกับ MBTI',
      faqTitle: 'คำถามที่พบบ่อย',
      entertainmentOnly: 'เพื่อความบันเทิงเท่านั้น',
    },
  }),
  vi: makeLocalizedDictionary(enDictionary, {
    htmlLang: 'vi',
    ogLocale: 'vi_VN',
    siteTitle: 'Bài test tính cách SBTI',
    siteDescription: 'Bài test tính cách SBTI miễn phí với 30 câu hỏi, 15 chiều tính cách và 26 kiểu người.',
    brandSubtitle: 'Bài test tính cách SBTI',
    intro: {
      heroKicker: 'Bài test tính cách châm biếm',
      heroLead: 'Nếu MBTI quá quen rồi, thử SBTI đi.',
      startTest: 'Bắt đầu test',
      browseTypes: 'Xem các kiểu trước',
      rankingTitle: 'Kiểu phổ biến',
      rankingMeasuredSuffix: 'người đã làm',
      rareTitle: 'Kiểu hiếm',
      whatIsTitle: 'SBTI là gì',
      compareTitle: 'SBTI và MBTI',
      faqTitle: 'Câu hỏi thường gặp',
      entertainmentOnly: 'Chỉ để giải trí',
    },
  }),
  id: makeLocalizedDictionary(enDictionary, {
    htmlLang: 'id',
    ogLocale: 'id_ID',
    siteTitle: 'Tes kepribadian SBTI',
    siteDescription: 'Tes kepribadian SBTI gratis dengan 30 pertanyaan, 15 dimensi, dan 26 tipe.',
    brandSubtitle: 'Tes kepribadian SBTI',
    intro: {
      heroKicker: 'Tes kepribadian yang lebih satir',
      heroLead: 'Kalau MBTI terasa terlalu biasa, coba SBTI.',
      startTest: 'Mulai tes',
      browseTypes: 'Lihat tipe dulu',
      rankingTitle: 'Tipe populer',
      rankingMeasuredSuffix: 'orang sudah tes',
      rareTitle: 'Tipe langka',
      whatIsTitle: 'Apa itu SBTI',
      compareTitle: 'SBTI vs MBTI',
      faqTitle: 'Pertanyaan umum',
      entertainmentOnly: 'Hanya untuk hiburan',
    },
  }),
  tl: makeLocalizedDictionary(enDictionary, {
    htmlLang: 'tl',
    ogLocale: 'tl_PH',
    siteTitle: 'SBTI personality test',
    siteDescription: 'Libre at online na SBTI personality test na may 30 tanong, 15 dimensions, at 26 types.',
    brandSubtitle: 'SBTI personality test',
    intro: {
      heroKicker: 'Mas matapang na personality test',
      heroLead: 'Kung gasgas na ang MBTI, subukan ang SBTI.',
      startTest: 'Simulan ang test',
      browseTypes: 'Tingnan muna ang mga type',
      rankingTitle: 'Sikat na types',
      rankingMeasuredSuffix: 'tao na ang sumubok',
      rareTitle: 'Bihirang types',
      whatIsTitle: 'Ano ang SBTI',
      compareTitle: 'SBTI vs MBTI',
      faqTitle: 'Mga tanong',
      entertainmentOnly: 'Pang-libang lang',
    },
  }),
  tw: makeLocalizedDictionary(zhDictionary, {
    htmlLang: 'zh-Hant',
    ogLocale: 'zh_TW',
    siteDescription: '免費線上 SBTI 人格測試，30 道題、15 個維度、26 種人格類型。',
    intro: {
      heroLead: 'MBTI 已經過時，SBTI 來了。',
      heroSubcopy: '一場荒誕又精準的人格審判，30 道題看穿你的 15 個靈魂維度。不用註冊，不用付費，也不用交出你的隱私。',
      statCompleted: '已完成測試',
      whatIsTitle: 'SBTI 測試是什麼？',
      whatIsDesc: '免費、直接、帶點毒舌，但不會上傳你的資料。',
      compareDesc: '不是誰更高級，而是誰更敢說真話。',
      faqDesc: '把最容易問的都先放這裡。',
      entertainmentOnly: '本站僅供娛樂',
    },
    test: {
      backHome: '返回首頁',
      submit: '提交並查看結果',
    },
    result: {
      scoreTitle: '十五維度評分',
      home: '回到首頁',
      shareCopied: '分享連結已複製',
      dnaCopied: '人格 DNA 已複製',
      cpInviteCopied: 'CP 邀請文案已複製',
    },
    typePage: {
      eyebrow: 'SBTI 人格檔案',
      notFoundTitle: '找不到這個人格類型',
      metadataDescription: '查看這個人格的簡介、長文解讀和專屬頁面。',
    },
    cp: {
      breadcrumb: 'CP化學反應',
      note: '這份 CP 報告是娛樂型人格配對，不是命運判決書。拿來破冰、發群聊、互相調侃都很合適。',
      inviteCopied: 'CP 邀請連結已複製',
      reportCopied: 'CP 報告連結已複製',
    },
  }),
  hk: makeLocalizedDictionary(zhDictionary, {
    htmlLang: 'zh-HK',
    ogLocale: 'zh_HK',
    siteDescription: '免費線上 SBTI 人格測試，30 條題目、15 個維度、26 種人格類型。',
    intro: {
      heroLead: 'MBTI 已經舊咗，SBTI 先夠狠。',
      heroSubcopy: '一場荒誕但幾準的人格審判，30 條題目照穿你 15 個靈魂維度。唔使註冊，唔使俾錢，亦唔使交出私隱。',
      statCompleted: '已完成測試',
      entertainmentOnly: '本站純屬娛樂',
    },
    test: {
      backHome: '返回首頁',
      submit: '提交並查看結果',
    },
    result: {
      home: '回到首頁',
    },
    cp: {
      breadcrumb: 'CP化學反應',
    },
  }),
};

export function getDictionary(locale?: string): SiteDictionary {
  return localeDictionaries[normalizeLocale(locale)] ?? localeDictionaries[DEFAULT_LOCALE];
}
