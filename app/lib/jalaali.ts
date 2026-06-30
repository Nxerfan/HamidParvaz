export interface JalaaliDate {
  jy: number;
  jm: number;
  jd: number;
}

const BREAKS = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
  2192, 2262, 2324, 2394, 2456, 3178,
];

export function jalCal(jy: number): { leap: number; gy: number; march: number } {
  const bl = BREAKS.length;
  const gy = jy + 621;
  let leapJ = -14;
  let jp = BREAKS[0]!;
  let jump = 0;

  if (jy < jp || jy >= BREAKS[bl - 1]!) {
    throw new Error("Invalid Jalaali year " + jy);
  }

  for (let i = 1; i < bl; i++) {
    const jm = BREAKS[i]!;
    jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + Math.floor(jump / 33) * 8 + Math.floor((jump % 33) / 4);
    jp = jm;
  }

  const n = jy - jp;
  leapJ = leapJ + Math.floor(n / 33) * 8 + Math.floor(((n % 33) + 3) / 4);
  if (jump % 33 === 4 && jump - n === 4) leapJ += 1;

  const leapG =
    Math.floor(gy / 4) - Math.floor(gy / 100 + 1) + Math.floor(gy / 400);
  const march = 20 + (leapJ - leapG);
  let leap = (((n + 1) % 33) - 1) % 4;
  if (leap === -1) leap = 4;

  return { leap, gy, march };
}

export function isLeapJalaaliYear(jy: number): boolean {
  return jalCal(jy).leap === 0;
}

export function jMonthLength(jy: number, jm: number): number {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  if (isLeapJalaaliYear(jy)) return 30;
  return 29;
}

const G_D_M = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

export function toJalaali(gy: number, gm: number, gd: number): JalaaliDate {
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2 = gm > 2 ? gy + 1 : gy;

  let days =
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) -
    80 +
    gd +
    G_D_M[gm - 1]!;

  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  jy += Math.floor((days - 1) / 365);
  if (days > 365) days = (days - 1) % 365;

  const jm =
    days < 186
      ? 1 + Math.floor(days / 31)
      : 7 + Math.floor((days - 186) / 30);

  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

  return { jy, jm, jd };
}

export function toGregorian(jy: number, jm: number, jd: number): { gy: number; gm: number; gd: number } {
  let gy = jy <= 979 ? 621 : 1600;
  jy -= jy <= 979 ? 0 : 979;

  let days =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);

  gy += 400 * Math.floor(days / 146097);
  days %= 146097;

  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }

  gy += 4 * Math.floor(days / 1461);
  days %= 1461;
  gy += Math.floor((days - 1) / 365);
  if (days > 365) days = (days - 1) % 365;

  const gd = days + 1;
  const gm = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let resultGm = 0;

  for (let i = 0; i < 13; i++) {
    const v =
      gm[i]! +
      (i === 2 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0)
        ? 1
        : 0);
    if (gd <= v) {
      resultGm = i;
      break;
    }
    days -= v;
  }

  return { gy, gm: resultGm, gd };
}

export function isValidJalaaliDate(jy: number, jm: number, jd: number): boolean {
  return (
    jy >= -61 &&
    jy <= 3177 &&
    jm >= 1 &&
    jm <= 12 &&
    jd >= 1 &&
    jd <=
      (jm <= 6 ? 31 : jm <= 11 ? 30 : isLeapJalaaliYear(jy) ? 30 : 29)
  );
}
