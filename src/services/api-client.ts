import axios from "axios";

export default axios.create({
  baseURL: "https://api.spoonacular.com",
  params: {
    apiKey: "3b1b5dadf8504e8b9423e69403c22708",
  },
});
