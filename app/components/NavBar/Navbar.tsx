/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
  Show,
  Avatar,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import "../../styles/Header.css";
import { FiLogOut } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";

export default function Navigation() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    router.push("/");
  };

  return (
    <Box className="header">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        {/* Logo for Deskop devices */}
        <Show above="sm">
          {/* <Avatar name="Lebelo" src={Logo.src} /> */}
          <Text fontSize={'2xl'} fontWeight={800} color={'pink.500'}>M4K</Text>
        </Show>
        <Flex flex={{ base: 1 }} justify={{ base: "start", md: "center" }}>
          {/* // Logo for Small Devices below */}
          <Show below="sm">
            {/* <Avatar name="Lebelo" src={Logo.src} /> */}
            <Text>M4K</Text>
          </Show>

          <Flex display={{ base: "none", md: "flex" }} ml={50}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            href="/"
            fontWeight={600}
            onClick={() => handleLogout()}
            colorScheme="pink"
            color={"white"}
            rightIcon={<FiLogOut />}
            _hover={{
              bg: "pink.300",
            }}
          >
            Logout
          </Button>
        </Stack>
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <Box ml="auto">
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Box>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("pink", "white");
  const activeColor = useColorModeValue("pink.500", "green");
  const currentPath = usePathname();

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={currentPath === navItem.href ? activeColor : linkColor}
                _activeLink={{
                  color: activeColor,
                }}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}

      <Button
        as={"a"}
        href="/"
        fontSize={"md"}
        onClick={() => handleLogout()}
        fontWeight={500}
        variant={"link"}
      >
        Logout
      </Button>
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  const { onToggle } = useDisclosure();
  const currentPath = usePathname();

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={
            currentPath === href // Compare currentPath with href
              ? useColorModeValue("pink.500", "green") // Active link color
              : useColorModeValue("gray.600", "gray.200") // Inactive link color
          }
        >
          {label}
        </Text>
      </Box>
    </Stack>
  );
};

interface NavItem {
  label: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/customer",
  },
  {
    label: "About",
    href: "/customer/about",
  },
 
  {
    label: "Contact",
    href: "/customer/contact",
  },
  {
    label: "Profile",
    href: "/customer/profile",
  },
//   {
//     label: "Transactions",
//     href: "/agent/transactions",
//   },
//   {
//     label: "Profile",
//     href: "/agent/profile",
//   },
];
