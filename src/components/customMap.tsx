// import *React, { Component } from 'react';
import { Component } from "react";
import * as React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

let center = {
  lat: 55.953251,
  lng: -3.188267,
};

const MyComponents = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
        <Marker
          position={{ lat: 55.953251, lng: -3.188267 }}
          icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />
      </GoogleMap>
    </LoadScript>
  );
};
export default MyComponents;
