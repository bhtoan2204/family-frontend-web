import { baseUrl } from "@/services/url";

const HouseholdUrl = {
  getHouseholdCategory: `${baseUrl}/api/v1/household/getHouseholdCategory`,
  getHouseholdItem: `${baseUrl}/api/v1/household/getHouseholdItem`,
  getHouseholdItemDetail: `${baseUrl}/api/v1/household/getHouseholdItemDetail`,
  createHouseholdItem: `${baseUrl}/api/v1/household/createHouseholdItem`,
  updateHouseholdItem: `${baseUrl}/api/v1/household/updateHouseholdItem`,
  deleteHouseholdItem: `${baseUrl}/api/v1/household/deleteHouseholdItem`,
  inputHouseholdDurableItem: `${baseUrl}/api/v1/household/inputHouseholdDurableItem`,
  inputHouseholdConsumableItem: `${baseUrl}/api/v1/household/inputHouseholdConsumableItem`,
};

export default HouseholdUrl;
