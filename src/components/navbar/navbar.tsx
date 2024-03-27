import Link from "next/link";
import Links from "./links/Links";

const Navbar = () => {
  return (
    <div className="h-[100px] flex items-center justify-between">
      <Link href="/" className="text-3xl font-bold">
        FamFund
      </Link>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;
