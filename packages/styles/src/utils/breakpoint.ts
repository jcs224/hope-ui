/*!
 * Original code by Chakra UI
 * MIT Licensed, Copyright (c) 2019 Segun Adebayo.
 *
 * Credits to the Chakra UI team:
 * https://github.com/chakra-ui/chakra-ui/blob/2283faae3e361a8978a93b0ef7fd43b637153555/packages/utilities/breakpoint-utils/src/breakpoint.ts
 */

import { Dict, isNumber, isObject } from "@hope-ui/utils";
import { arrayToObjectNotation, isResponsiveObjectLike, objectToArrayNotation } from "./responsive";

function analyzeCSSValue(value: number | string) {
  const num = parseFloat(value.toString());
  const unit = value.toString().replace(String(num), "");
  return { unitless: !unit, value: num, unit };
}

/** Append `px` unit to unitless value, return it as is otherwise. */
export function px(value: number | string | null): string | null {
  if (value == null) {
    return value as string | null;
  }

  const { unitless } = analyzeCSSValue(value);
  return unitless || isNumber(value) ? `${value}px` : value;
}

const sortByBreakpointValue = (a: any[], b: any[]) => {
  return parseInt(a[1], 10) > parseInt(b[1], 10) ? 1 : -1;
};

/** Create a new breakpoints object sorted by asc order. */
const sortBps = (breakpoints: Dict): Dict => {
  return Object.fromEntries(Object.entries(breakpoints).sort(sortByBreakpointValue));
};

/** Create an array of breakpoints values sorted by asc order. */
function normalize(breakpoints: Dict) {
  const sorted = sortBps(breakpoints);
  return Object.assign(Object.values(sorted), sorted) as string[];
}

/** Get all keys of a breakpoints object. */
function keys(breakpoints: Dict) {
  const value = Object.keys(sortBps(breakpoints));
  return new Set(value);
}

/** Subtract the equivalent of 1px to the given value. */
function subtract(value: string) {
  if (!value) {
    return value;
  }

  value = px(value) ?? value;

  // 0.0625 = the equivalent of 1px in em using a 16px base
  const factor = value.endsWith("px") ? -1 : -0.0625;

  if (isNumber(value)) {
    return `${value + factor}`;
  }

  return value.replace(/(\d+\.?\d*)/u, m => `${parseFloat(m) + factor}`);
}

/** Create media query rule. */
export function toMediaQueryString(min: string | null, max?: string) {
  const query = ["@media screen"];

  if (min) {
    query.push("and", `(min-width: ${px(min)})`);
  }

  if (max) {
    query.push("and", `(max-width: ${px(max)})`);
  }

  return query.join(" ");
}

/** Return metadata about the given breakpoints. */
export function analyzeBreakpoints(breakpoints: Dict) {
  if (!breakpoints) {
    return null;
  }

  breakpoints.base = breakpoints.base ?? "0px";

  const normalized = normalize(breakpoints);

  const queries = Object.entries(breakpoints)
    .sort(sortByBreakpointValue)
    .map(([breakpoint, minW], index, entry) => {
      let [, maxW] = entry[index + 1] ?? [];
      maxW = parseFloat(maxW) > 0 ? subtract(maxW) : undefined;
      return {
        _minW: subtract(minW),
        breakpoint,
        minW,
        maxW,
        maxWQuery: toMediaQueryString(null, maxW),
        minWQuery: toMediaQueryString(minW),
        minMaxQuery: toMediaQueryString(minW, maxW),
      };
    });

  const _keys = keys(breakpoints);
  const _keysArr = Array.from(_keys.values());

  return {
    keys: _keys,
    normalized,
    asObject: sortBps(breakpoints),
    asArray: normalize(breakpoints),
    details: queries,
    medias: [null, ...normalized.map(minW => toMediaQueryString(minW)).slice(1)],
    isResponsive(test: Dict) {
      return isResponsiveObjectLike(test, _keysArr);
    },
    toArrayValue(test: Dict) {
      if (!isObject(test)) {
        throw new Error("toArrayValue: value must be an object");
      }

      return objectToArrayNotation(test, _keysArr);
    },
    toObjectValue(test: any[]) {
      if (!Array.isArray(test)) {
        throw new Error("toObjectValue: value must be an array");
      }

      return arrayToObjectNotation(test, _keysArr);
    },
  };
}

export type AnalyzeBreakpointsReturn = ReturnType<typeof analyzeBreakpoints>;
