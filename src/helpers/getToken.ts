import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getToken = (request: NextRequest) => {
  try {
    const encordedToken = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(
      encordedToken,
      process.env.TOKEN_SECRET!
    );
    console.log(decodedToken);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
