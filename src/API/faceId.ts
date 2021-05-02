import axios, { AxiosResponse } from "axios";
import { BASE_FACE_ID } from "../constants";

export async function registerFaceId(imageName: string): Promise<any> {
  const response: AxiosResponse = await axios.post(`${BASE_FACE_ID}/face`, {
    imageName,
  });
  return response?.data;
}

export async function verifyFaceId(imageName: string): Promise<any> {
  const response: AxiosResponse = await axios.post(
    `${BASE_FACE_ID}/face/verify`,
    {
      imageName,
    }
  );
  return response?.data;
}
