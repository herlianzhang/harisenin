import { Link } from "react-router-dom";

function FooterGroup(props) {
  const items = props.items;
  return <div className="flex flex-row gap-[28px]">
    {items.map(item => (
        <div className="flex flex-col gap-[13px]">
            {
                item.map(subItem =>(
                    <Link className="body-medium-medium text-text-light-secondary">{subItem}</Link>
                ))
            }
        </div>
    ))};
  </div>;
}

export default FooterGroup;
