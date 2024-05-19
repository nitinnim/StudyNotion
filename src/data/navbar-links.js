import { MdMail } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { FcAbout } from "react-icons/fc";

export const NavbarLinks = [
  {
    title: "Home",
    path: "/",
    icon: <TiHome />
  },
  {
    title: "Catalog",
    // path: '/catalog',
  },
  {
    title: "About Us",
    path: "/about",
    icon: <FcAbout />
  },
  {
    title: "Contact Us",
    path: "/contact",
    icon: <MdMail />
  },
];
