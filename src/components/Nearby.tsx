import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "@yext/pages/components";
import Address from "../components/Address";
import GetDirection from "../components/GetDirection";
import OpenClose from "../components/OpenClose"

export default function Nearby(props: any) {
  console.log(props);
  const [nearByLocation, setNearbyLocation] = useState(
    props.externalApiData.response.results
  );
  console.log(nearByLocation, "dfgjldsflk");
  return (
    <>
      <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "40px" }}>
        Nearby stores
      </h1>
      <div className="nearby-section">
        {nearByLocation?.map((location: any, index: number) => {
          if (index > 0) {
            return (
              <>
          



                <div className="nearby-card">
                    <div className="location-name-miles icon-row">
                      <h2><Link className="inline-block notHighlight" href={`/${location.data.id.toLowerCase()}`}
                        data-ya-track={`${location.data.name}`}
                        eventName={`${location.data.name}`}
                        rel="noopener noreferrer">{location.data.name}</Link></h2>

                    </div>
                    <div className="icon-row content-col">
                      <Address address={location.data.address} />
                      <div className="distance">
                      {/* {metersToMiles(location.distance)}<span>miles</span> */}
                      </div>
                      
                    </div>
                    <div>{location.data.mainPhone}</div>
                    
                    <div className="icon-row closeing-div">
                    {location.data.hours?
                    <div className="flex open-now-string items-center " data-id={`main-shop-${location.data.id}`} >
                      <OpenClose timezone={location.data.timezone} hours={location.data.hours} deliveryHours={location.data.hours}></OpenClose>
                    </div>:
                    <div className="closeddot notHighlight red-dot">
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
           <circle id="Ellipse_5" data-name="Ellipse 5" cx="4" cy="4" r="4" fill="#ad1e1f"/>
         </svg>
                   <div className="hours-info text-lg font-second-main-font closeddot"> 
                   Closed
                   </div>
                   </div>
                    }
                    </div> 
                    <div className="button-bx flex">
                      <div className="store-details">
                      <Link className="btn" href={`/${location.data.id.toLowerCase()}`}
                       data-ya-track={`viewstore-${location.data.name}`}
                       eventName={`viewstore-${location.data.name}`}
                       rel="noopener noreferrer">
                        {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
                        View Details  </Link>
                        </div>
                        <div className="get-direction">
                        <GetDirection buttonText={props.c_getDirectionsCTAText?props.c_getDirectionsCTAText:"Get directions"} address={location.data.address} latitude={location.data.displayCoordinate ? location.data.displayCoordinate.latitude : location.data.yextDisplayCoordinate.latitude} longitude={location.data.displayCoordinate ? location.data.displayCoordinate.longitude : location.data.yextDisplayCoordinate.longitude} />
                        </div>
                     
                      
                    </div>
                  </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
}
