import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
    const location = useLocation();
    const isNotLoginOrRegister = !(
        location.pathname === "/login" || location.pathname === "/register"
    );

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="sticky top-0 bg-other-background-primary border-b border-other-border py-3 px-[120px] flex justify-between items-center max-sm:py-4 max-sm:px-6">
                <img
                    src="/Logo.svg"
                    className="h-[56px] w-[237px] max-sm:h-[42px] max-sm:w-[152px]"
                    alt="logo"
                />
                {isNotLoginOrRegister && <>1234</>}
            </nav>
            <Outlet />
            <footer>Footer</footer>
        </div>
    );
};

export default Root;
