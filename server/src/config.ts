import dotenv from "dotenv";
dotenv.config();

function required(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

function processUrl(key: string): string {
  let url = required(key);
  if (process.env.NODE_ENV !== "production") {
    url = "http://localhost:8000";
  }
  return url;
}

export const config = {
  host: {
    port: required("HOST_PORT"),
    url: processUrl("HOST_URL"),
  },
  db: {
    host: required("DB_HOST"),
    port: +required("DB_PORT"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
  },
  session: {
    cookieKey: required("COOKIE_KEY"),
  },
  google: {
    clientID: required("GOOGLE_CLIENT_ID"),
    clientSecret: required("GOOGLE_CLIENT_SECRET"),
  },
  twitter: {
    consumerKey: required("TWITTER_CONSUMER_KEY"),
    consumerSecret: required("TWITTER_CONSUMER_SECRET"),
  },
  apple: {
    clientID: required("APPLE_CLIENT_ID"),
    teamID: required("APPLE_TEAM_ID"),
    keyID: required("APPLE_KEY_ID"),
  },
};
