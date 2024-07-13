import headerImg from "../../assets/헤더.png";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className={styles.form}>
      <img src={headerImg}></img>
      <div className={styles.header_wrapper}>
        <div>
          <h2>팔레트</h2>
        </div>
        <div className={styles.button_wrapper}>
          <button>회원가입</button>
          <button>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
