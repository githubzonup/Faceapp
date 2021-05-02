import axios, { AxiosResponse } from "axios";
import { IUser } from "../types";
import { BASE_API_URL } from "../constants";

export async function login(credential: FormData): Promise<IUser> {
  const response: AxiosResponse = await axios.post(
    `${BASE_API_URL}/face/login.php`,
    credential,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response?.data;
}
