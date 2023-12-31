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
// import Favicon from "../assets/images/yext-favicon.ico";
import Banner from "../components/Banner";
import DirectoryCityGrid from "../components/DirectoryCityGrid";
import PageLayout from "../components/PageLayout";
import EditTool from "../components/EditTool";

import BreadCrumbs from "../components/Breadcrumbs";
import { TemplateMeta, constant } from "../contant";
import { DirectoryParent } from "../types/DirectoryParent";
import { LocationDocument } from "../types/env";
import { nearByLocation } from "../types/nearByLocation";

export const config: TemplateConfig = {
  stream: {
    $id: "city-stream",
    filter: {
      entityTypes: ["ce_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "c_addressRegionDisplayName",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  // return `${document.slug.toString()}`;

  var url: any = ""
  document.dm_directoryParents.map((i: any) => {
    if (i.meta?.entityType.id == 'ce_country') {
      url = `${i.slug}`
    }
    else if (i.meta?.entityType.id == 'ce_region') {
      url = `${url}/${i.slug}/${document.slug.toString()}`
    }
  })
  return url;



   // if (document.dm_directoryParents) {
  //   document?.dm_directoryParents?.map((i: any) => {
  //     if (i.meta?.entityType.id == "ce_country") {
  //       currentUrl = `${i.slug}/${document.slug.toString()}.html`;
  //     } else if (i.meta?.entityType.id == "ce_region") {
  //       let url = `${document?.dm_directoryParents?.slug}/${
  //         i.slug
  //       }/${document.slug.toString()}.html`;
  //       currentUrl = url;
  //     }
  //   });
  //   return `/${currentUrl}`;
  // } else {
  //   return `/${document.slug.toString()}.html`;
  // }
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`alias/${document.locale}/${document.id.toString()}`];
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          // href: Favicon,
        },
      },
    ],
  };
};

export const transformProps: TransformProps<any> = async (data) => {
  const { dm_directoryParents, name } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents: dm_directoryParents,
    },
  };
};



const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document
}) => {
  const {
    name,
    slug,
    description,
    address,
    siteDomain,
    dm_directoryParents,
    dm_directoryChildren,
    _site,
    
    __meta,
  } = document;

  const breadcrumbs = constant.getBreadcrumb<DirectoryParent, LocationDocument>(
    dm_directoryParents,
    document,
    __meta,
    false,
    1,
    "/",
   ""
  );

  return (
    <>
      <PageLayout _site={_site}>
        {/* <Banner name={name} c_bannerSection={undefined} /> */}
        <div className="centered-container">
        <BreadCrumbs
            breadcrumbs={breadcrumbs}
            baseUrl={relativePrefixToRoot}
          />
          <DirectoryCityGrid
            name={name}
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot} slug={slug}          />
        </div>
      </PageLayout>
      {!isProduction(siteDomain) && <EditTool data={document} />}
    </>
  );
};

export default City;
