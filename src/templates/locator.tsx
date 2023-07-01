// locator.tsx

import * as React from "react";
import "../index.css";
import "../custom.css";
import StoreLocator from "../components/StoreLocator";
import { AnswerExperienceConfig } from "../config/AnswerExperienceConfig";
import {
  GetHeadConfig,
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/PageLayout";
import {
  provideHeadless,
  SandboxEndpoints,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";

export const getPath: GetPath<TemplateProps> = () => {
  return `locator`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "FiveBlow Locator",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const searcher = provideHeadless({
  apiKey: "a7da2d9674223332b4dcc7f7d19e57b1",
  
  // make sure your experience key matches what you see in the platform
  experienceKey: "five-belo",
  locale: "en",
  

  endpoints: SandboxEndpoints,
  verticalKey: "locations",
});

const Locator: Template<TemplateRenderProps> = (
    {
        relativePrefixToRoot,
        document,
        
      }
) => {
    const {
        name,
        address,
        hours,
        mainPhone,
        services,
        description,
        siteDomain,
        _site,
       
      } = document;
  return (
    <PageLayout _site={_site}>
      <SearchHeadlessProvider searcher={searcher}>
        
        <div className="mx-auto mt-5 mb-5 max-w-7xl px-4">
          
           <StoreLocator /> 
        </div>
        
      </SearchHeadlessProvider>
    </PageLayout>
  );
};

export default Locator;