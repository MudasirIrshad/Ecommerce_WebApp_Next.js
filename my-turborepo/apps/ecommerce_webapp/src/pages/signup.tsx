import React from "react";
import { Signup } from "@repo/ui/ui";
import axios from "axios";
type input = {
  username: string;
  gmail: string;
  password: string;
  role: string;
};
export default function signupAdmin() {
  return (
    <div>
      <Signup
        onClick={async (username, gmail, password, role) => {
          console.log(username, gmail, password, role);

          if (role === "Admin") {
            const res = await axios
              .post("/api/signupAdmin", {
                username,
                gmail,
                password,
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (role === "User") {
            const res = await axios
              .post("/api/signupUser", {
                username,
                gmail,
                password,
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
      />
    </div>
  );
}
