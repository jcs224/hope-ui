/*!
 * Portions of this file are based on code from mantinedev.
 * MIT Licensed, Copyright (c) 2021 Vitaly Rtishchev.
 *
 * Credits to the Mantinedev team:
 * https://github.com/mantinedev/mantine/blob/4fa634ebddf15a8515a9018e37b1e86d2e00883a/src/mantine-core/src/Input/Input.test.tsx
 *
 * Portions of this file are based on code from chakra-ui.
 * MIT Licensed, Copyright (c) 2019 Segun Adebayo.
 *
 * Credits to the Chakra UI team:
 * https://github.com/chakra-ui/chakra-ui/blob/95aa4499c72de28e91dd9274177c529db55e7964/packages/components/input/tests/input.test.tsx
 */

import {
  itHasSemanticClass,
  itIsPolymorphic,
  itRendersChildren,
  itSupportsClass,
  itSupportsRef,
  itSupportsStyle,
} from "@hope-ui/tests";
import { render, screen } from "solid-testing-library";

import { Input } from "./input";
import { InputLeftAddon, InputRightAddon } from "./input-addon";
import { InputGroup, InputGroupProps } from "./input-group";
import { InputLeftSection, InputRightSection } from "./input-section";

const defaultProps: InputGroupProps = {};

describe("InputGroup", () => {
  itIsPolymorphic(InputGroup as any, defaultProps);
  itRendersChildren(InputGroup as any, defaultProps);
  itSupportsClass(InputGroup as any, defaultProps);
  itHasSemanticClass(InputGroup as any, defaultProps, "hope-InputGroup-root");
  itSupportsRef(InputGroup as any, defaultProps, HTMLDivElement);
  itSupportsStyle(InputGroup as any, defaultProps);

  it("renders left and right addons", () => {
    render(() => (
      <InputGroup>
        <InputLeftAddon>left-addon</InputLeftAddon>
        <Input />
        <InputRightAddon>right-addon</InputRightAddon>
      </InputGroup>
    ));

    expect(screen.getByText("left-addon")).toBeInTheDocument();
    expect(screen.getByText("right-addon")).toBeInTheDocument();
  });

  it("renders left and right sections", () => {
    render(() => (
      <InputGroup>
        <InputLeftSection>left-section</InputLeftSection>
        <Input />
        <InputRightSection>right-section</InputRightSection>
      </InputGroup>
    ));

    expect(screen.getByText("left-section")).toBeInTheDocument();
    expect(screen.getByText("right-section")).toBeInTheDocument();
  });

  it("should forward the 'isRequired' prop to input, sections and addons", () => {
    render(() => (
      <InputGroup data-testid="input-group" isRequired>
        <InputLeftAddon>left-addon</InputLeftAddon>
        <InputLeftSection>left-section</InputLeftSection>
        <Input data-testid="input" />
        <InputRightSection>right-section</InputRightSection>
        <InputRightAddon>right-addon</InputRightAddon>
      </InputGroup>
    ));

    expect(screen.getByTestId("input")).toHaveAttribute("required");
    expect(screen.getByTestId("input-group")).toHaveAttribute("data-required");
    expect(screen.getByText("left-addon")).toHaveAttribute("data-required");
    expect(screen.getByText("left-section")).toHaveAttribute("data-required");
    expect(screen.getByText("right-section")).toHaveAttribute("data-required");
    expect(screen.getByText("right-addon")).toHaveAttribute("data-required");
  });

  it("should forward the 'isDisabled' prop to input, sections and addons", () => {
    render(() => (
      <InputGroup data-testid="input-group" isDisabled>
        <InputLeftAddon>left-addon</InputLeftAddon>
        <InputLeftSection>left-section</InputLeftSection>
        <Input data-testid="input" />
        <InputRightSection>right-section</InputRightSection>
        <InputRightAddon>right-addon</InputRightAddon>
      </InputGroup>
    ));

    expect(screen.getByTestId("input")).toHaveAttribute("disabled");
    expect(screen.getByTestId("input-group")).toHaveAttribute("data-disabled");
    expect(screen.getByText("left-addon")).toHaveAttribute("data-disabled");
    expect(screen.getByText("left-section")).toHaveAttribute("data-disabled");
    expect(screen.getByText("right-section")).toHaveAttribute("data-disabled");
    expect(screen.getByText("right-addon")).toHaveAttribute("data-disabled");
  });

  it("should forward the 'isReadOnly' prop to input, sections and addons", () => {
    render(() => (
      <InputGroup data-testid="input-group" isReadOnly>
        <InputLeftAddon>left-addon</InputLeftAddon>
        <InputLeftSection>left-section</InputLeftSection>
        <Input data-testid="input" />
        <InputRightSection>right-section</InputRightSection>
        <InputRightAddon>right-addon</InputRightAddon>
      </InputGroup>
    ));

    expect(screen.getByTestId("input")).toHaveAttribute("readonly");
    expect(screen.getByTestId("input-group")).toHaveAttribute("data-readonly");
    expect(screen.getByText("left-addon")).toHaveAttribute("data-readonly");
    expect(screen.getByText("left-section")).toHaveAttribute("data-readonly");
    expect(screen.getByText("right-section")).toHaveAttribute("data-readonly");
    expect(screen.getByText("right-addon")).toHaveAttribute("data-readonly");
  });

  it("should forward the 'isInvalid' prop to input, sections and addons", () => {
    render(() => (
      <InputGroup data-testid="input-group" isInvalid>
        <InputLeftAddon>left-addon</InputLeftAddon>
        <InputLeftSection>left-section</InputLeftSection>
        <Input data-testid="input" />
        <InputRightSection>right-section</InputRightSection>
        <InputRightAddon>right-addon</InputRightAddon>
      </InputGroup>
    ));

    expect(screen.getByTestId("input")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByTestId("input-group")).toHaveAttribute("data-invalid");
    expect(screen.getByText("left-addon")).toHaveAttribute("data-invalid");
    expect(screen.getByText("left-section")).toHaveAttribute("data-invalid");
    expect(screen.getByText("right-section")).toHaveAttribute("data-invalid");
    expect(screen.getByText("right-addon")).toHaveAttribute("data-invalid");
  });
});
