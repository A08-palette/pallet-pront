import React, { useState } from "react";
import styles from "./Signup.module.scss";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [managerKey, setManagerKey] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        username,
        password,
        ...(managerKey && { managerKey }),
      };

      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        userData
      );

      console.log("회원가입 성공:", response.data);
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <div className={styles.signup}>
      <h2> </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="username"> </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력해 주세요"
            required
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password"> </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
            required
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="managerKey"> </label>
          <input
            type="text"
            id="managerKey"
            name="managerKey"
            value={managerKey}
            onChange={(e) => setManagerKey(e.target.value)}
            placeholder="Manager 키를 입력해 주세요"
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
