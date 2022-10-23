import {
  createDisclosure,
  createHopeComponent,
  createIcon,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeading,
  DrawerOverlay,
  Flex,
  hope,
  HStack,
  IconButton,
  useColorMode,
} from "@hope-ui/core";
import { Link, useIsRouting } from "@solidjs/router";
import { createComputed, Show } from "solid-js";

import { NavSection } from "../NAV_SECTIONS";
import { Navigation } from "./navigation";
import { Logo, LogoDark } from "./logo";
import { HeaderLogo } from "./header-logo";

const MenuIcon = createIcon({
  viewBox: "0 0 15 15",
  path: () => (
    <path
      d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    />
  ),
});

interface MobileNavigationProps {
  sections: NavSection[];
}

export const MobileNavigation = createHopeComponent<"button", MobileNavigationProps>(props => {
  const { isOpen, open, close } = createDisclosure();

  const isRouting = useIsRouting();

  createComputed(() => isRouting() && close());

  return (
    <>
      <IconButton
        variant="plain"
        colorScheme="neutral"
        size="sm"
        aria-label="Open navigation"
        onClick={open}
      >
        <MenuIcon fontSize="1.5em" />
      </IconButton>
      <Drawer isOpen={isOpen()} onClose={close} placement="left" size="xs">
        <DrawerOverlay />
        <DrawerContent bg={{ dark: "common.background" }} p={4}>
          <HStack justify="space-between" mb={6}>
            <HeaderLogo />
            <DrawerCloseButton ml={2} />
          </HStack>
          <Navigation sections={props.sections} />
        </DrawerContent>
      </Drawer>
    </>
  );
});
