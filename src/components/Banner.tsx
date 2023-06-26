import * as React from "react";
import { Address } from "../types/Address";
import Cta from "./Cta";

export interface BannerProps {
  name?: string;
  address?: Address;
  c_bannerSection: any;
}

const renderPrettyAddress = (address?: Address) => {
  return (
    <>
      {address && (
        <span>
          {address.line1} in {address.city}, {address.region}
        </span>
      )}
    </>
  );
};

const Banner = (props: BannerProps) => {
  // console.log(props,"dsfjdhsjkl")
  const { name, address, c_bannerSection } = props;

  return (
    <>
      <div className={`relative z-10 w-full bg-cover bg-center h-96  `}>
        <div
          className="absolute ml-5 left-0 right-0  justify-center "
          style={{ display: "flex", marginLeft: "30px" }}
        >
          <div
            className="w-96 my-8 rounded-xl bg-danger-500  shadow-xl border-amber-600 px-4 py-2 text-center"
            style={{ backgroundColor: "#f7f7f7" }}
          >
            <div>
              <h1 className="text-black text-3xl mt5 font-bold">{name}</h1>
              <p className="text-lg pt-2 text-black font-semibold">
                {renderPrettyAddress(address)}
              </p>
            </div>
            <div className="flex py-3 justify-between">
              {/* <button>GETDIRECTION</button> */}
            </div>
          </div>
          <div className="mt-10 ">
            <img
              src={c_bannerSection.headerbanner.url}
              height={20}
              width={700}
              alt=""
              style={{ height: "300px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
