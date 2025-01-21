import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const [usertoken, setUserToken] = useState(false);
  const [admintoken, setAdminToken] = useState(false);
  const { data, status } = useSession();
  useEffect(() => {
    if (data?.user?.name === "Admin" && status === "authenticated") {
      setAdminToken(true);
      console.log(data);
    } else if (data?.user?.name === "User" && status === "authenticated") {
      setUserToken(true);
    }
  });
  const handleClick = () => {
    signOut();
    setAdminToken(false);
  };
  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "10px",

        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "white",
            color: "black",
            marginRight: "5px",
          }}
        >
          Home
        </Button>

        {admintoken ? (
          <>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "5px",
              }}
            >
              {/* <Link href={"/addcourse"}>Courses</Link> */}
            </Button>
          </>
        ) : (
          <></>
        )}
        {usertoken ? (
          <>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "5px",
              }}
            >
              Courses
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        {usertoken || admintoken ? (
          <>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "5px",
              }}
              onClick={handleClick}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "5px",
              }}
            >
              <Link href={"/api/auth/signin"}>Login</Link>
            </Button>

            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
            >
              <Link href={"/signup"}>Signup</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
