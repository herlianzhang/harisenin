import back from "./assets/background2.jpeg";
import logo from "./assets/logo.svg";
import google from "./assets/google.png";
import Button from "./components/Button";
import TextField from "./components/TextField";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="flex justify-center items-center h-screen mx-[28px]">
        <img
          className="absolute h-screen w-screen bg-black object-cover"
          src={back}
        />
        <div className="flex flex-col bg-background-signin w-[529px] z-10 items-center justify-center p-10 max-sm:p-[23px]">
          <img className="h-[44px] max-sm:h-[24px]" src={logo} />
          <h3 className="mt-[37px] max-sm:mt-[20px] h3-bold max-sm:body-large-bold text-text-light-primary">
            Daftar
          </h3>
          <p className="mt-2 max-sm:mt-1 body-medium-regular max-sm:caption2-regular text-text-light-primary">
            Selamat datang!
          </p>
          <TextField label="Username" placeholder="Masukkan username" />
          <TextField
            label="Kata Sandi"
            placeholder="Masukkan kata sandi"
            isPassword={true}
          />
          <TextField
            label="Konfirmasi Kata Sandi"
            placeholder="Masukkan kata sandi"
            isPassword={true}
          />
          <div className="mt-3 max-sm:mt-[7px] w-full flex items-center flex-row justify-between mb-[37px] max-sm:mb-[20px]">
            <p className="body-small-regular max-sm:caption2-regular text-text-light-secondary">
              Sudah punya akun?{" "}
              <span
                className="body-medium-regular max-sm:caption2-medium cursor-pointer text-text-light-primary"
              >
                <Link to="/login">Masuk</Link>
              </span>
            </p>
          </div>
          <Button
            customClassName="bg-background-extra border border-1 border-border-outline button-full"
            title="Daftar"
          />
          <p className="body-small-regular text-text-light-secondary py-2">
            Atau
          </p>
          <Button
            customClassName="border border-1 border-border-outline button-full"
            title="Daftar dengan Google"
            icon={google}
          />
        </div>
      </div>
    </>
  );
}

export default Register;
