import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridLayoutProps,
  InteractivityProps,
  KeysOf,
  LayoutProps,
  MarginProps,
  OtherStyleProps,
  PaddingProps,
  PositionProps,
  PseudoSelectorProps,
  RadiiProps,
  ShadowProps,
  SizeProps,
  SystemStyleProps,
  TransformProps,
  TransitionProps,
  TypographyProps,
} from "../types";

const borderPropNames: KeysOf<BorderProps> = {
  border: true,
  borderWidth: true,
  borderStyle: true,
  borderColor: true,
  borderTop: true,
  borderTopWidth: true,
  borderTopStyle: true,
  borderTopColor: true,
  borderRight: true,
  borderRightWidth: true,
  borderRightStyle: true,
  borderRightColor: true,
  borderBottom: true,
  borderBottomWidth: true,
  borderBottomStyle: true,
  borderBottomColor: true,
  borderLeft: true,
  borderLeftWidth: true,
  borderLeftStyle: true,
  borderLeftColor: true,
  borderX: true,
  borderY: true,
};

const colorPropNames: KeysOf<ColorProps> = {
  color: true,
  background: true,
  bg: true,
  backgroundColor: true,
  bgColor: true,
  opacity: true,
};

const flexboxPropNames: KeysOf<FlexboxProps> = {
  alignItems: true,
  alignContent: true,
  alignSelf: true,
  justifyItems: true,
  justifyContent: true,
  justifySelf: true,
  flexDirection: true,
  flexWrap: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  order: true,
};

const gridLayoutPropNames: KeysOf<GridLayoutProps> = {
  gridTemplate: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
  gridRow: true,
  gridRowStart: true,
  gridRowEnd: true,
  gridColumn: true,
  gridColumnStart: true,
  gridColumnEnd: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  placeItems: true,
  placeContent: true,
  placeSelf: true,
  gap: true,
  rowGap: true,
  columnGap: true,
};

const interactivityPropNames: KeysOf<InteractivityProps> = {
  appearance: true,
  userSelect: true,
  pointerEvents: true,
  resize: true,
  cursor: true,
  outline: true,
  outlineOffset: true,
  outlineColor: true,
};

const layoutPropNames: KeysOf<LayoutProps> = {
  display: true,
  d: true,
  verticalAlign: true,
  overflow: true,
  overflowX: true,
  overflowY: true,
};

const marginPropNames: KeysOf<MarginProps> = {
  margin: true,
  marginTop: true,
  marginRight: true,
  marginEnd: true,
  marginBottom: true,
  marginLeft: true,
  marginStart: true,
  m: true,
  mt: true,
  mr: true,
  me: true,
  mb: true,
  ml: true,
  ms: true,
  mx: true,
  my: true,
};

const paddingPropNames: KeysOf<PaddingProps> = {
  padding: true,
  paddingTop: true,
  paddingRight: true,
  paddingEnd: true,
  paddingBottom: true,
  paddingLeft: true,
  paddingStart: true,
  p: true,
  pt: true,
  pr: true,
  pe: true,
  pb: true,
  pl: true,
  ps: true,
  px: true,
  py: true,
};

const positionPropNames: KeysOf<PositionProps> = {
  position: true,
  pos: true,
  zIndex: true,
  top: true,
  right: true,
  bottom: true,
  left: true,
};

const radiiPropNames: KeysOf<RadiiProps> = {
  borderRadius: true,
  borderTopRightRadius: true,
  borderTopLeftRadius: true,
  borderBottomRightRadius: true,
  borderBottomLeftRadius: true,
  borderTopRadius: true,
  borderRightRadius: true,
  borderBottomRadius: true,
  borderLeftRadius: true,
  rounded: true,
  roundedTop: true,
  roundedRight: true,
  roundedBottom: true,
  roundedLeft: true,
};

const shadowPropNames: KeysOf<ShadowProps> = {
  textShadow: true,
  boxShadow: true,
  shadow: true,
};

const sizePropNames: KeysOf<SizeProps> = {
  width: true,
  minWidth: true,
  maxWidth: true,
  height: true,
  minHeight: true,
  maxHeight: true,
  w: true,
  minW: true,
  maxW: true,
  h: true,
  minH: true,
  maxH: true,
  boxSize: true,
};

const transformPropNames: KeysOf<TransformProps> = {
  transform: true,
  transformOrigin: true,
  clipPath: true,
};

const transitionPropNames: KeysOf<TransitionProps> = {
  transition: true,
  transitionProperty: true,
  transitionTimingFunction: true,
  transitionDuration: true,
  transitionDelay: true,
  animation: true,
  willChange: true,
};

const typographyPropNames: KeysOf<TypographyProps> = {
  fontFamily: true,
  fontSize: true,
  fontWeight: true,
  lineHeight: true,
  letterSpacing: true,
  textAlign: true,
  fontStyle: true,
  textTransform: true,
  textDecoration: true,
};

const otherStylePropNames: KeysOf<OtherStyleProps> = {
  objectFit: true,
  objectPosition: true,
};

const pseudoSelectorPropNames: KeysOf<PseudoSelectorProps> = {
  _hover: true,
  _active: true,
  _focus: true,
  _highlighted: true,
  _focusWithin: true,
  _focusVisible: true,
  _disabled: true,
  _readOnly: true,
  _before: true,
  _after: true,
  _empty: true,
  _expanded: true,
  _checked: true,
  _grabbed: true,
  _pressed: true,
  _invalid: true,
  _valid: true,
  _loading: true,
  _selected: true,
  _hidden: true,
  _autofill: true,
  _even: true,
  _odd: true,
  _first: true,
  _last: true,
  _notFirst: true,
  _notLast: true,
  _visited: true,
  _activeLink: true,
  _activeStep: true,
  _indeterminate: true,
  _groupHover: true,
  _peerHover: true,
  _groupFocus: true,
  _peerFocus: true,
  _groupFocusVisible: true,
  _peerFocusVisible: true,
  _groupActive: true,
  _peerActive: true,
  _groupDisabled: true,
  _peerDisabled: true,
  _groupInvalid: true,
  _peerInvalid: true,
  _groupChecked: true,
  _peerChecked: true,
  _groupFocusWithin: true,
  _peerFocusWithin: true,
  _peerPlaceholderShown: true,
  _placeholder: true,
  _placeholderShown: true,
  _fullScreen: true,
  _selection: true,
  _rtl: true,
  _ltr: true,
  _mediaDark: true,
  _mediaReduceMotion: true,
  _dark: true,
  _light: true,
};

export const stylePropNames: KeysOf<SystemStyleProps> = {
  ...borderPropNames,
  ...colorPropNames,
  ...flexboxPropNames,
  ...gridLayoutPropNames,
  ...interactivityPropNames,
  ...layoutPropNames,
  ...marginPropNames,
  ...paddingPropNames,
  ...positionPropNames,
  ...radiiPropNames,
  ...shadowPropNames,
  ...sizePropNames,
  ...transformPropNames,
  ...transitionPropNames,
  ...typographyPropNames,
  ...otherStylePropNames,
  ...pseudoSelectorPropNames,
};
