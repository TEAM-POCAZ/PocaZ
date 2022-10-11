const config = {
  url: "https://slowtest.ml",
  google: {
    clientID:
      "552100542945-vang57mc6baqmku7l31gpqjol1ijai0i.apps.googleusercontent.com",
    clientSecret: "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",
  },
  twitter: {
    consumerKey: "cEdWN25DTk13SklLYmdfYTVYdXQ6MTpjaQ",
    consumerSecret: "PTWsFd8J-Vub_Kav5229mPBSNkZh3NeDhDrBPIC8CnFXHrnVt0",
  },
  apple: {
    clientID: "service.ml.slowtest", //service Id
    teamID: "8YG9YMXGPG", //team id
    keyID: "6T39QCZ947", //key id
  },
  session: {
    cookieKey: "hankhankhank",
  },
  mongodb: {
    dbURI:
      "mongodb+srv://hsm0156:12341234@nn-oauth-test.idumgs8.mongodb.net/?retryWrites=true&w=majority",
  },
  db: {
    host: "host.docker.internal",
    port: 3306,
    user: "root",
    database: "pocaz",
    password: "12341234",
  },
};

export default config;
