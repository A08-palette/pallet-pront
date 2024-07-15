import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss"; // CSS Modules 스타일 시트 임포트
import headerImg from "../../assets/logo1.png"; // 헤더 이미지 임포트
import axios from "axios";
import { baseUrl } from "../../App";

const NavBar = () => {
  const token = localStorage.getItem("accessToken");

  const logout = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/users/logout`,
        {},
        {
          headers: `Bearer ${token}`,
        }
      );

      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.menu}>
        <NavLink
          exact
          to="/"
          activeClassName={styles.active}
          className={styles.menuItem}
        >
          Home
        </NavLink>
        <NavLink
          to="/signup"
          activeClassName={styles.active}
          className={styles.menuItem}
        >
          SignUp
        </NavLink>
        <NavLink
          to="/login"
          activeClassName={styles.active}
          className={styles.menuItem}
        >
          LogIn
        </NavLink>
        <NavLink
          to="/"
          onClick={(e) => logout()}
          activeClassName={styles.active}
          className={styles.menuItem}
        >
          logout
        </NavLink>
      </div>
      <img src={headerImg} alt="Header" className={styles.headerImage} />
    </div>
  );
};

export default NavBar;
