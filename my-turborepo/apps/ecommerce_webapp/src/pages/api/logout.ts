import { NextApiRequest, NextApiResponse } from "next";

import { deleteCookie, getCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token: any = getCookie("authToken", { req, res });

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    deleteCookie("authToken", { req, res });
    console.log("logout successful");
  }
}
