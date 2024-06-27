'use client';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { userAgent } from 'next/server';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'issues', href: '/issues/list' },
  ];
  return (
    <nav className="border-b px-5 py-4 mb-5">
      <Container>
        <Flex justify="between">
          <Flex gap="4" align="center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames({
                      'text-zinc-900': link.href === currentPath,
                      'text-zinc-500': link.href !== currentPath,
                      'hover:text-zinc-800 transition-colors': true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              // <Link href="/api/auth/signout">Logout</Link>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    className="cursor-pointer"
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Label>
                    <DropdownMenu.Item>
                      <Link href="/api/auth/signout">Logout</Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Label>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
