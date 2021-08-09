import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply authorisation token to every request if you are logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;