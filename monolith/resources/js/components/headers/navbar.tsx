import { menuData } from "@/db/menuData";
import { Link, usePage } from "@inertiajs/react";
import { Fragment, ReactNode } from "react";

type MenuLinkProps = {
  link: string;
  className?: string;
  children: ReactNode;
};

const MenuLink = ({ link, className, children }: MenuLinkProps) =>
  link.startsWith("#") ? (
    <a href={link} className={className}>
      {children}
    </a>
  ) : (
    <Link href={link} className={className}>
      {children}
    </Link>
  );

function Navbar() {
  const { url } = usePage();

  return (
    <ul>
      {menuData.map(({ link, title, megamenu, submenu }, index) => {
        const isActive =
          link !== "#" && (url === link || (link !== "/" && url.startsWith(link)));

        return (
        <li
          key={index}
          className={`${megamenu ? "menu-thumb" : ""} ${
            submenu ? "has-dropdown" : ""
          } ${isActive ? "active" : ""}`}
        >
          <MenuLink link={link}>
            {title}{" "}
            {megamenu || submenu ? <i className="fas fa-angle-down" /> : ""}
          </MenuLink>
          {megamenu?.length && (
            <ul className="submenu has-homemenu">
              <li className="homemenu-items">
                {megamenu.map(({ image, links, title }, index) => (
                  <div key={index} className="homemenu">
                    <div className="homemenu-thumb">
                      <img src={image} alt="img" />
                      <div className="demo-button">
                        {links.map(({ link, title }, ind) => (
                          <MenuLink key={ind} link={link} className="theme-btn">
                            <span>{title}</span>
                          </MenuLink>
                        ))}
                      </div>
                    </div>
                    <div className="homemenu-content text-center">
                      <h4 className="homemenu-title">{title}</h4>
                    </div>
                  </div>
                ))}
              </li>
            </ul>
          )}
          {submenu?.length && (
            <ul className="submenu">
              {submenu.map((dropdown, ind) => (
                <Fragment key={ind}>
                  {dropdown.submenu ? (
                    <li className="has-dropdown">
                      <MenuLink link={dropdown.link || '#'}>
                        {dropdown.title} <i className="fas fa-angle-down" />
                      </MenuLink>
                      <ul className="submenu">
                        {dropdown.submenu.map((subDropdown, index) => (
                          <li key={index}>
                            <MenuLink link={subDropdown.link}>
                              {subDropdown.title}
                            </MenuLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li>
                      <MenuLink link={dropdown.link}>{dropdown.title}</MenuLink>
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          )}
        </li>
      );
      })}
    </ul>
  );
}

export default Navbar;
