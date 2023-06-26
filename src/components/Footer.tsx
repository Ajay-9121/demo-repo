import * as React from "react";

export interface FooterProps {
  _site?: any;
  logo?: string;
  paragraph?: string;
}

const currentTime = new Date();
const year = currentTime.getFullYear();

const Footer = (props: FooterProps) => {
  const { paragraph } = props;
  const linkDoms = props._site.c_footerMenu.footermenu.map((link: any) => (
    <div className="header-link" key={link.label}>
      {link.label}
    </div>
  ));

  return (
    <>
      <footer className="bg-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="footer-banner">
          <img src={props._site.c_footerBanner.footerbanner.url} alt="" />
        </div>
        <div className="footer-top mb-5" style={{ marginLeft: "100px" }}>
          {" "}
          <a href="#" style={{ display: "flex", gap: "40px" }}>
            {linkDoms}
          </a>{" "}
        </div>
        <div className="mx-auto border-t max-w-7xl px-6 pb-8 pt-5 sm:pt-2 lg:px-8 lg:pt-20">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-6">
              <div className=" space-x-6">
                {props._site.c_middleFooter.content}
                <button className="footer-button">
                  <a href="#">{props._site.c_middleFooter.sign.label} </a>
                </button>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-100 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  {props._site.c_middleFooter.content}
                  <ul role="list" className="flex mt-6">
                    {/* social media icon */}
                    {props._site.c_middleFooter.footericon.map((index: any) => (
                      <li className="footer-icon">
                        <a href="#">
                          <img
                            className="footer-icon-img"
                            src={index.url}
                            alt="img"
                            height={100}
                            width={30}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <ul role="list" className="mt-6 space-y-4">
                    {/* sign in button */}
                    {props._site.c_middleFooter.content}
                    <button className="footer-button">
                      <a href="#">{props._site.c_middleFooter.sign.label} </a>
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className=" border-gray-900/10  pb-5 sm:mt-10 lg:mt-10"
            style={{ backgroundColor: "black", padding: "10px" }}
          >
            <p
              className="text-xs leading-5 text-white  "
              style={{
                display: "flex",
                gap: "50px",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {/* &copy; {year} Your Company, Inc. All rights reserved. */}
              {props._site.c_middleFooter.footerbottom.map((index: any) => (
                <li style={{ listStyleType: "none" }}>{index.label} </li>
              ))}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
