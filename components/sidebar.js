import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import styles from "../styles/sideNav.module.css";
import Router from "next/router";
import Image from "next/image";
import Cookie from "js-cookie";

// All Imports are above

const Sidebar = () => {
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(Router.pathname);
  }, []);

  const LogOut = () => {
    Cookie.remove("ds-admin-token");

    return Router.replace("/");
  };

  const Menus = [
    { title: "Dashboard", path: "/dashboard", icon: MdOutlineSpaceDashboard },
    { title: "Comics", path: "/comics", icon: BsBook },
    { title: "User Profiles", path: "/users", icon: CgProfile },
    { title: "Comments", path: "/comments", icon: FaRegComments },
    { title: "Analytics", path: "/analytics", icon: MdOutlineAnalytics },
    { title: "Contact Forms", path: "/contacts", icon: BiMessageSquareDots },
    {
      title: "Integration",
      path: "/integrations",
      icon: MdOutlineIntegrationInstructions,
    },
  ];

  const settingsMenu = [
    { title: "Settings", path: "/settings", icon: MdOutlineSettings },
    { title: "More", icon: MdOutlineMoreHoriz },
  ];

  return (
    <>
      <div>
        <Disclosure as="nav">
          <Disclosure.Button
            className={`absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group`}
          >
            <GiHamburgerMenu
              className="block md:hidden h-6 w-6"
              aria-hidden="true"
            />
          </Disclosure.Button>
          {/* Container containing The sidebar contents */}
          <div
            className={`p-6 w-1/2 h-screen z-20 fixed top-0 -left-96 lg:left-0 lg:w-80  peer-focus:left-0 peer:transition ease-out delay-150 duration-200`}
            style={{ backgroundColor: "rgb(22, 22, 22)" }}
          >
            <div className={`flex flex-col justify-start item-center`}>
              <Image src="/logo.png" alt="logo" width={550} height={20} />
              <div className={`my-4 pb-4`}>
                {Menus.map((Menu, index) => {
                  return (
                    <div
                      className={`flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto  
											${path.includes(Menu.path) ? styles.active : styles.color}`}
                      key={index}
                      onClick={() => {
                        Router.push(Menu.path);
                      }}
                    >
                      <Menu.icon className={`text-2xl`} />
                      <h3 className={`text-base font-semibold`}>
                        {Menu.title}
                      </h3>
                    </div>
                  );
                })}
              </div>
              {/* Settings and more */}
              <hr className={styles.line} />
              <div className={`my-4 pb-4`}>
                {settingsMenu.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                        styles.color
                      }
											${path.includes(item.path) ? styles.active : styles.color} `}
                      onClick={() => {
                        item.path && Router.push(item.path);
                      }}
                    >
                      <item.icon className={`text-2xl`} />
                      <h3 className={`text-base font-semibold`}>
                        {item.title}
                      </h3>
                    </div>
                  );
                })}
                {/* Log out */}
                <div
                  className={`my-4`}
                  style={{ position: "absolute", width: "85%", bottom: 0 }}
                >
                  <button onClick={LogOut}>
                    <div
                      className={`flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${styles.color}`}
                    >
                      <MdOutlineLogout className={`text-2xl`} />
                      <h3 className={`text-base font-semibold`}>Logout</h3>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Disclosure>
      </div>
    </>
  );
};

export default Sidebar;
