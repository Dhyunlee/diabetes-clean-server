import axios from "axios";
import RefreshToken from "../models/refleshToken.js";
import User from "../models/user.js";
import JWT_AUTH from "../utils/jwt_auth.js";
import {
  generateRandomCode,
  html_template,
  mailOtion,
  smtpTransport
} from "../utils/smtpTransport.js";
import { config } from "dotenv";

let loading = 0;
///auth/oauth
//토큰 가져와서 유저 정보 받아오기
export const authCtrl = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ isOk: false, msg: "유저가 존재하지 않습니다." });
      }

      // password 체크
      const isMathchPw = await JWT_AUTH.matchPassword(password, user.password);
      if (!isMathchPw) {
        res.status(400).json({
          isOk: false,
          msg: "비밀번호가 일치하지 않습니다."
        });
      } else {
        console.log("로그인성공");
        const { password, ...userInfo } = user._doc;
        const accessToken = JWT_AUTH.generateToken({ email: user.email });
        const refleshToken = JWT_AUTH.generateRefleshToken({});
        const saveRefreshToken = new RefreshToken({
          userId: userInfo._id,
          token: refleshToken
        });

        // save refresh token
        await saveRefreshToken.save();

        res
          .status(200)
          .cookie("refleshToken", refleshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 14 // 2주
          })
          .json({
            isOk: true,
            accessToken,
            userInfo,
            msg: "로그인이 되었습니다."
          });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { email, nickname, provider, snsId, imageData } = req.user;
      //유저 정보 디비에 저장 + 토큰 생성해서 프론트에 전달하면 끝.

      // <--- sns 인증 서버로부터 전달받은 유저 정보 db에 저장하기 --->
      // db에 유저 정보가 있는 확인, 없다면 db에 새로 유저 정보 저장
      let user = await User.findOne({ email, provider, snsId });
      let exUser = await User.exists({ email, provider, snsId });
      console.log({ exUser });
      if (!exUser) {
        // 새로운 사용자 등록
        const newUser = new User({
          email,
          nickname,
          provider,
          snsId,
          imageData
        });
        user = await newUser.save();
      }
      const { ...userData } = user?._doc;

      // // 어플리케이션내 인증을 위한 토큰 생성
      const createAccessToken = JWT_AUTH.generateToken({ email: user.email });
      const createRefleshToken = JWT_AUTH.generateRefleshToken({});
      const saveRefreshToken = new RefreshToken({
        userId: userData._id,
        token: createRefleshToken
      });

      await saveRefreshToken.save();
      res
        .status(200)
        .cookie("refleshToken", createRefleshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24 * 14 // 2주
        })
        .json({
          isOk: true,
          accessToken: createAccessToken,
          userInfo: userData,
          msg: "로그인이 되었습니다."
        });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  kakaoLogin: async (req, res) => {
    try {
      const { email, nickname, provider, snsId, imageData } = req.user;
      //유저 정보 디비에 저장 + 토큰 생성해서 프론트에 전달하면 끝.

      // <--- sns 인증 서버로부터 전달받은 유저 정보 db에 저장하기 --->
      // db에 유저 정보가 있는 확인, 없다면 db에 새로 유저 정보 저장
      let user = await User.findOne({ email, provider, snsId });
      let exUser = await User.exists({ email, provider, snsId });
      console.log({ exUser });
      if (!exUser) {
        // 새로운 사용자 등록
        const newUser = new User({
          email,
          nickname,
          provider,
          snsId,
          imageData
        });
        user = await newUser.save();
      }
      const { ...userData } = user?._doc;

      // // 어플리케이션내 인증을 위한 토큰 생성
      const createAccessToken = JWT_AUTH.generateToken({ email: user.email });
      const createRefleshToken = JWT_AUTH.generateRefleshToken({});
      const saveRefreshToken = new RefreshToken({
        userId: userData._id,
        token: createRefleshToken
      });

      await saveRefreshToken.save();
      res
        .status(200)
        .cookie("refleshToken", createRefleshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24 * 14 // 2주
        })
        .json({
          isOk: true,
          accessToken: createAccessToken,
          userInfo: userData,
          msg: "로그인이 되었습니다."
        });
    } catch (err) {
      console.error({ err });
      res.status(500).json(err);
    }
  },
  naverLogin: async (req, res) => {
    try {
      const { email, nickname, provider, snsId, imageData } = req.user;
      //유저 정보 디비에 저장 + 토큰 생성해서 프론트에 전달하면 끝.

      // <--- sns 인증 서버로부터 전달받은 유저 정보 db에 저장하기 --->
      // db에 유저 정보가 있는 확인, 없다면 db에 새로 유저 정보 저장
      let user = await User.findOne({ email, provider, snsId });
      let exUser = await User.exists({ email, provider, snsId });
      console.log({ exUser });
      if (!exUser) {
        // 새로운 사용자 등록
        const newUser = new User({
          email,
          nickname,
          provider,
          snsId,
          imageData
        });
        user = await newUser.save();
      }
      const { ...userData } = user?._doc;

      // // 어플리케이션내 인증을 위한 토큰 생성
      const createAccessToken = JWT_AUTH.generateToken({ email: user.email });
      const createRefleshToken = JWT_AUTH.generateRefleshToken({});
      const saveRefreshToken = new RefreshToken({
        userId: userData._id,
        token: createRefleshToken
      });

      await saveRefreshToken.save();
      res
        .status(200)
        .cookie("refleshToken", createRefleshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24 * 14 // 2주
        })
        .json({
          isOk: true,
          accessToken: createAccessToken,
          userInfo: userData,
          msg: "로그인이 되었습니다."
        });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  checkemail: async (req, res) => {
    const { email } = req.body;
    // 가입된 유저인지 확인
    try {
      const isUser = await User.findOne({ email });
      console.log(isUser);
      if (isUser) {
        return res
          .status(409)
          .json({ isOk: false, msg: "이미 존재하는 이메일입니다." });
      } else {
        return res
          .status(200)
          .json({ isOk: true, msg: "사용 가능한 이메일입니다." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  verifyEmail: async (req, res) => {
    const randomCode = generateRandomCode();
    const { email } = req.body;
    const title = "인증 관련 메일입니다. ";
    const contents = html_template(randomCode);

    smtpTransport.sendMail(mailOtion(email, title, contents), (error, res_) => {
      if (error) {
        console.error(error);
        smtpTransport.close(); //전송 종료
        return res.json({ isOk: false, msg: "메일 전송에 실패했습니다." });
      }
      res.json({
        isOk: true,
        msg: "메일로 인증 코드가 전송되었습니다.",
        authNum: JSON.stringify(randomCode)
      });
      smtpTransport.close(); //전송 종료
    });
  },
  logout: async (req, res) => {
    const refleshToken = await RefreshToken.find({ userId: req.params.userId });
    if (!refleshToken) {
      return res.status(401).json({
        isOk: false,
        msg: "인증이 필요합니다."
      });
    }
    await RefreshToken.deleteOne();

    res
      .status(200)
      .clearCookie("refleshToken")
      .json({ isOk: true, msg: "성공적으로 로그아웃되었습니다." });
  },
  /**
   * 인증되었는지를 확인하기 위함
   * @description 토큰이 유효하다면, 유저 정보를 클라이언트로 전달합니다.
   */
  getUserIdByToken: async (req, res) => {
    try {
      res.status(200).json({ isOk: true, userInfo: req.user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err });
    }
  },
  reflesh: async (req, res) => {
    const refleshToken = req.cookies["refleshToken"];
    console.log({ refleshToken });
    if (!refleshToken) {
      return res.status(401).json({
        isOk: false,
        msg: "인증이 필요합니다."
      });
    }

    // 토큰 검증
    try {
      const isVerifyRefleshToken =
        await JWT_AUTH.verifyRefleshToken(refleshToken);

      const user = await User.findById(isVerifyRefleshToken?.userId);
      console.log({ refleshTokenIsDecode: isVerifyRefleshToken.isDecode });
      if (isVerifyRefleshToken.isDecode) {
        const { email } = user?._doc;
        // access token 재발행
        const accessToken = JWT_AUTH.generateToken({ email });
        console.log({ msg: "accessToken 재발급되었습니다." });
        return res.status(200).json({
          isOk: true,
          accessToken,
          msg: "accessToken 재발급되었습니다."
        });
      } else {
        // reflesh token 만료
        const resData = {
          isExpiredRefleshToken: true,
          msg: "refleshToken이 만료되었습니다. 로그인해주세요."
        };
        res
          .status(200)
          .clearCookie("refleshToken")
          .json({ isOk: true, ...resData });
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).json(error);
    }
  }
};
