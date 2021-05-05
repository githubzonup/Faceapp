import axios, { AxiosResponse } from "axios";
import { IEmployee, IUser } from "../types";
import { BASE_API_URL } from "../constants";
import moment from "moment";

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

export async function getEmployeeDetail(employId: string): Promise<IEmployee> {
  const formValue: FormData = new FormData();
  formValue.append("emp_id", employId);

  const response: AxiosResponse = await axios.post(
    `${BASE_API_URL}/face/empinfo.php`,
    formValue
  );

  return response?.data;
}

export async function createAttendance(
  managerId: string,
  employeeId: string
): Promise<void> {
  const formValue: FormData = new FormData();
  const timeObject = moment();
  formValue.append("manager_id", managerId);
  formValue.append("emp_id", employeeId);
  formValue.append("date", timeObject.format("YYYY-MM-DD"));
  formValue.append("time", timeObject.format("hh:mm:ss"));
  console.log(formValue);
  await axios.post(`${BASE_API_URL}/face/attendance.php`, formValue);
}
