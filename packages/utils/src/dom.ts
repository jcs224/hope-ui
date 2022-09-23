/*!
 * Portions of this file are based on code from ariakit.
 * MIT Licensed, Copyright (c) Diego Haz.
 *
 * Credits to the Ariakit team:
 * https://github.com/ariakit/ariakit/blob/232bc79018ec20967fec1e097a9474aba3bb5be7/packages/ariakit-utils/src/dom.ts
 *
 * Portions of this file are based on code from chakra-ui.
 * MIT Licensed, Copyright (c) 2019 Segun Adebayo.
 *
 * Credits to the Chakra UI team:
 * https://github.com/chakra-ui/chakra-ui/blob/59391bb95b05a13feeb9fe84b0cdb027519460ce/packages/utilities/dom-utils/src/dom.ts
 */

/**
 * Checks whether a `parent` element  is/or contains a `child` element.
 */
export function contains(parent: HTMLElement | undefined, child: HTMLElement) {
  if (!parent) {
    return false;
  }

  return parent === child || parent.contains(child);
}

export function getRelatedTarget(
  event: Pick<FocusEvent, "relatedTarget" | "target" | "currentTarget">
) {
  const target = (event.target ?? event.currentTarget) as HTMLElement;
  const activeElement = getActiveElement(target);
  return (event.relatedTarget ?? activeElement) as HTMLElement;
}

export function getActiveElement(node?: HTMLElement) {
  return getOwnerDocument(node)?.activeElement as HTMLElement;
}

export function getWindow(node?: Element | null): Window {
  return getOwnerDocument(node).defaultView || window;
}

export function getOwnerDocument(node?: Element | null): Document {
  return isElement(node) ? node.ownerDocument ?? document : document;
}

export function isElement(el: any): el is Element {
  return (
    el != null && typeof el == "object" && "nodeType" in el && el.nodeType === Node.ELEMENT_NODE
  );
}

function isScrollable(node: Element): boolean {
  const style = window.getComputedStyle(node);
  return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}

export function getScrollParent(node: Element | null): Element {
  while (node && !isScrollable(node)) {
    node = node.parentElement;
  }

  return node || document.scrollingElement || document.documentElement;
}

/**
 * Checks whether `element` is a frame element.
 */
export function isFrame(element: Element): element is HTMLIFrameElement {
  return element.tagName === "IFRAME";
}
