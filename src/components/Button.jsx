function Button(props) {
  return (
    <div
      className={`flex flex-row justify-center items-center rounded-full cursor-pointer ${props.customClassName}`}
    >
      {props.icon != null && (
        <img src={props.icon} className="w-[20px] h-[20px] max-sm:w-[12px] max-sm:h-[12px] object-cover" />
      )}
      <p className="body-medium-regular max-sm:caption2-semibold text-text-light-primary">
        {props.title}
      </p>
    </div>
  );
}

export default Button;
