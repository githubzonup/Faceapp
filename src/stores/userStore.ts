import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { action, observable } from "mobx";
import { getEmployeeDetail, login } from "../API/user";
import { IEmployee, IUser } from "../types";
import { StorageKeys } from "../constants";

class UserStore {
  @observable
  userDetail: IUser = {
    manage_id: "",
    username: "",
  };

  @observable
  employeeDetail: IEmployee = {
    firstname: "",
    lastname: "",
    Age: "",
    Image: "",
  };

  @observable
  selectedEmployeeId: string = "";

  @observable
  openDialog: boolean = false;

  @action
  public setEmployDetail(employeeDetail: any): void {
    this.employeeDetail = { ...employeeDetail };
  }

  @action
  public async login(credential: FormData): Promise<IUser> {
    this.userDetail = await login(credential);
    if (this.userDetail?.manage_id) {
      await AsyncStorage.setItem(
        StorageKeys.USER_DETAIL,
        JSON.stringify(this.userDetail)
      );
    }
    if (!this.userDetail?.manage_id) {
      Alert.alert("Login", "Username or password is wrong!");
    }
    return this.userDetail;
  }

  @action
  public async logout(): Promise<void> {
    await AsyncStorage.removeItem(StorageKeys.USER_DETAIL);
  }

  @action
  public async initUser(): Promise<void> {
    const userDetailBuffer: string =
      (await AsyncStorage.getItem(StorageKeys.USER_DETAIL)) || "";
    try {
      this.userDetail = JSON.parse(userDetailBuffer);
    } catch (error) {
      console.log("User not logged!");
    }
  }

  @action
  public async fetchEmployDetail(employId: string): Promise<IEmployee> {
    this.employeeDetail = await getEmployeeDetail(employId);
    return this.employeeDetail;
  }

  @action
  public setSelectedEmployeeId(employeeId: string): void {
    this.selectedEmployeeId = employeeId;
  }

  @action
  public clearStore(): void {
    this.employeeDetail = {
      firstname: "",
      lastname: "",
      Age: "",
      Image: "",
    };
    this.selectedEmployeeId = "";
  }

  @action
  public setOpenDialog(openDialog: boolean): void {
    this.openDialog = openDialog;
  }
}

export default UserStore;
