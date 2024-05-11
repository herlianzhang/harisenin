import star from "../assets/star.svg";

function LandscapeCard(props) {
  return (
    <div className="relative h-[162px] w-[302px] flex-shrink-0 rounded-[8px] overflow-clip">
      {props.isNew && (
        <p className="absolute top-[16px] left-[16px] px-[10px] py-[4px] bg-primary-300 rounded-full text-text-light-primary body-small-bold">
          Episode Baru
        </p>
      )}
      <div className="absolute flex flex-row justify-between items-center bottom-[16px] left-[16px] right-[16px] z-10">
        <h6 className="h6-bold text-text-light-primary max-sm:body-small-bold">
          {props.title}
        </h6>
        <div className="flex flex-row items-center gap-[4px]">
          <img className="s-[16px] max-sm:s-[12px]" src={star} />
          <p className="body-small-regular max-sm:caption1-regular text-text-light-primary">
            {props.rating}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 card-gradient"></div>
      <img className="inset-0 object-cover " src={props.img} />
    </div>
  );
}

export default LandscapeCard;
