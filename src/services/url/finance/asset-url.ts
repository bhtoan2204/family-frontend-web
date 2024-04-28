import { baseUrl } from "@/services/url";

const AssetUrl = {
  getAssets: `${baseUrl}/api/v1/finance/asset/getAssets`,
  getAsset: `${baseUrl}/api/v1/finance/asset/getAsset`,
  createAsset: `${baseUrl}/api/v1/finance/asset/createAsset`,
  updateAsset: `${baseUrl}/api/v1/finance/asset/updateAsset`,
  deleteAsset: `${baseUrl}/api/v1/finance/asset/deleteAsset`,
};

export default AssetUrl;
