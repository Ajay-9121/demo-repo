// src/components/LocationCard.tsx

import { CardComponent, CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Location, { Coordinate } from "../types/Location";
import { RiDirectionFill } from "react-icons/ri";
import { StaticData } from "../../site-global/staticData";

import phone from "../images/icons8-phone-16.png"

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
}

const LocationCard: CardComponent<Location> = ({
  result,

}: CardProps<Location>): JSX.Element => {
  const location:any = result;
console.log(location,"all locations")
  // function that takes coordinates and returns a google maps link for directions
  const getGoogleMapsLink = (coordinate: Coordinate): string => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinate.latitude},${coordinate.longitude}`;
  };

  return (
    <div className="flex justify-between border-y p-4">
      <div className="flex p-x-15">
        <div className="card-address">
          {/* <a
            target={"_blank"}
            href={location.rawData.slug}
            className="font-semibold text-orange"
            rel="noreferrer"
          >
            {location.rawData.neighborhood}
          </a> */}
       
          <h3 className="text-red text-xl"><a href={location.rawData.slug}>{location.rawData.name}</a></h3>
          <p className="text-md">{location.rawData.address.line1}</p>
          <p className="text-md">{`${location.rawData.address.city}, ${location.rawData.address.region} ${location.rawData.address.postalCode}`}</p>
          <p className="flex p-2"><img src={phone} alt="" /><span>{location.rawData.mainPhone}</span></p>
          <button className="text-red "><a href={location.rawData.slug}>View Details</a></button>
        </div>
        <div className="miles">
          {/* {result.distance} */}
          {metersToMiles(location.distance) }<span>{StaticData.miles}</span> 
        </div>
       
        
        
      </div>
      <div className="flex items-center text-red ">
        {location.rawData.yextDisplayCoordinate && (
          <a
            target={"_blank"}
            className="flex flex-col items-center text-sm text-orange"
            href={getGoogleMapsLink(location.rawData.yextDisplayCoordinate)}
            rel="noreferrer"
          >
            <RiDirectionFill size={30} />
            <p>Directions</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default LocationCard;