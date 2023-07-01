// import *React, { Component } from 'react';
import { Component } from "react";
import * as React from "react";
import marker from "../images/map.svg";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

let center = {
  lat: 55.953251,
  lng: -3.188267,
};

const CustomMap = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
        <Marker
          position={{ lat: 55.953251, lng: -3.188267  }}
          icon={marker}
         
        />
      </GoogleMap>
    </LoadScript>
  );
};
export default CustomMap;
