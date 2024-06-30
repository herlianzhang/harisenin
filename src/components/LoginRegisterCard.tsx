const LoginRegisterCard = (props: { children: React.ReactNode }) => {
    return (
        <div className="flex-1 flex items-center justify-center px-[20px] py-[28px] w-full">
            <div className="w-[590px] bg-other-background-primary border border-[#F1F1F1] rounded-[4px] flex flex-col items-center gap-9 p-9">
                {props.children}
            </div>
        </div>
    );
};

export default LoginRegisterCard;
