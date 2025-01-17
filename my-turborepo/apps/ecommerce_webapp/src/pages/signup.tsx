import React from "react";
import { Signup } from "@repo/ui/ui";
import axios from "axios";
export default function signup() {
  return (
    <div>
      <Signup
        onClick={async (username, gmail, password) => {
          const res = await axios
            .post("/api/signup", {
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
        }}
      />
    </div>
  );
}
