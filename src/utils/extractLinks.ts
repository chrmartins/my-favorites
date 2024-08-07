interface Link {
  name: string;
  url: string;
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  name: string;
  links: Link[];
}

export const extractLinks = (htmlContent: string): Category[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const folders = Array.from(doc.querySelectorAll("dt > h3"));

  const categories: Category[] = folders.map((folder) => {
    const categoryName = folder.textContent || "Uncategorized";
    const subfolders = Array.from(
      folder.nextElementSibling?.querySelectorAll("dl > dt > h3") || []
    );

    if (subfolders.length > 0) {
      const subcategories: Subcategory[] = subfolders.map((subfolder) => {
        const subcategoryName = subfolder.textContent || "Uncategorized";
        const linkElements = Array.from(
          subfolder.nextElementSibling?.querySelectorAll("a") || []
        );
        const links: Link[] = linkElements.map((link) => ({
          name: link.textContent || "No Name",
          url: link.href,
        }));
        return {
          name: subcategoryName,
          links: links,
        };
      });
      return {
        name: categoryName,
        subcategories: subcategories,
      };
    } else {
      const linkElements = Array.from(
        folder.nextElementSibling?.querySelectorAll("a") || []
      );
      const links: Link[] = linkElements.map((link) => ({
        name: link.textContent || "No Name",
        url: link.href,
      }));
      return {
        name: categoryName,
        subcategories: [{ name: "", links: links }],
      };
    }
  });

  return categories;
};
