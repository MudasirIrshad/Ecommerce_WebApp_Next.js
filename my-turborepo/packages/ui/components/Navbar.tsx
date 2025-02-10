import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
export default function Navbar() {
  const [usertoken, setUserToken] = useState(false);
  const [admintoken, setAdminToken] = useState(false);
  const { data, status } = useSession();
  console.log(data);

  useEffect(() => {
    if (data?.user?.role === "admin" && status === "authenticated") {
      setAdminToken(true);
      console.log(data);
    } else if (data?.user?.role === "user" && status === "authenticated") {
      setUserToken(true);
    }
  }, [data, status]);
  const handleClick = () => {
    signOut();
    setAdminToken(false);
    localStorage.removeItem("authToken");
    setUserToken(false);
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
        <Link style={{ color: "black", textDecoration: "none" }} href={"/"}>
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
        </Link>

        {admintoken ? (
          <>
            <Link
              style={{ color: "black", textDecoration: "none" }}
              href={"/portal"}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  marginRight: "5px",
                }}
              >
                Portal
              </Button>
            </Link>
          </>
        ) : (
          <></>
        )}
        {usertoken ? (
          <>
            <Link
              style={{ color: "black", textDecoration: "none" }}
              href={"/userPurchasedProducts"}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  marginRight: "5px",
                }}
              >
                Products
              </Button>
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        {usertoken || admintoken ? (
          <div>
            {usertoken ? (
              <>
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  href={"/viewCart"}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      marginRight: "5px",
                    }}
                  >
                    Cart
                  </Button>
                </Link>
              </>
            ) : (
              <></>
            )}
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
          </div>
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
              <Link
                style={{ color: "black", textDecoration: "none" }}
                href={"/api/auth/signin"}
              >
                Login
              </Link>
            </Button>

            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
            >
              <Link
                style={{ color: "black", textDecoration: "none" }}
                href={"/signup"}
              >
                Signup
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
