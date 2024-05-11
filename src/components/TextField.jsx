import eye from "../assets/eye.png";
import eyeOff from "../assets/eye-off.png";
import { useState } from "react";

function TextField(props) {
  const [type, setType] = useState(
    props.isPassword == true ? "password" : "text"
  );
  const [eyeImg, setEyeImg] = useState(eyeOff);

  const toggleEye = () => {
    if (type === "password") {
      setType("text");
      setEyeImg(eye);
    } else {
      setType("password");
      setEyeImg(eyeOff);
    }
  };

  return (
    <div className="flex flex-col mt-[37px] max-sm:mt-[20px] w-full">
      <label
        className="body-large-medium text-text-light-primary max-sm:caption2-medium"
        htmlFor={props.label}
      >
        {props.label}
      </label>
      <div className="flex gap-[20px] items-center flex-row w-full rounded-full max-sm:rounded-[12px] border border-1 border-border-input mt-[6px] py-[14px] px-[20px] max-sm:py-[8px] max-sm:px-[11px]">
        <input
          className="body-medium-regular flex-1 border-none shadow-none outline-none bg-transparent placeholder-text-light-secondary max-sm:caption2-regular text-text-light-primary"
          id={props.label}
          type={type}
          placeholder={props.placeholder}
        />
        {props.isPassword == true && (
          <img
            className="w-[20px] h-[20px] max-sm:w-[12px] max-sm:h-[12px] object-cover"
            src={eyeImg}
            onClick={toggleEye}
          />
        )}
      </div>
    </div>
  );
}

export default TextField;
