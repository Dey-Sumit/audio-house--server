import crypto from "crypto";
import twilio from "twilio";
import HashService from "./hash.service";
import dotenv from "dotenv";
dotenv.config();

const client = twilio(process.env.SMS_SID, process.env.SMS_AUTH_TOKEN, {
  lazyLoading: true,
});

class OtpService {
  generateOtp = () => {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  };
  async sendBySms(phone: string, otp: number) {
    try {
      return await client.messages.create({
        to: phone,
        from: process.env.SMS_FROM_NUMBER,
        body: `Your audioHouse OTP is ${otp}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  verifyOtp(hashedOtp: string, data: string) {
    let computedHash = HashService.hashOtp(data);
    return computedHash === hashedOtp;
  }
}

export default new OtpService();
