import { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "db";
import jwt from "jsonwebtoken";
const SECRETKEY = "secret key";
type Response_Data = {
  token?: String;
  message?: String;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response_Data>
) {
  const { username, gmail, password } = req.body;
  const admin = await Admin.findOne({ gmail });
  if (admin) res.status(404).send({ message: "Try another Gmail" });
  else {
    const newAdmin = new Admin({ username, gmail, password });
    newAdmin.save();
    const token = jwt.sign({ username, gmail, role: "Admin" }, SECRETKEY, {
      expiresIn: "1h",
    });
    res.send({ message: "Admin Created successfully", token });
  }
}
