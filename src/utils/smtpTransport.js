import nodemailer from "nodemailer";
import config from "../config/dev.js";
const { MAIL_AUTH_USER, MAIL_AUTH_PASSWORD, MAIL_HOST, MAIL_PORT } = config;

/* 랜덤 코드 생성 */
export const generateRandomCode = () => {
  //111111이상 999999이하 랜덤한 수 뽑기
  return Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
};

/* html_template */
export const html_template = (code) => {
  return `
    <!DOCTYPE html>
    <html>
      <head> 
        <title>이메일 인증 코드입니다.</title>
      </head>
      <body>인증 번호는 ${code}입니다.</body>
    </html>
  `
}

/* smtp configure */
export const smtpTransport = nodemailer.createTransport({
  pool: true,
  maxConnections: 1,
  service: "Naver",
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false,
  auth: {
    user: MAIL_AUTH_USER,
    pass: MAIL_AUTH_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

/* 메일을 받을 유저 설정 */
export const mailOtion = (email, title, contents) => {
  console.log({ MAIL_AUTH_USER, MAIL_AUTH_PASSWORD, MAIL_HOST, MAIL_PORT });
  
  return {
    from: MAIL_AUTH_USER, // 개발자(발신자) 이메일 주소
    to: email, // 유저의 이메일
    subject: title, //인증 관련 메일의 제목
    html: contents //인증 관련 메일의 내용
  };
};
