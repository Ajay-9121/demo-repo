export interface TemplateMeta {
    mode: "development" | "production";
  }
  export interface BreadcrumbItem {
    name: string;
    slug: string;
  }

 export const constant={
getBreadcrumb<DataType, Document>(
    data: DataType[],
    document: Document,
    meta: TemplateMeta,
    isRecursive = true,
    skip = 0,
    basePrefix = "",
    baseName = ""
  ) {
    const breadcrumbs: BreadcrumbItem[] = [];

    if (isRecursive) {
      data?.forEach((element: DataType, index: number) => {
        if (index >= skip && index !== 0) {
          const slug = constant.getRecursiveData<DataType>(element, meta, skip);
          breadcrumbs.push({
            slug: slug,
            name: element.name,
          });
        } else if (index === 0) {
          breadcrumbs.push({
            slug: basePrefix,
            name: baseName ? baseName : element.name,
          });
        }
      });

      breadcrumbs.push({
        slug: constant.getRecursiveData(document, meta),
        name: document.name,
      });
    } else {
      let slug = "";
      data?.forEach((element: DataType, index: number) => {
        if (element.slug && index >= skip) {
          slug += `/${element.slug}`;
          breadcrumbs.push({
            slug: slug,
            name: element.name,
          });
        } else if (index === 0) {
          breadcrumbs.push({
            slug: basePrefix,
            name: baseName ? baseName : element.name,
          });
        }
      });

      breadcrumbs.push({
        slug: slug + `/${document.slug}`,
        name: document.name,
      });
    }

    return breadcrumbs;
  },

  getRecursiveData<DataType>(element: DataType, meta: TemplateMeta, skip = 0) {
    let slug = "";
    if (meta.mode === "development") {
      slug = element.slug;
    } else {
      if (element.dm_directoryParents) {
        element.dm_directoryParents.forEach((e: DataType, index: number) => {
          if (index >= skip) {
            slug += `/${e.slug}`;
          }
        });
      }
      slug += `/${element.slug}`;
    }
    return slug;
  },
}