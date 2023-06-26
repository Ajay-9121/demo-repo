// src/components/LocationCard.tsx

import { CardComponent, CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Location, { Coordinate } from "../types/locations";
import { RiDirectionFill } from "react-icons/ri";
import { StaticData } from "../../site-global/staticData";

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
        <div>
          {/* <a
            target={"_blank"}
            href={location.rawData.slug}
            className="font-semibold text-orange"
            rel="noreferrer"
          >
            {location.rawData.neighborhood}
          </a> */}
          {/* <a href={location.rawData.slug}>{location.rawData.name}</a> */}
          
          <p className="text-sm">{location.rawData.address.line1}</p>
          <p className="text-sm">{`${location.rawData.address.city}, ${location.rawData.address.region} ${location.rawData.address.postalCode}`}</p>
        </div>
        <div className="p-5">
          {/* {result.distance} */}
          {metersToMiles(location.distance) }<span>{StaticData.miles}</span> 
        </div>
       
        
        
      </div>
      <div className="flex items-center">
        {location.rawData.yextDisplayCoordinate && (
          <a
            target={"_blank"}
            className="flex flex-col items-center text-sm text-orange"
            href={getGoogleMapsLink(location.rawData.yextDisplayCoordinate)}
            rel="noreferrer"
          >
            <RiDirectionFill size={24} />
            <p>Directions</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default LocationCard;