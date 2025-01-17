import { NextApiRequest, NextApiResponse } from "next";
type Response_Data = {
  token: String;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response_Data>
) {
  const username = req.body.username;
  const gmail = req.body.gmail;
  const password = req.body.password;
  res.send();
}
