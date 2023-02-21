import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://fingobox.com/",
  timeout: 1000,
  headers: {
    Accept: "application/json",
    //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  },
});

export default axiosClient;
