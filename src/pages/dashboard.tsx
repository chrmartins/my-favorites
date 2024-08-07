import { useEffect } from "react";
import { useStore } from "../store/useStore";
import Card from "../components/Card";
import FileUpload from "../components/FileUpload";
import { extractLinks } from "../utils/extractLinks";
import { FaArrowLeft } from "react-icons/fa";

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

const Dashboard: React.FC = () => {
  const {
    categories,
    currentCategory,
    currentSubcategory,
    setCategories,
    setCurrentCategory,
    setCurrentSubcategory,
  } = useStore();

  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, [setCategories]);

  const handleFileUpload = (htmlContent: string) => {
    const extractedCategories = extractLinks(htmlContent);
    setCategories(extractedCategories);
    localStorage.setItem("categories", JSON.stringify(extractedCategories)); 
  };

  const renderCards = (items: any[], onClick: (item: any) => void) => (
    <div className="flex flex-wrap justify-start w-full">
      {items.map((item, index) => (
        <Card
          key={index}
          title={item.name}
          onClick={() => onClick(item)}
          isLink={item.url ? true : false}
        />
      ))}
    </div>
  );

  return (
    <div className="flex-grow flex flex-col items-center">
      <div className="flex justify-between items-center mb-4 w-full max-w-4xl">
        <div className="flex items-center">
          {(currentCategory || currentSubcategory) && (
            <button
              onClick={() => {
                if (currentSubcategory) {
                  setCurrentSubcategory(null);
                } else {
                  setCurrentCategory(null);
                }
              }}
              className="mr-4 p-2 bg-dracula-green text-white rounded flex items-center"
            >
              <FaArrowLeft />
            </button>
          )}
        </div>
        <FileUpload onFileUpload={handleFileUpload} />
      </div>
      <div className="flex flex-col items-start w-full max-w-4xl">
        {!currentCategory && renderCards(categories, setCurrentCategory)}
        {currentCategory &&
          !currentSubcategory &&
          renderCards(currentCategory.subcategories, setCurrentSubcategory)}
        {currentSubcategory &&
          renderCards(currentSubcategory.links, (link) =>
            window.open(link.url, "_blank")
          )}
      </div>
    </div>
  );
};

export default Dashboard;
