const MONGO_URI =
  "mongodb+srv://skyblue5030:dong5372@producer.pfpqnqh.mongodb.net/dclean?retryWrites=true&w=majority";
const PORT = 5000;
const CLIENT_URL = "";
const JWT_CONFIG = {
  secret:
    "3720e4764a4d160cec86a91d022c7b542569c3212b6921386feea79cce14582499b5f782488edaecd797f2460b98be3a1b3d4b2ac8bac747ea215076b16415e1",
  algorithm: "HS256",
  shortExpiresIn: "1d"
  // longExpiresIn: "7d",
};
const COOKIE_SECRET = "769af81b27662ee90255ff";

export default {
  MONGO_URI,
  PORT,
  COOKIE_SECRET,
  JWT_CONFIG,
  CLIENT_URL
};
