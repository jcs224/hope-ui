import { mergeProps, Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { useHopeTheme } from "@/contexts";
import { IconSpinner } from "@/icons";
import { ElementType } from "@/utils";

import { ButtonProps } from "./types";

export function Button<C extends ElementType = "button">(props: ButtonProps<C>) {
  const theme = useHopeTheme().components.Button;

  const defaultProps: ButtonProps<"button"> = {
    as: "button",
    variant: theme.variant,
    color: theme.color,
    size: theme.size,
    radius: theme.radius,
    loaderPosition: theme.loaderPosition,
    compact: theme.compact,
    uppercase: theme.uppercase,
    fullWidth: theme.fullWidth,
    loading: false,
    disabled: false,
    type: "button",
    role: "button",
  };

  const propsWithDefault = mergeProps(defaultProps, props);
  const [local, others] = splitProps(propsWithDefault, [
    "as",
    "class",
    "className",
    "classList",
    "variant",
    "color",
    "size",
    "radius",
    "loaderPosition",
    "compact",
    "uppercase",
    "fullWidth",
    "loading",
    "disabled",
    "leftIcon",
    "rightIcon",
    "children",
  ]);

  const rootClassList = () => ({
    "h-btn": true,
    "h-btn--compact": local.compact,
    "h-btn--loading": local.loading,
    "h-btn--disabled": local.disabled,
    "h-btn--uppercase": local.uppercase,
    "h-btn--full-width": local.fullWidth,
    [`h-btn--variant-${local.variant}`]: true,
    [`h-btn--size-${local.size}`]: true,
    [`h-btn--radius-${local.radius}`]: true,
    [`h-btn--color-${local.color}`]: !local.disabled && local.variant !== "default",
    [local.class || ""]: true,
    [local.className || ""]: true,
    ...local.classList,
  });

  const loadingSpinnerClassName = "h-btn__loading-icon";

  const isLeftIconVisible = () => {
    return local.leftIcon && (!local.loading || local.loaderPosition === "right");
  };

  const isRightIconVisible = () => {
    return local.rightIcon && (!local.loading || local.loaderPosition === "left");
  };

  const isLoadingSpinnerLeftVisible = () => {
    return local.loading && !local.disabled && local.loaderPosition === "left";
  };

  const isLoadingSpinnerRightVisible = () => {
    return local.loading && !local.disabled && local.loaderPosition === "right";
  };

  const shouldWrapChildrenInSpan = () => {
    return local.leftIcon || local.rightIcon || local.loading;
  };

  return (
    <Dynamic
      component={local.as}
      classList={rootClassList()}
      disabled={local.disabled || local.loading}
      {...others}
    >
      <Show when={isLeftIconVisible()}>{local.leftIcon}</Show>
      <Show when={isLoadingSpinnerLeftVisible()}>
        <IconSpinner className={loadingSpinnerClassName} />
      </Show>
      <Show when={shouldWrapChildrenInSpan()} fallback={local.children}>
        <span>{local.children}</span>
      </Show>
      <Show when={isRightIconVisible()}>{local.rightIcon}</Show>
      <Show when={isLoadingSpinnerRightVisible()}>
        <IconSpinner className={loadingSpinnerClassName} />
      </Show>
    </Dynamic>
  );
}
