import axios from "axios";

export const getStorefrontByID = async (storefrontId) => {
  const token = localStorage.getItem("platform_token");
  console.log("token", token);
  const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
  try {
    const { data } = await axios.get(
      `${BASE_URL_LAUNCH}api/v1.0/storefront/get_storefront_by_id?id=${storefrontId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getcontractById = async () => {
  const token = localStorage.getItem("platform_token");
  const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
  try {
    const { data } = axios.get(
      `${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts/${storefrontId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
export const getTradeHubByStorefrontID = async (storefrontId) => {
  const token = localStorage.getItem("platform_token");
  const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
  try {
    const { data } = await axios.get(
      `${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts/${storefrontId}/TradeHub`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAccessMasterByStorefrontID = async (storefrontId) => {
  const token = localStorage.getItem("platform_token");
  const BASE_URL_LAUNCH = process.env.NEXT_PUBLIC_BASE_URL_GATEWAY;
  try {
    const { data } = await axios.get(
      `${BASE_URL_LAUNCH}api/v1.0/launchpad/contracts/${storefrontId}/AccessMaster`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
