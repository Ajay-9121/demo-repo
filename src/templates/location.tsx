/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Pages system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import { isProduction } from "@yext/pages/util";
import "../index.css";
import "../custom.css";
import Favicon from "../assets/images/yext-favicon.ico";
import About from "../components/About";
import Banner from "../components/Banner";
import Details from "../components/Details";
import Hours from "../components/Hours";
import PageLayout from "../components/PageLayout";
import EditTool from "../components/EditTool";
import BreadCrumbs from "../components/Breadcrumbs";
import CustomMap from "../components/customMap";
import Nearby from "../components/Nearby";
import PhotoGallery from "../components/PhotoGallery";
import OpenClose from "../components/OpenClose"
import { StaticData } from "../../site-global/staticData";
// import { AnswerExperienceConfig } from "../config/answersHeadlessConfig";

import { nearByLocation } from "../types/nearByLocation";
import Faq from "../components/faq";
import GetDirection from "../components/GetDirection";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "location-stream",
    // Defines the scope of entities that qualify for this stream.
    // You can use entityTypes, savedFilterIds, and/or entityIds
    filter: {
      entityTypes: ["location"],
    },
    // Specifies the exact data that each generated document will contain.
    // This data is passed in directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "displayCoordinate",
      "cityCoordinate",
      "yextDisplayCoordinate",
      "services",
      "photoGallery",
      "c_fooetbnSection",
      "c_bannerSection",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.dm_baseEntityCount",
      "dm_directoryParents.meta.entityType",
      "c_faqSection.question",
      "c_faqSection.answer",
      "c_aboutUsSection",
      "c_photoGallery",
    ],
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
    transform: {
      replaceOptionValuesWithDisplayNames: ["paymentOptions"],
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: To preview production URLs locally, you must return document.slug from this function
 * and ensure that each entity has the slug field pouplated.
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url = "";
  var name: any = document.name.toLowerCase();
  var string: any = name.toString();;
  let result: any = string.replaceAll(" ", "-");
  document?.dm_directoryParents?.map((result: any, i: number) => {
    if (i > 0) {
      url += result.slug + "/"
    }
  })
  if (!document.slug) {
    url += `${result}.html`;
  } else {
    url += `${document.slug.toString()}.html`;
  }
 
  return url;
  
  
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.locale}/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
// export const transformProps: TransformProps<any> = async (data) => {
//   const { dm_directoryParents, name } = data.document;

//   (dm_directoryParents || []).push({ name: name, slug: "" });

//   return {
//     ...data,
//     document: {
//       ...data.document,
//       dm_directoryParents: dm_directoryParents,
//     },
//   };
// };

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */



// add nearby location

type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {

  // var location = `${data.document.yextDisplayCoordinate ? data.document.yextDisplayCoordinate.latitude : data.document.displayCoordinate.latitude},${data.document.yextDisplayCoordinate ? data.document.yextDisplayCoordinate.longitude : data.document.displayCoordinate.longitude}`;

  const url = `https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query?experienceKey=five-belo&api_key=a7da2d9674223332b4dcc7f7d19e57b1&v=20220511&version=STAGING&locale=en&verticalKey=locations&retrieveFacets=true&facetFilters=%7B%7D&skipSpellCheck=false&session_id=2ac0eae3-77dc-4f29-b42e-7956c52f44b0&locationRadius=400023360&sessionTrackingEnabled=true&sortBys=[]&source=STANDARD&limit=4`;

  console.log(url);
  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()

  )) as nearByLocation;
  return { ...data, externalApiData };
}

type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
}

const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  document,
  externalApiData,
}) => {
  const {
    name,
    address,
    hours,
    mainPhone,
    services,
    latitude,
    longitude,
    description,
    geocodedCoordinate,
    displayCoordinate,
    cityCoordinate,
    yextDisplayCoordinate,
    siteDomain,
    c_photoGallery,
    _site,
    dm_directoryParents,
    c_faqSection,
    c_bannerSection,
    c_fooetbnSection,
    c_aboutUsSection,
    c_getDirectionsCTAText
    
  } = document;
  console.log('document', document)

  return (
    <>
      <PageLayout _site={_site}>
      <BreadCrumbs
          breadcrumbs={dm_directoryParents}
          baseUrl={relativePrefixToRoot} parents={undefined}          />
        <Banner
          name={name}
          address={address}
          // phone={mainPhone}
          c_bannerSection={c_bannerSection}
        />

        <div className="centered-container">
         
          <div className=" grid gap-x-10 gap-y-10 md:grid-cols-3">
           
            <Details address={address} phone={mainPhone} services={services} hours={hours} c_getDirectionsCTAText={c_getDirectionsCTAText} latitude={latitude} longitude={longitude}/>
           
            {hours && <Hours title={"Restaurant Hours"} hours={hours} />}

            {/* {description && <About name={name} description={description} />} */}
           
            <div>
              <CustomMap />
            </div>
          </div>
        </div>
        {/* about section */}
        <div className="about-main">
        <div className="about-img">
            <img src={c_aboutUsSection.aboutimg.url} alt="" height={100} width={700} />
          </div>
          <div className="about-container">
            <h1 className="about-title">{c_aboutUsSection.title}</h1>
          <p>{c_aboutUsSection.description}</p>
          <button className="about-btn"><a href="#">{c_aboutUsSection.viewmore.label}</a></button>
          </div>
         
        </div>
        
        <Faq prop={c_faqSection} c_fAQsCta={document.c_fAQsCta} />
        <Nearby externalApiData={externalApiData} />
        {/* <PhotoGallery c_photoGallery={c_photoGallery}/> */}
        <div  className="flex">
        {c_photoGallery.map((index:any)=>{
          return <>
          <div>
          <img src={index.url} alt="" height={100} width={300} />
          </div>
          
          </>
        })}
        </div>
       
      </PageLayout>
      {/* This component displays a link to the entity that represents the given page in the Knowledge Graph*/}
      {!isProduction(siteDomain) && <EditTool data={document} />}
    </>
  );
};

export default Location;
