/*!
 * Original code by Mantinedev
 * MIT Licensed, Copyright (c) 2021 Vitaly Rtishchev.
 *
 * Credits to the Mantinedev team:
 * https://github.com/mantinedev/mantine/blob/8546c580fdcaa9653edc6f4813103349a96cfb09/src/mantine-styles/src/theme/utils/to-rgba/to-rgba.ts
 */

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

function isHexColor(hex: string): boolean {
  const HEX_REGEXP = /^#?([0-9A-F]{3}){1,2}$/i;

  return HEX_REGEXP.test(hex);
}

function hexToRgba(color: string): RGBA {
  let hexString = color.replace("#", "");

  if (hexString.length === 3) {
    const shorthandHex = hexString.split("");
    hexString = [
      shorthandHex[0],
      shorthandHex[0],
      shorthandHex[1],
      shorthandHex[1],
      shorthandHex[2],
      shorthandHex[2],
    ].join("");
  }

  const parsed = parseInt(hexString, 16);
  const r = (parsed >> 16) & 255;
  const g = (parsed >> 8) & 255;
  const b = parsed & 255;

  return {
    r,
    g,
    b,
    a: 1,
  };
}

function rgbStringToRgba(color: string): RGBA {
  const [r, g, b, a] = color
    .replace(/[^0-9,.]/g, "")
    .split(",")
    .map(Number);

  return { r, g, b, a: a || 1 };
}

export function toRgba(hexOrRgb: string): RGBA {
  if (isHexColor(hexOrRgb)) {
    return hexToRgba(hexOrRgb);
  }

  if (hexOrRgb.startsWith("rgb")) {
    return rgbStringToRgba(hexOrRgb);
  }

  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  };
}

export function rgbColorChannel(hexOrRgb: string): string {
  const { r, g, b } = toRgba(hexOrRgb);
  return `${r} ${g} ${b}`;
}
