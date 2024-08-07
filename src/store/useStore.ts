import create from 'zustand';

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

interface StoreState {
  categories: Category[];
  currentCategory: Category | null;
  currentSubcategory: Subcategory | null;
  searchTerm: string;
  setCategories: (categories: Category[]) => void;
  setCurrentCategory: (category: Category | null) => void;
  setCurrentSubcategory: (subcategory: Subcategory | null) => void;
  setSearchTerm: (term: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  categories: [],
  currentCategory: null,
  currentSubcategory: null,
  searchTerm: '',
  setCategories: (categories) => set({ categories: categories }),
  setCurrentCategory: (category) => set({ currentCategory: category, currentSubcategory: null }),
  setCurrentSubcategory: (subcategory) => set({ currentSubcategory: subcategory }),
  setSearchTerm: (term) => set({ searchTerm: term })
}));