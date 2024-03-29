// Library Imports
import axios from "axios";
import assert from "assert";
// Utility and Configuration Imports
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
// Type Imports
import {
  BoArticle,
  BoArticleInput,
  SearchArticlesObj,
  SearchMemberArticlesObj,
} from "../../types/boArticle";

class CommunityApiServer {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async uploadImageToServer(image: any) {
    try {
      let formData = new FormData();
      formData.append("community_image", image);

      console.log(image);
      const result = await axios(`${this.path}/community/image`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const image_name: string = result.data.data;
      return image_name;
    } catch (err: any) {
      console.log(`ERROR ::: getTargetArticles ${err.message}`);
      throw err;
    }
  }

  public async createArticle(data: BoArticleInput) {
    try {
      const result = await axios.post(this.path + "/community/create", data, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const article: BoArticle = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`ERROR ::: getTargetArticles ${err.message}`);
      throw err;
    }
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

  async chosenMemberCommunityArticles(
    data: SearchMemberArticlesObj
  ): Promise<BoArticle[]> {
    try {
      const url = `${this.path}/community/articles?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`,
        result = await axios.get(url, { withCredentials: true });
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

  async chosenSingleBoArticle(id: string): Promise<BoArticle> {
    try {
      const url = `${this.path}/community/single-article/${id}`,
        result = await axios.get(url, { withCredentials: true });
      console.log("chosenSingleBoArticle state::", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.data, result?.data.message);
      const article: BoArticle = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`Error::: chosenMemberCommunityArticles, ${err.message}`);
      throw err;
    }
  }

  public async getMemberCommunityArticles(data: SearchMemberArticlesObj) {
    try {
      let url = `/community/articles?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR ::: getMemberCommunityArticles ${err.message}`);
      throw err;
    }
  }
  async getChosenArticle(art_id: string): Promise<BoArticle> {
    try {
      let url = `/community/single-article/${art_id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const article: BoArticle = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`ERROR ::: getChosenArticle ${err.message}`);
      throw err;
    }
  }

  async getBoArticles(data: SearchArticlesObj): Promise<BoArticle[]> {
    try {
      let url = `${this.path}/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
      if (data.order) {
        url += `&order=${data.order}`;
      }
      const result = await axios.get(url, { withCredentials: true });
      console.log("getBoArticles state::", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      const boArticles: BoArticle[] = result.data.data;
      return boArticles;
    } catch (err: any) {
      throw err;
    }
  }
}

export default CommunityApiServer;
