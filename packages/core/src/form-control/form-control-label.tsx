import { createHopeComponent, hope } from "@hope-ui/styles";
import { dataAttr } from "@hope-ui/utils";
import { clsx } from "clsx";
import { splitProps } from "solid-js";

import { useRequiredFormControlContext } from "./form-control-context";

export const FormControlLabel = createHopeComponent<"label">(props => {
  const context = useRequiredFormControlContext();

  const [local, others] = splitProps(props, ["id", "for", "class", "__css"]);

  const id = () => local.id ?? context.labelId();
  const htmlFor = () => local.for ?? context.id();

  return (
    <hope.label
      id={id()}
      for={htmlFor()}
      data-required={dataAttr(context.isRequired())}
      data-disabled={dataAttr(context.isDisabled())}
      data-readonly={dataAttr(context.isReadOnly())}
      data-invalid={dataAttr(context.isInvalid())}
      class={clsx(context.baseClasses().label, local.class)}
      __css={{ ...context.styleOverrides().label, ...local.__css }}
      {...others}
    />
  );
});
