import UserStore from "./userStore";

export default class RootStore {
  userStore: UserStore;
  
  constructor() {
    this.userStore = new UserStore();
  }
}
