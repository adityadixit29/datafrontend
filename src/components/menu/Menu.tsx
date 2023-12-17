import { Link } from "react-router-dom";
import "./menu.scss";
import { menu } from "../../data";

const Menu = () => {
  return (
    // menu class containing menu 
    <div className="menu">
      {/* mapping values from data.ts */}
      {menu.map((item) => (
        // item id 
        <div className="item" key={item.id}>
          {/* title  */}
          <span className="title">{item.title}</span>
          {/* mapping list items  */}
          {item.listItems.map((listItem) => (
            // creating buttons 
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
