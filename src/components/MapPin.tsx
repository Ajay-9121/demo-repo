import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { PinComponent } from "@yext/search-ui-react";
import { Popup, LngLatLike, Map } from "mapbox-gl";
import Location, { Coordinate } from "../types/Location";
import { useCallback, useEffect, useRef, useState } from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import marker from "../images/map.svg";
import { Result } from "@yext/search-headless-react";

const transformToMapboxCoord = (
  coordinate: Coordinate
): LngLatLike | undefined => {
  if (!coordinate.latitude || !coordinate.longitude) return;
  return {
    lng: coordinate.longitude,
    lat: coordinate.latitude,
  };
};

const getLocationHTML = (location: Location) => {
  const address = location.address;
  const html = (
    <div>
      <p className="font-bold text-sm text-red">{location.name || "unknown location"}</p>
      <p className="text-sm">{location.address.line1}</p>
      <p className="text-sm">{`${address.city}, ${address.region}, ${address.postalCode}`}</p>
    </div>
  );
  return ReactDOM.renderToString(html);
};

const MapPin: PinComponent<Location> = ({
  index,
  mapbox,
  result,
}: {
  index: number;
  mapbox: Map;
  result: Result<Location>;
}) => {
  const location = result.rawData;
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15 }).on("close", () => setActive(false))
  );

  useEffect(() => {
    if (active && location.yextDisplayCoordinate) {
      const mapboxCoordinate = transformToMapboxCoord(
        location.yextDisplayCoordinate
      );
      if (mapboxCoordinate) {
        popupRef.current
          .setLngLat(mapboxCoordinate)
          .setHTML(getLocationHTML(location))
          .addTo(mapbox);
      }
    }
  }, [active, mapbox, location]);

  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  return (
    <button onClick={handleClick}>
      {/* <GiCommercialAirplane className="text-green"  size={30} /> */}
      <img src={marker} width={70} alt=""/>
     
    </button>
  );
};

export default MapPin;