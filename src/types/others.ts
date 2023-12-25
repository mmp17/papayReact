// general structure for a search or query object.
export interface SearchObj {
  page: number;
  limit: number;
  order: string;
  // A string that specifies the sorting order of the results (e.g., ascending, descending, or based on certain fields).
}

// more specific version of SearchObj, tailored for product searches.
export interface ProductSearchObj {
  page: number;
  limit: number;
  order: string;
  restaurant_mb_id?: string; // is used when the product search is filtered by a specific restaurant
  product_collection?: string; // allows filtering the search within a particular product collection.
}
