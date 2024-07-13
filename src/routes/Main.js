import ThumbnailBoard from "../components/boards/ThumbnailBoard";
import styles from "./Main.module.scss";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.form}>
      <div className={styles.createBoard_wrapper}>
        <h1>전체 보드</h1>
        <button onClick={(e) => navigate("/createBoard")}>보드 등록</button>
      </div>
      <ThumbnailBoard />
    </div>
  );
};

export default Main;
