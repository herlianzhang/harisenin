import account from "../assets/account.svg";
import star from "../assets/star.svg";
import logout from "../assets/logout.svg";

function HeaderDropdown() {
  return (
    <div className="absolute flex flex-col mt-[12px] right-0 bg-background-header z-10 rounded-[4px] py-1">
      <div className="flex flex-row gap-[8px] px-[12px] py-[8px] cursor-pointer">
        <img className="s-[16px]" src={account} />
        <p className="shrink-0 text-primary-500 caption2-medium">Profil Saya</p>
      </div>
      <div className="flex flex-row gap-[8px] px-[12px] py-[8px] cursor-pointer">
        <img className="s-[16px]" src={star} />
        <p className="shrink-0 text-text-light-primary caption2-medium">
          Ubah Premium
        </p>
      </div>
      <div className="flex flex-row gap-[8px] px-[12px] py-[8px] cursor-pointer">
        <img className="s-[16px]" src={logout} />
        <p className="shrink-0 text-text-light-primary caption2-medium">
          keluar
        </p>
      </div>
    </div>
  );
}

export default HeaderDropdown;
