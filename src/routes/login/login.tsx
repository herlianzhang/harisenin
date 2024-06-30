import LoginRegisterCard from "../../components/LoginRegisterCard"

const Login = () => {
    return (
        <LoginRegisterCard>
            <div className="flex flex-col items-center gap-[10px]">
                <h3 className="heading3 text-text-dark-primary">Masuk ke Akun</h3>
                <p className="bodyMediumRegular">Yuk, lanjutin belajar di videobelajar.</p>
            </div>
        </LoginRegisterCard>
    );
};

export default Login;
