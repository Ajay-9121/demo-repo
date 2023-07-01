import * as React from "react";
import { Address } from "@yext/pages/components";
import { formatPhoneNumber } from "react-phone-number-input";
import List from "../components/List";
import GetDirection from "./GetDirection";
import OpenClose from "./OpenClose";
import { StaticData } from "../../site-global/staticData";
import phonenumber from "../images/icons8-phone-16.png"



const Details = (props:any) =>


{
  const {
    address,
    phone,
    latitude,
    longitude,
    hours,
    c_specific_day,
    additionalHoursText,
    yextDisplayCoordinate,
    c_storeInfoHeading,
    c_getDirectionsCTAText,
    services,
    name,
  } = props;
  return (
    <>
      <div className="border-b border-gray-300 bg-gray-100 shadow-md rounded-lg p-2 px-4 py-5 sm:p-6">
        <div className="grid gap-y-3">
          <div className="text-xl font-semibold">Store Details</div>
          <h2 className="title-name">{name}</h2>
          <Address
         
            address={address}
            lines={[
              ["line1", "line2"],
              ["city", 'region',"postalCode"]
            ]}
          />
          {phone && (
            
            <span className="flex">
               <img src={phonenumber} alt="" />
              <a href={`tel:${phone}`} className="hover:underline">
              {phone}
              </a>
            </span>
          )}
          {services && <List list={services} />}
          
          <div className="bg-red w-20 p-1">
          <GetDirection
              buttonText={"Direction"}
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
