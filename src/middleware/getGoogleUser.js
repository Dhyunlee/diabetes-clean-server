import axios from "axios";
import config from "../config/dev.js";

const { GOOGLE_REDIRECT_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = config;

const getGoogleUser = async (req, res, next) => {
  const { code } = req.query;

  if (!code)
    return res
      .status(400)
      .json({ isOk: false, msg: "인증 코드가 존재하지 않습니다." });

  try {
    // AccessToken 가져오기
    const {
      data: { access_token }
    } = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        grant_type: "authorization_code",
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: GOOGLE_REDIRECT_URL,
        code: code,
        client_secret: GOOGLE_CLIENT_SECRET
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      }
    );
    /* Kakao User 정보 가져오기 */
    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );

    const user = {
      email: data.email,
      nickname: data.name,
      provider: "google",
      snsId: data.id,
      imageData: { url: data.picture }
    };
    req.user = user;
    next();
  } catch (error) {
    console.log({ error });
    console.log(error.response);
    res.status(500).json();
  }
};

export default getGoogleUser;
