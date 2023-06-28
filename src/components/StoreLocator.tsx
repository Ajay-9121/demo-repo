// src/components/StoreLocator.tsx

import * as React from "react";
import LocationCard from "./LocationCard"; 
import {breadcrumbhome, center_latitude, center_longitude, googleApikey, search_icn, UseMylocationsvg } from "../../site-global/global";

import MapPin from "./MapPin";  
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  getUserLocation, 
  StandardCard,
  OnDragHandler, 
} from "@yext/search-ui-react";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState 
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";  
import { BiLoaderAlt } from "react-icons/bi"; 
import { LngLat, LngLatBounds } from "mapbox-gl";  

// Mapbox CSS bundle
import "mapbox-gl/dist/mapbox-gl.css";



const StoreLocator = (): JSX.Element => {


  const handleDrag: OnDragHandler = (center: LngLat, bounds: LngLatBounds) => {
    setMapCenter(center);
    setMapBounds(bounds);
    setShowSearchAreaButton(true);
  };

  const handleSearchAreaClick = () => {
    if (mapCenter && mapBounds) {
      const locationFilter: SelectableStaticFilter = {
        selected: true,
        displayName: "Current map area",
        filter: {
          kind: "fieldValue",
          fieldId: "builtin.location",
          value: {
            lat: mapCenter.lat,
            lng: mapCenter.lng,
            radius: mapBounds.getNorthEast().distanceTo(mapCenter),
          },
          matcher: Matcher.Near,
        },
      };
      searchActions.setStaticFilters([locationFilter]);
      searchActions.executeVerticalQuery();
      setShowSearchAreaButton(false);
    }
  };

// result count
  const resultCount = useSearchState(
    (state) => state.vertical.resultsCount || 0
  );
  const [showSearchAreaButton, setShowSearchAreaButton] = useState(false);
  const [mapCenter, setMapCenter] = useState<LngLat | undefined>();
  const [mapBounds, setMapBounds] = useState<LngLatBounds | undefined>();



  const searchActions = useSearchActions();
console.log(resultCount,"resultCount")
  // new code starts here...
  const [initialSearchState, setInitialSearchState] =
    useState<InitialSearchState>("not started");

  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    getUserLocation()
      .then((location) => {
        searchActions.setStaticFilters([
          {
            selected: true,
            displayName: "Current Location",
            filter: {
              kind: "fieldValue",
              fieldId: "builtin.location",
              value: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
                radius: 300000233.6, 
              },
              matcher: Matcher.Near,
            },
          },
        ]);
      })
      .catch(() => {
        searchActions.setStaticFilters([
          {
            selected: true,
            displayName: "Find Locations Near You",
            filter: {
              kind: "fieldValue",
              fieldId: "builtin.location",
              value: {
                lat: 55.953251,
                lng: -3.188267,
                radius: 3000233.6, 
              },
              matcher: Matcher.Near,
            },
          },
        ]);
      })
      .then(() => {
        searchActions.executeVerticalQuery();
        setInitialSearchState("started");
      });
  }, []);

  useEffect(() => {
    if (!searchLoading && initialSearchState === "started") {
      setInitialSearchState("complete");
    }
  }, [searchLoading]);
  // ...and ends here
  

  const handleFilterSelect = (params: OnSelectParams) => {
    const locationFilter: SelectableStaticFilter = {
      selected: true,
      filter: {
        kind: "fieldValue",
        fieldId: params.newFilter.fieldId,
        value: params.newFilter.value,
        matcher: Matcher.Equals,
      },
    };
    searchActions.setStaticFilters([locationFilter]);
    searchActions.executeVerticalQuery();
  };

  return (
    <>
    
      <div className="flex h-[calc(100vh-242px)] border">
      {initialSearchState !== "complete" && (
          <div className="absolute z-20 flex h-full w-full items-center justify-center bg-white opacity-70">
            <BiLoaderAlt className="animate-spin " size={100} />
          </div>
        )}
        <div className="flex w-1/3 flex-col">
          <FilterSearch
            onSelect={handleFilterSelect}
            placeholder="Find Locations Near You"
            searchFields={[
              {
                entityType: "location",
                fieldApiName: "name",
              },
              // {
              //   entityType: "location",
              //   fieldApiName: "address.postalCode",

              //   },

              // {
              //   entityType: "location",
              //   fieldApiName: "address.region",
              // },
              // {
              //   entityType: "location",
              //   fieldApiName: "address.city",
              // },
            ]}
            
          />
           Show Result: {resultCount}
          
          {resultCount > 0 && <VerticalResults CardComponent={LocationCard}
          
           customCssClasses={{ verticalResultsContainer: "overflow-y-auto" }}/>}
          
          {resultCount === 0 && initialSearchState === "complete" && (
            <div className="flex items-center justify-center">
              <p className="pt-4 text-2xl">No results found for this area</p>
            </div>
          )}
         
         
        </div>
        <div className="w-2/3">
          
          <MapboxMap
            mapboxAccessToken={"pk.eyJ1Ijoic2h1YmhhbXNoYXJtYWRzIiwiYSI6ImNsZnFzdDF3YjAxbzczd2xkemF5aTU4bnEifQ.akdWeB5U30Rnk10mIwEdYQ "|| ""}
            PinComponent={MapPin} 
            onDrag={handleDrag}
          />
     {showSearchAreaButton && (
            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <button
                onClick={handleSearchAreaClick}
                className="rounded-2xl border bg-white py-2 px-4 shadow-xl"
              >
                <p>Search This Area</p>
              </button>
            </div>
          )}
        </div>
       
      </div>
    </>
  );
};

export default StoreLocator;