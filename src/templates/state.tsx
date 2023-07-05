import * as React from "react";
import "../index.css";
import "../custom.css";
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
// import Favicon from "../assets/images/yext-favicon.ico";
import Banner from "../components/Banner";
import DirectoryStateGrid from "../components/DirectoryStateGrid";
import PageLayout from "../components/PageLayout";
import EditTool from "../components/EditTool";
// import Breadcrumbs from "../components/Breadcrumbs";
import BreadCrumbs from "../components/Breadcrumbs";

export const config: TemplateConfig = {
  stream: {
    $id: "state-stream",
    filter: {
      entityTypes: ["ce_region"],
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
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_childEntityIds",
      "dm_childEntityIds",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  // return `${document.slug.toString()}`;

  let url = "";
  document.dm_directoryParents.map((i: any) => {
    if (i.meta?.entityType.id == 'ce_country') {
      url += i.slug + "/";
    }
  });
  url += document.slug.toString();

  return url;
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
  const { dm_directoryParents, name, address} = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" ,address});

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents: dm_directoryParents,
    },
  };
};

const State: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    slug,
    address,
    description,
    siteDomain,
    c_addressRegionDisplayName,
    dm_directoryParents,
    dm_directoryChildren,
    _site,
  } = document;
  // console.log(name)
  console.log(dm_directoryChildren)

  

 
  return (
    <>
      <PageLayout _site={_site}>
        {/* <Banner
          name={c_addressRegionDisplayName ? c_addressRegionDisplayName : name}
          c_bannerSection={undefined}
        /> */}
        <div className="centered-container">
        <BreadCrumbs
            breadcrumbs={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          />
          <DirectoryStateGrid
            name={
              c_addressRegionDisplayName ? c_addressRegionDisplayName : name
            }
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
       
       
        </div>
      </PageLayout>
      {/* This component displays a link to the entity that represents the given page in the Knowledge Graph*/}
      {!isProduction(siteDomain) && <EditTool data={document} />}
    </>
  );
};

export default State;
