import { hope } from "../factory";
import { ElementType, HTMLHopeProps } from "../types";

export type BoxProps<C extends ElementType = "div"> = HTMLHopeProps<C>;

/**
 * Box is the most abstract component on top of which all other Hope UI components are built.
 * By default, it renders a div element.
 */
export const Box = hope.div;
// export function Box<C extends ElementType = "div">(props: BoxProps<C>) {
//   const usedStylePropNames = getUsedStylePropNames(props);

//   const [local, styleProps, others] = splitProps(
//     props,
//     ["as", "class", "className", "__baseStyle"],
//     usedStylePropNames
//   );

//   const classes = () => {
//     return classNames(local.class, local.className, createStyledSystemClass(styleProps, [local.__baseStyle]));
//   };

//   return <Dynamic component={local.as ?? "div"} class={classes()} {...others} />;
// }
