import log from "@libs/logger";
import { ExtendedRequest } from "@libs/types";
import hashService from "@services/hash.service";
import otpService from "@services/otp.service";
import tokenService from "@services/token.service";
import userService from "@services/user.service";
import UserDto from "dtos/user.dto";
import expressAsyncHandler from "express-async-handler";

class AuthController {
  sendOtp = () =>
    expressAsyncHandler(async (req: ExtendedRequest, res) => {
      const { phone } = req.body;
      if (!phone) {
        res.status(400).json({ message: "Phone field is required!" });
      }

      const otp = otpService.generateOtp();

      const ttl = 1000 * 60 * 2; // 2 min
      const expires = Date.now() + ttl;
      const data = `${phone}.${otp}.${expires}`;
      const hash = hashService.hashOtp(data);

      // send OTP

      await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp,
      });
    });

  verifyOtp = () =>
    expressAsyncHandler(async (req: ExtendedRequest, res) => {
      const { otp, hash, phone } = req.body;
      if (!otp || !hash || !phone) {
        res.status(400).json({ message: "All fields are required!" });
      }

      const [hashedOtp, expires] = hash.split(".");
      if (Date.now() > +expires) {
        res.status(400).json({ message: "OTP expired!" });
      }

      const data = `${phone}.${otp}.${expires}`;
      const isValid = otpService.verifyOtp(hashedOtp, data);
      if (!isValid) {
        res.status(400).json({ message: "Invalid OTP" });
      }

      let user;
      try {
        user = await userService.findUser({ phone });
        if (!user) {
          user = await userService.createUser({ phone });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Db error" });
      }

      const { accessToken, refreshToken } = tokenService.generateTokens({
        _id: user._id,
        activated: false,
      });

      await tokenService.storeRefreshToken(refreshToken, user._id);

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      const userDto = new UserDto(user);
      res.json({ user: userDto, auth: true });
    });
}

export default new AuthController();
