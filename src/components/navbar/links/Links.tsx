import NavLink from "@/components/navbar/links/navLink/navLink";
import LocalStorage from "@/store/local-storage";
import Image from "next/image";
import { useState } from "react";

const links = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "About",
    path: "/about",
  },
  {
    id: 3,
    title: "Services",
    path: "/services",
  },
  {
    id: 4,
    title: "Contact",
    path: "/contact",
  },
];

const profileLinks = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Profile",
    path: "/profile/detail",
  },
  {
    id: 3,
    title: "Change Password",
    path: "/profile/change-password",
  },
  {
    id: 4,
    title: "Settings",
    path: "/settings",
  },
  {
    id: 5,
    title: "Logout",
    path: "/logout",
  },
];

const Links = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="container">
      <div className="flex items-center gap-[10px]">
        {links.map((link) => (
          <NavLink key={link.id} path={link.path} title={link.title} />
        ))}
        {LocalStorage.GetAccessToken() && (
          <div className="cursor-pointer">
            <button onClick={() => setIsOpened(!isOpened)}>
              <Image src="/student.png" alt="user" width={30} height={30} />
            </button>
          </div>
        )}
      </div>
      <div className="absolute top-[100px] right-[-100] w-[50%] h-[200px] bg-[var(--bg)] flex flex-col items-center justify-center gap-[10px]">
        {isOpened &&
          profileLinks.map((link) => (
            <NavLink path={link.path} key={link.id} title={link.title} />
          ))}
      </div>
    </div>
  );
};

export default Links;
