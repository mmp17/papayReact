// Library Imports
import axios from "axios";
import assert from "assert";
// Utility and Configuration Imports
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
// Type Imports
import {
  BoArticle,
  SearchArticlesObj,
  SearchMemberArticlesObj,
} from "../../types/boArticle";

class CommunityApiServer {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTargetArticles(data: SearchArticlesObj) {
    try {
      let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state", result.data.state);

      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR ::: getTargetArticles ${err.message}`);
      throw err;
    }
  }

  async chosenMemberCommunityArticles(data: SearchMemberArticlesObj) {
    try {
      const url = `${this.path}/community/articles?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("chosenMemberCommunityArticles state::", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.data, result?.data.message);
      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`Error::: chosenMemberCommunityArticles, ${err.message}`);
      throw err;
    }
  }
}
export default CommunityApiServer;
