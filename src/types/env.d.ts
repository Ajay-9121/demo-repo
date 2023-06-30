import { Coordinate } from "@yext/search-ui-react";
import { DirectoryParent } from "./DirectoryParent";

/**
 * This is necessary to prevent IntelliSense from highlighting
 * the usages of import.meta.env in red due to the following issue,
 * which it looks like will be resolved in Vite v3.0.
 *
 * https://github.com/vitejs/vite/issues/6194
 */
interface ImportMeta {
  readonly env: any;
}
export interface EntityType {
  id: string;
}
export interface EntityMeta {
  id: string;
  entityType: EntityType;
  locale: string;
}
export interface LocationDocument {
  meta: EntityMeta;
  _site: any;
  id: string;
  name: string;
  slug: string;
  address: any;
  hours: any;
  yextDisplayCoordinate: Coordinate;
  dm_directoryParents: DirectoryParent[];
  mainPhone:string;
  displayCoordinate:Coordinate;
  cityCoordinate:Coordinate;
  timezone:string,
  emails:string,
  googlePlaceId:string,
  c_getDirectionsCTAText:string,
  c_pagesBusinessDescription:string,
  c_videoTitle:string,
  c_vimeoLink:string,
}


