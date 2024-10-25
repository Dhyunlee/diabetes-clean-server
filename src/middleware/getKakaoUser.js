import axios from "axios";
import config from "../config/dev.js";

const { KAKAO_REDIRECT_URL, KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET } = config;

const getKakaoUser = async (req, res, next) => {
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
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: KAKAO_REDIRECT_URL,
        code: code,
        client_secret: KAKAO_CLIENT_SECRET
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      }
    );
    /* Kakao User 정보 가져오기 */
    const { data } = await axios.post(
      "https://kapi.kakao.com/v2/user/me",
      {
        client_secret: KAKAO_CLIENT_SECRET
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );
    console.log(data);
    const user = {
      email: data.kakao_account.email,
      nickname: data.properties.nickname,
      provider: "kakao",
      snsId: data.id,
      imageData: { url: data.properties.profile_image }
    };
    req.user = user;
    next();
  } catch (error) {
    console.log({ error });
    console.log(error.response);
    res.status(500).json();
  }
};

export default getKakaoUser;

// v2/user/me에서 토큰을 적절히 잘 전달해도
// no authentication key!" 이런 에러가 생긴 이유는
// client_secret를 활성화해놓고 이걸 전달해주지 않아서다.
//
