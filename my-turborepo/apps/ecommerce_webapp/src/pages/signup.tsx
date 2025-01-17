import React from "react";
import { Signup } from "@repo/ui/ui";
export default function signup() {
  return (
    <div>
      <Signup
        onClick={(name, gmail,password) => {
          alert(name);
          alert(password);
        }}
      />
    </div>
  );
}
