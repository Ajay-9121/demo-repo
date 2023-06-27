import * as React from "react";
import { Address } from "@yext/pages/components";
import { formatPhoneNumber } from "react-phone-number-input";
import List from "../components/List";
import GetDirection from "./GetDirection";
import OpenClose from "./OpenClose";
import { StaticData } from "../../site-global/staticData";
export interface DetailsProps {
  address: any;
  phone?: string;
  services?: string[];
  hours:any;
  c_getDirectionsCTAText:any
  latitude:any
  longitude:any
  
}

const Details = ({ address, phone, services,hours,c_getDirectionsCTAText,latitude, longitude}: DetailsProps,props:any) => {
  return (
    <>
      <div className="border-b border-gray-300 bg-gray-100 shadow-md rounded-lg p-2 px-4 py-5 sm:p-6">
        <div className="grid gap-y-3">
          <div className="text-xl font-semibold">Store Details</div>
          <Address
            address={address}
            lines={[
              ["line1", "line2"],
              ["city", ",", "region"],
            ]}
          />
          {phone && (
            <span>
              <a href={`tel:${phone}`} className="hover:underline">
                phone: {formatPhoneNumber(phone)}
              </a>
            </span>
          )}
          {services && <List list={services} />}
          
          <div className="bg-red w-20 p-1">
          <GetDirection
              buttonText={c_getDirectionsCTAText?c_getDirectionsCTAText:StaticData.getDirection}
              address={address}
              latitude={latitude}
              longitude={longitude}
            />
          </div>
          <OpenClose  hours={hours} deliveryHours={hours}/>
        </div>
      </div>
    </>
  );
};

export default Details;
