import * as React from "react";
import Cta from "./Cta";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";



const Header = (props: any) => {
  const linkDoms = props._site.c_headerMenu.hedermenus.map((link: any) => (
    <div className="header-menu-link">
      <a href={link.link}>{link.label}</a>
    </div>
  ));

  return (
    <Disclosure as="nav" className="bg-white shadow">
     
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-24 justify-between">
              <div className="block">
                <div
                  className="top-header hidden md:ml-6 md:flex md:space-x-4"
                  style={{ gap: "1000px" }}
                >
                  <div className="">
                    {props._site.c_topheader.topmenu.label}
                  </div>
                  <div>{props._site.c_topheader.topheader.label}</div>
                </div>
                <div
                  className="flex flex-shrink-0 sm:mb-50 items-center"
                  style={{ gap: "900px" }}
                >
                  <img
                    src={props._site.c_header.logo.url}
                    alt=""
                    width="200"
                    height="300"
                  />
                  {props._site.c_header.myAccount.label}
                </div>
              </div>
            </div>
            <div className="flex items-center mt-5 md:space-x-10">
              {linkDoms}
            </div>
          </div>

        </>
     
    </Disclosure>
  );
};

export default Header;
