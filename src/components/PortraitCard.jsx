import React from "react";

function PortraitCard(props) {
  return (
    <div className="relative h-[365px] w-[234px] max-sm:h-[143.39px] max-sm:w-[95.6px] flex-shrink-0 rounded-[8px] overflow-clip">
      {props.isNew && (
        <p className="absolute top-[16px] left-[16px] px-[10px] py-[4px] bg-primary-300 rounded-full text-text-light-primary body-small-bold max-sm:extra2-bold max-sm:top-[7.65px] max-sm:left-[7.65px] max-sm:px-[4.78px] max-sm:py-[3px]">
          Episode Baru
        </p>
      )}
      {props.top != null && (
        <p className="absolute text-center top-0 right-[12px] bg-[#B71F1D] p-[4px] body-small-regular text-text-light-primary rounded-tr-[4px] rounded-bl-[4px] max-sm:rounded-tr-[2px] max-sm:rounded-bl-[2px] max-sm:extra1-regular max-sm:p-[2px] max-sm:right-[4px]">
          Top
          <br />
          {props.top}
        </p>
      )}

      <img className="inset-0 object-cover " src={props.img} />
    </div>
  );
}

export default PortraitCard;
