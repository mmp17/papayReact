// class designed to handle API calls related to restaurant data, particularly for fetching the top restaurants.
import axios from "axios"; // A promise-based HTTP client for making HTTP requests.
import assert from "assert"; // Used for assertions within the function.
import { serverApi } from "../../lib/config"; // a base URL for API service endpoints
import { Definer } from "../../lib/Definer"; // utility for error definitions
import { Restaurant } from "../../types/user"; // TypeScript type or interface defining the structure of a restaurant object.
import { SearchObj } from "../../types/others";

// Class Definition:
class RestaurantApiServer {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
    // Initializes this.path with serverApi, setting up the base URL for all API calls made from this class.
  }

  // getTopRestaurants Method:
  async getTopRestaurants(): Promise<Restaurant[]> {
    try {
      const url = "/restaurants?order=top&page=1&limit=4",
        // It constructs the API endpoint URL for fetching top restaurants with specific query parameters (like order, page, and limit).
        result = await axios.get(this.path + url, { withCredentials: true });
      // option is included to ensure that cookies are sent along with the request, which is important for authenticated sessions.
      assert.ok(result, Definer.general_err1);
      // It uses assert to check if the result of the API call is valid.

      console.log("result:::", result.data.state);
      // Logs the state of the result
      const top_restaurants: Restaurant[] = result.data.data;
      return top_restaurants;
      // Extracts the data from the result, which contains an array of restaurants, and returns it.
    } catch (err: any) {
      // Catches any errors that occur during the API call and logs them.
      console.log(`ERROR::: getTopRestaurants ${err.message}`);
      throw err; // Rethrows the error for further handling by the caller.
    }
  }

  async getRestaurants(data: SearchObj): Promise<Restaurant[]> {
    try {
      const url = `/restaurants?order=${data.order}&page=${data.page}&limit=${data.limit}`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err1);

      console.log("result data:::", result.data.data);
      const restaurants: Restaurant[] = result.data.data;
      return restaurants;
    } catch (err: any) {
      console.log(`ERROR::: getRestaurants ${err.message}`);
      throw err;
    }
  }
}

export default RestaurantApiServer;
