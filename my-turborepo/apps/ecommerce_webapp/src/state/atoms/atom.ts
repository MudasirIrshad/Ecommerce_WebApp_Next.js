import { atom } from "recoil";
const userLoginState = atom({
  key: "userLoginState",
  default: false,
});
export { userLoginState };
