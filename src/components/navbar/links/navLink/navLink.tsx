import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  path: string;
  title: string;
}

const NavLink = ({ path, title }: NavLinkProps) => {
  const pathName = usePathname();
  return (
    <Link
      href={path}
      className={`min-w-[100px] p-[10px] rounded-[20px] font-medium text-center ${
        pathName === path && "bg-[var(--text)] text-[var(--bg)]"
      } `}
    >
      {title}
    </Link>
  );
};

export default NavLink;
