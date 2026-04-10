import type * as QRCodeLib from 'qrcode';

const CELL_SIZE = 12;
const QUIET_ZONE = 4;

function isFinderModule(row: number, col: number, size: number) {
  const inTopLeft = row < 7 && col < 7;
  const inTopRight = row < 7 && col >= size - 7;
  const inBottomLeft = row >= size - 7 && col < 7;
  return inTopLeft || inTopRight || inBottomLeft;
}

function renderFinderPattern(x: number, y: number) {
  return [
    `<rect x="${x}" y="${y}" width="${7 * CELL_SIZE}" height="${7 * CELL_SIZE}" rx="${CELL_SIZE * 1.4}" fill="#143a2d"/>`,
    `<rect x="${x + CELL_SIZE}" y="${y + CELL_SIZE}" width="${5 * CELL_SIZE}" height="${5 * CELL_SIZE}" rx="${CELL_SIZE}" fill="#f7fbf7"/>`,
    `<rect x="${x + 2 * CELL_SIZE}" y="${y + 2 * CELL_SIZE}" width="${3 * CELL_SIZE}" height="${3 * CELL_SIZE}" rx="${CELL_SIZE * 0.8}" fill="#2d5d49"/>`,
  ].join('');
}

export function createStyledQrDataUrl(QRCode: typeof QRCodeLib, value: string) {
  const qr = QRCode.create(value, {
    errorCorrectionLevel: 'H',
  });

  const size = qr.modules.size;
  const totalCells = size + QUIET_ZONE * 2;
  const canvasSize = totalCells * CELL_SIZE;
  const darkModules: string[] = [];

  const isDark = (row: number, col: number) => qr.modules.get(row, col) === 1;

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (!isDark(row, col) || isFinderModule(row, col, size)) {
        continue;
      }

      const x = (col + QUIET_ZONE) * CELL_SIZE;
      const y = (row + QUIET_ZONE) * CELL_SIZE;
      const centerX = x + CELL_SIZE / 2;
      const centerY = y + CELL_SIZE / 2;

      if (col + 1 < size && isDark(row, col + 1) && !isFinderModule(row, col + 1, size)) {
        darkModules.push(
          `<rect x="${centerX}" y="${centerY - CELL_SIZE * 0.14}" width="${CELL_SIZE}" height="${CELL_SIZE * 0.28}" rx="${CELL_SIZE * 0.14}" fill="#4c8167"/>`
        );
      }

      if (row + 1 < size && isDark(row + 1, col) && !isFinderModule(row + 1, col, size)) {
        darkModules.push(
          `<rect x="${centerX - CELL_SIZE * 0.14}" y="${centerY}" width="${CELL_SIZE * 0.28}" height="${CELL_SIZE}" rx="${CELL_SIZE * 0.14}" fill="#4c8167"/>`
        );
      }

      darkModules.push(
        `<circle cx="${centerX}" cy="${centerY}" r="${CELL_SIZE * 0.28}" fill="#143a2d"/>`
      );
    }
  }

  const finderOffset = QUIET_ZONE * CELL_SIZE;
  const topRightX = (QUIET_ZONE + size - 7) * CELL_SIZE;
  const bottomLeftY = (QUIET_ZONE + size - 7) * CELL_SIZE;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasSize} ${canvasSize}" width="${canvasSize}" height="${canvasSize}">
      <rect width="${canvasSize}" height="${canvasSize}" rx="${CELL_SIZE * 3}" fill="#f7fbf7"/>
      <g>
        ${renderFinderPattern(finderOffset, finderOffset)}
        ${renderFinderPattern(topRightX, finderOffset)}
        ${renderFinderPattern(finderOffset, bottomLeftY)}
      </g>
      <g>
        ${darkModules.join('')}
      </g>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
