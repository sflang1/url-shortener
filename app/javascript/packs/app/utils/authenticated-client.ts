import axios from "axios";

export const createAuthClient = () => {
  const accessToken = localStorage.getItem('access_token');

  if(!accessToken) {
    return null;
  } else {
    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
  }
}