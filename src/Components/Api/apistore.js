import axios from "axios";

const API_ID = "ebc8c214";
const API_KEY = "820238d7d6a98c84073eb2662527e463";

//send in body key for sending data and params for queryparams
export const getRecipes = async (config) => {
  const resp = await axios({
    method: "get",
    url: `https://api.edamam.com/search?app_id=${API_ID}&app_key=${API_KEY}`,
    ...config
  });

  return resp;
};
