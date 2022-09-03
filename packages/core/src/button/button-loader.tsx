/*!
 * Portions of this file are based on code from chakra-ui.
 * MIT Licensed, Copyright (c) 2019 Segun Adebayo.
 *
 * Credits to the Chakra UI team:
 * https://github.com/chakra-ui/chakra-ui/blob/7d7e04d53d871e324debe0a2cb3ff44d7dbf3bca/packages/components/button/src/button-spinner.tsx
 */

import { createHopeComponent, hope, useStyleConfigContext } from "@hope-ui/styles";
import { clsx } from "clsx";
import { Show, splitProps } from "solid-js";

import { IconSpinner } from "../icons/icon-spinner";
import { ButtonParts } from "./button.styles";
import { ButtonLoaderProps } from "./types";

export const ButtonLoader = createHopeComponent<"div", ButtonLoaderProps>(props => {
  const [local, others] = splitProps(props, ["class", "children", "hasLoadingText"]);

  const { classes, styles } = useStyleConfigContext<ButtonParts>();

  return (
    <hope.div
      class={clsx(classes().loaderWrapper, local.class)}
      position={local.hasLoadingText ? "relative" : "absolute"}
      __css={styles().loaderWrapper}
      {...others}
    >
      <Show
        when={local.children}
        fallback={<IconSpinner class={classes().loaderIcon} __css={styles().loaderIcon} />}
      >
        {local.children}
      </Show>
    </hope.div>
  );
});
