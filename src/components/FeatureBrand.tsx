import * as React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/react-splide/css';

export default function FeaturesBrand(props:any) {
    console.log(props.c_featureBrand)
    const photos = props.c_featureBrand.featurebrand.map((element:any) => (   
        <>
           
          <SplideSlide>
        
          <img  src={element.image.url}  className="logo-img" height={50}  width={100}/>
          </SplideSlide>
          
        </>  
      ));
  return (
    <>
    
    <div className="Features-brand ml-10">
    <h1 className="text-center text-xxl pb-3"></h1>
   <Splide id="splide-nearby"
        options={{
          rewind: false,
          type: "splide",
          perPage: 3,
          perMove: 1,
          arrows: false,
          drag: false,
          pagination: false,
          lazyLoad: "nearby",
          breakpoints: {
            1920: {
              perPage:5,
              drag: true,
              pagination: true,
              arrows: true,
              type: "splide",
            },
          },
        }}>
          {photos}
      </Splide>
      </div>
    </>
  )
}
