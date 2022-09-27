import {
  checkAccessibility,
  itHasSemanticClass,
  itIsPolymorphic,
  itRendersChildren,
  itSupportsClass,
  itSupportsRef,
  itSupportsStyle,
  setupMatchMediaMock,
} from "@hope-ui/tests";
import { render, screen } from "solid-testing-library";

import { createIcon } from "../../icon";
import { PopoverCloseButton, PopoverCloseButtonProps } from "../popover-close-button";
import { Popover } from "../popover";

const BeakerIcon = createIcon({
  path: () => (
    <path
      fill="none"
      stroke-width="1.5"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
    />
  ),
});

const defaultProps: PopoverCloseButtonProps = {
  "aria-label": "test",
  children: () => <BeakerIcon />,
};

setupMatchMediaMock();

describe("PopoverCloseButton", () => {
  checkAccessibility([
    <Popover>
      <PopoverCloseButton {...defaultProps} />
    </Popover>,
  ]);
  itIsPolymorphic(PopoverCloseButton as any, defaultProps, undefined, Popover);
  itRendersChildren(PopoverCloseButton as any, defaultProps, Popover);
  itSupportsClass(PopoverCloseButton as any, defaultProps, Popover);
  itHasSemanticClass(PopoverCloseButton as any, defaultProps, "hope-Popover-closeButton", Popover);
  itSupportsRef(PopoverCloseButton as any, defaultProps, HTMLButtonElement, undefined, Popover);
  itSupportsStyle(PopoverCloseButton as any, defaultProps, undefined, Popover);

  it("should have required 'aria-label'", () => {
    render(() => (
      <Popover>
        <PopoverCloseButton data-testid="button" {...defaultProps} />
      </Popover>
    ));

    const button = screen.getByTestId("button");

    expect(button).toHaveAttribute("aria-label", defaultProps["aria-label"]);
  });
});