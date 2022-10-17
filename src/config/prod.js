const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET
const COOKIE_SECRET = process.env.COOKIE_SECRET


export default {
  mongoURI,
  port,
  JWT_SECRET,
  COOKIE_SECRET
};
