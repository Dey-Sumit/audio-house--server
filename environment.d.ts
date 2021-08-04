declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: "development" | "production";
      SESSION_SECRET: string;
      HASH_SECRET: string;
      CLIENT_URL: string;
      SMS_SID: string;
      SMS_AUTH_TOKEN: string;
      SMS_FROM_NUMBER: string;
      DB_URL: string;
      JWT_ACCESS_TOKEN_SECRET: string;
      JWT_REFRESH_TOKEN_SECRET: string;
    }
  }
}
export {};
