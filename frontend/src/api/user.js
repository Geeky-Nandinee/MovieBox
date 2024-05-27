// C:\MovieBox\frontend\src\api\user.js
import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const getUserDetails = async (userId) => {
  try {
    const token = getToken();
    const { data } = await client.get(`/user/${userId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
