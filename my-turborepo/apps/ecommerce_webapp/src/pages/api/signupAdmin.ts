import { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "db";
import jwt from "jsonwebtoken";
import dbConnection from "@/lib/dbConnection";
import { setCookie } from "cookies-next";

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

  const admin = await Admin.findOne({ gmail });
  if (admin) res.send({ message: "Try another Gmail" });
  else {
    const newAdmin = new Admin({ username, gmail, password });
    newAdmin.save();
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
    res.send({ message: "Admin Created successfully", token });
  }
}
