import React from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        formData
      );

      console.log("로그인 성공:", response.data);
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      navigate("/");
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  return (
    <div className={styles.login}>
      <h2> </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="username" className={styles.hidden_label}>
            {" "}
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="아이디를 입력해 주세요"
            required
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password" className={styles.hidden_label}>
            {" "}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            required
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit">로그인</button>
          <button type="button" onClick={() => navigate("/signup")}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
