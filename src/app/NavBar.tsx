import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'issues', href: '/issues' },
  ];
  return (
    <nav className="flex space-x-6 border-b px-5 h-14 items-center mb-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-zinc-500 hover:text-zinc-800 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
