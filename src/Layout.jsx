import { Outlet, Link } from "react-router-dom";
import logo from "./assets/logo.svg";
import logoTextless from "./assets/logo-textless.svg";
import arrowDown from "./assets/arrowdown.png";
import avatar from "./assets/avatar.png";
import FooterGroup from "./components/FooterGroup";
import chevronRight from "./assets/chevron-right.svg";
import HeaderDropdown from "./components/HeaderDropdown";
import { useState } from "react";

function Layout() {
  const genreGroup = [
    ["Aksi", "Anak-anak", "Anime", "Britania"],
    ["Drama", "Fantasi Ilmiah & Fantasi", "Kejahatan", "KDrama"],
    ["Komedi", "Petualangan", "Perang", "Romantis"],
    ["Sains & Alam", "Thriller"],
  ];
  const helpGroup = [["Kontak Kami", "Privasi", "Syarat & Ketentuan"]];

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <nav className="sticky top-0 flex flex-row justify-between items-center px-[80px] py-[25px] w-full bg-background-header max-sm:py-[18px] max-sm:px-[20px] z-50">
        <div className="flex flex-row items-center gap-[80px] max-lg:gap-[40px] max-md:gap-[20px] max-sm:gap-[12px]">
          <img src={logo} className="h-[44px] max-sm:hidden" />
          <img src={logoTextless} className="h-[18px] sm:hidden" />
          <Link className="navigation-link">Series</Link>
          <Link className="navigation-link">Film</Link>
          <Link className="navigation-link">Daftar Saya</Link>
        </div>
        <div className="relative w-screen">
          <div
            className="flex flex-row justify-end items-center gap-[8px] cursor-pointer z-50"
            onClick={toggleDropdown}
          >
            <img
              className="size-[40px] rounded-full max-sm:size-[20px]"
              src={avatar}
            />
            <img className="size-[28px] max-sm:size-[18px]" src={arrowDown} />
          </div>
          {showDropdown && <HeaderDropdown />}
        </div>
      </nav>

      <Outlet />

      <footer className="flex flex-row max-sm:flex-col w-full justify-between gap-[24px] items-center max-sm:items-start px-[80px] py-[60px] border-t-[1px] border-border-outline max-sm:p-[20px] max-sm:gap-[40px]">
        <div className="flex flex-col items-start gap-[26px] max-sm:gap-[16px]">
          <img src={logo} className="h-[44px] max-sm:h-[25px]" />
          <p className="copyright">@2023 Chill All Rights Reserved.</p>
        </div>
        <div className="flex flex-row gap-[160px] max-xl:gap-[40px] max-lg:gap-[20px] max-md:gap-[5px] max-sm:hidden">
          <div className="flex flex-col gap-[15px]">
            <p className="body-medium-bold text-text-light-primary">Genre</p>
            <FooterGroup items={genreGroup} />
          </div>
          <div className="flex flex-col gap-[15px]">
            <p className="body-medium-bold text-text-light-primary">Bantuan</p>
            <FooterGroup items={helpGroup} />
          </div>
        </div>

        <div className="flex flex-col gap-[8px] w-full cursor-pointer sm:hidden">
          <div className="flex flex-row justify-between w-full">
            <p className="body-medium-medium text-text-light-primary">Genre</p>
            <img src={chevronRight} className="s-[24px]" />
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="body-medium-medium text-text-light-primary">
              Bantuan
            </p>
            <img src={chevronRight} className="s-[24px]" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
