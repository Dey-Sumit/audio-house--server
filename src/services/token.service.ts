import jwt from "jsonwebtoken";
import TokenModel from "../models/Token.model";
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
class TokenService {
  generateTokens(payload: { _id: string; activated: boolean }) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token: string, userId: string) {
    try {
      await TokenModel.create({
        token,
        userId,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  async verifyAccessToken(token: string) {
    return jwt.verify(token, accessTokenSecret);
  }
}

export default new TokenService();
