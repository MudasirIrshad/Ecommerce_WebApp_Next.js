import React from "react";
import { Signin } from "@repo/ui/ui";
import axios from "axios";
export default function signin() {
  return (
    <div>
      <Signin
        onClick={async (username, gmail, password) => {
          const res = await axios
            .post("/api/signin", {
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
