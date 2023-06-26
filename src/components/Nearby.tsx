import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "@yext/pages/components";

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
        {nearByLocation.map((location: any, index: number) => {
          if (index > 0) {
            return (
              <>
                <div className="nearby-row">
                  <div className="store-name">
                    <h1>
                      {/* <a href={location.data.slug}>{location.data.name}</a> */}
                    </h1>
                  </div>
                  <div className="store-address">
                    <p>{location.data.address.line1}</p>
                  </div>
                  <div className="store-address">
                    <p>{location.data.address.city}</p>
                  </div>
                  <div className="store-address">
                    <p>{location.data.address.postalCode}</p>
                  </div>
                  <div className="store-address">
                    <p>{location.data.address.region}</p>
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
