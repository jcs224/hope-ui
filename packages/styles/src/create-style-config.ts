/*!
 * Original code by SEEK
 * MIT Licensed, Copyright (c) 2021 SEEK.
 *
 * Credits to the SEEK team:
 * https://github.com/seek-oss/vanilla-extract/blob/master/packages/recipes/src/createRuntimeFn.ts
 */

import { filterUndefined, isEmptyObject, runIfFn } from "@hope-ui/utils";
import { clsx } from "clsx";
import { dset } from "dset/merge";
import { createMemo, splitProps } from "solid-js";

import { computeStyle } from "./styled-system";
import { useComponentTheme, useTheme } from "./theme";
import {
  MultiPartStyleConfig,
  MultiPartStyleConfigInterpolation,
  MultiPartStyleConfigResult,
  StyleConfig,
  StyleConfigVariantSelection,
  SystemStyleObject,
  Theme,
  UseStyleConfigFn,
  UseStyleConfigOptions,
} from "./types";
import { shouldApplyCompound } from "./utils";

/** Compute classNames from a multi-part style config. */
function computeMultiPartStyleConfig<Parts extends string, Variants extends Record<string, any>>(
  configs: Partial<MultiPartStyleConfig<Parts, Variants>>,
  theme: Theme
): Partial<MultiPartStyleConfigResult<Parts, Variants>> {
  return Object.entries(configs).reduce((acc, [part, config]) => {
    const { base = {}, variants = {}, compoundVariants = [] } = config as StyleConfig<Variants>;

    acc[part as Parts] = {
      baseClassName: computeStyle(base, theme),
      variantClassNames: Object.entries(variants).reduce((acc, [variant, definition]) => {
        // a variant (ex: "size")
        acc[variant] = Object.entries(definition as Record<string, SystemStyleObject>).reduce(
          (acc, [value, style]) => {
            // a variant value (ex: "sm")
            acc[value] = computeStyle(style, theme);
            return acc;
          },
          {} as any
        );
        return acc;
      }, {} as any),
      compoundVariants: compoundVariants.map(compoundVariant => [
        compoundVariant.variants,
        computeStyle(compoundVariant.style, theme),
      ]),
    };

    return acc;
  }, {} as Partial<MultiPartStyleConfigResult<Parts, Variants>>);
}

/** Create a `useStyleConfig` primitive. */
export function createStyleConfig<Parts extends string, Variants extends Record<string, any>>(
  interpolation: MultiPartStyleConfigInterpolation<Parts, Variants>,
  defaultVariants?: StyleConfigVariantSelection<Variants>
): UseStyleConfigFn<Parts, Variants> {
  let isFirstLoad = true;

  let baseConfig: MultiPartStyleConfig<Parts, Variants>;
  let baseConfigResult: MultiPartStyleConfigResult<Parts, Variants>;

  let themeConfig: Partial<MultiPartStyleConfig<Parts, Variants>> | undefined;
  let themeConfigResult: Partial<MultiPartStyleConfigResult<Parts, Variants>> | undefined;

  let parts: Array<Parts> = [];

  return function useStyleConfig(name: string, options: UseStyleConfigOptions<Parts, Variants>) {
    const theme = useTheme();
    const componentTheme = useComponentTheme(name);

    // Hack to make sure base style config is computed only once for every component instance,
    // but has access to the current theme since `useStyleConfig` run in a component context.
    if (isFirstLoad) {
      // 1. compute base styles.
      baseConfig = runIfFn(interpolation, theme.vars);
      baseConfigResult = computeMultiPartStyleConfig(
        baseConfig,
        theme
      ) as MultiPartStyleConfigResult<Parts, Variants>; // force type because we know it's not a partial.

      // 2. compute theme styles, so it will be injected to `head` after base styles.
      themeConfig = runIfFn(componentTheme()?.styleConfigOverrides, theme.vars);
      themeConfigResult = themeConfig && computeMultiPartStyleConfig(themeConfig, theme);

      // get component parts from config.
      parts = Object.keys(baseConfig) as Array<Parts>;

      isFirstLoad = false;
    }

    const styleConfigOverrides = createMemo(() => {
      return runIfFn(options.styleConfigOverrides, theme.vars);
    });

    const selectedVariants = createMemo(() => {
      const [_, variantSelections] = splitProps(options, ["styleConfigOverrides", "unstyled"]);

      return {
        ...defaultVariants,
        ...filterUndefined(variantSelections),
      } as StyleConfigVariantSelection<Variants>;
    });

    const classes = createMemo(() => {
      if (options.unstyled) {
        return {} as Record<Parts, string>;
      }

      return parts.reduce((acc, part) => {
        const baseClassName = baseConfigResult[part].baseClassName ?? "";
        const variantClassNames = baseConfigResult[part].variantClassNames ?? ({} as any);
        const compoundVariants = baseConfigResult[part].compoundVariants ?? [];

        const themeBaseClassName = themeConfigResult?.[part]?.baseClassName ?? "";
        const themeVariantClassNames = themeConfigResult?.[part]?.variantClassNames ?? ({} as any);
        const themeCompoundVariants = themeConfigResult?.[part]?.compoundVariants ?? [];

        // 1. add "static" and "base" classNames.
        const classNames = [`hope-${name}-${part}`, baseClassName, themeBaseClassName];

        // 2. add "variants" classNames.
        for (const name in selectedVariants()) {
          const value = selectedVariants()[name];

          if (value == null) {
            continue;
          }

          classNames.push(variantClassNames[name]?.[String(value)]);
          classNames.push(themeVariantClassNames[name]?.[String(value)]);
        }

        // 3. add "compound variants" classNames.
        for (const [variants, className] of [...compoundVariants, ...themeCompoundVariants]) {
          if (shouldApplyCompound(variants, selectedVariants())) {
            classNames.push(className);
          }
        }

        acc[part] = clsx(...classNames);

        return acc;
      }, {} as Record<Parts, string>);
    });

    const styleOverrides = createMemo(() => {
      const configOverrides = styleConfigOverrides();

      if (configOverrides == null) {
        return {} as Record<Parts, SystemStyleObject>;
      }

      return parts.reduce((acc, part) => {
        const base = configOverrides[part]?.base ?? {};
        const variants = configOverrides[part]?.variants ?? ({} as any);
        const compoundVariants = configOverrides[part]?.compoundVariants ?? [];

        // 1. add "base" styles.
        acc[part] = base;

        // 2. add "variants" styles.
        for (const name in selectedVariants()) {
          const value = selectedVariants()[name];

          if (value == null) {
            continue;
          }

          const style = variants[name]?.[String(value)] ?? {};

          if (isEmptyObject(style)) {
            continue;
          }

          dset(acc, part, style);
        }

        // 3. add "compound variants" styles.
        for (const compoundVariant of compoundVariants) {
          if (shouldApplyCompound(compoundVariant.variants, selectedVariants())) {
            dset(acc, part, compoundVariant.style);
          }
        }

        return acc;
      }, {} as Record<Parts, SystemStyleObject>);
    });

    return { classes, styleOverrides };
  };
}