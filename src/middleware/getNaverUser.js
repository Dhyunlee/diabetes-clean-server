import axios from "axios";
import config from "../config/dev.js";

const {
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  NAVER_STATE,
  NAVER_REDIRECT_URL
} = config;

const getNaverUser = async (req, res, next) => {
  console.log("실행됨?");
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
      "https://nid.naver.com/oauth2.0/token",
      {
        grant_type: "authorization_code",
        client_id: NAVER_CLIENT_ID,
        // redirect_uri: NAVER_REDIRECT_URL,
        code: code,
        client_secret: NAVER_CLIENT_SECRET,
        state: NAVER_STATE
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      }
    );
    /* Kakao User 정보 가져오기 */
    const { data } = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    const user = {
      email: data.response.email,
      nickname: data.response.name,
      provider: "naver",
      snsId: data.response.id,
      imageData: { url: data.response.profile_image }
    };
    req.user = user;
    next();
  } catch (error) {
    console.log({ error });
    console.log(error.response);
    res.status(500).json();
  }
};

export default getNaverUser;
