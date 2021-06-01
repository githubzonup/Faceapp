import axios, { AxiosResponse } from "axios";
import { BASE_API_URL, BASE_FACE_ID } from "../constants";

export async function registerFaceId(imageName: string): Promise<any> {
  const response: AxiosResponse = await axios.post(`${BASE_FACE_ID}/face`, {
    imageName,
  });
  return response?.data;
}

export async function verifyFaceId(base64: any): Promise<any> {
  const response: AxiosResponse = await axios.post(
    `${BASE_FACE_ID}/face/verify`,
    {
      base64,
    }
  );
  return response?.data;
}

export async function insertEmployeeFaceId(
  faceId: string,
  employeeId: string
): Promise<void> {
  const formValues: FormData = new FormData();
  formValues.append("face_id", faceId);
  formValues.append("emp_id", employeeId);
  console.log(formValues);
  await axios.post(`${BASE_API_URL}/face/faceemployees.php`, formValues);
}

export async function searchEmployeeFaceId(faceId: string): Promise<string> {
  const formValues: FormData = new FormData();
  formValues.append("face_id", faceId);
  const response = await axios.post(
    `${BASE_API_URL}/face/faceidemployee.php`,
    formValues
  );
  return response?.data?.emp_id;
}

export async function verifyRegistered(employeeId: string): Promise<string> {
  const formValues: FormData = new FormData();
  formValues.append("emp_id", employeeId);
  const response = await axios.post(
    `${BASE_API_URL}/face/employee.php`,
    formValues
  );
  return response?.data?.emp_id;
}
