import { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "db";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";
import dbConnection from "@/lib/dbConnection";
const SECRETKEY = "secret key";
type Response_Data = {
  token?: String;
  message?: String;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response_Data>
) {
  await dbConnection();
  const { username, gmail, password } = req.body;
  console.log(username);

  const admin = await Admin.findOne({ gmail, password });
  if (admin) {
    const token = jwt.sign({ gmail, role: "Admin" }, SECRETKEY, {
      expiresIn: "1h",
    });
    setCookie("authToken", token, {
      res,
      req,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });
    res.send({ message: "SignedIn successfully done" });
  } else {
    res.send({ message: "Signup first" });
  }
}
