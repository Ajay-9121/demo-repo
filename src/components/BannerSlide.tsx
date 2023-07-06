import { Splide, SplideSlide } from '@splidejs/react-splide'
import React from 'react'


export default function BannerSlide(props:any) {
 const BannerSlide=props.c_bannerSlide.bannerslide.map((element:any)=>
    {
        return <>
        <SplideSlide>
        <img src={element.image.url} alt=""/>
        </SplideSlide>
        
        </>
    })
  return (
    <>
   <div className='banner-slide'>
   <Splide>
  {BannerSlide}
 
</Splide>
</div>
    </>
  )
}
