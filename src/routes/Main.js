import ThumbnailBoard from "../components/boards/ThumbnailBoard";
import styles from "./Main.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [boardList, setBoardList] = useState([]);

  const navigate = useNavigate();

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZTUiLCJyb2xlIjoiTUFOQUdFUiIsImlhdCI6MTcyMDg2NTk4MCwiZXhwIjoxODIwODY1OTgwfQ.FZ40qZvitItAhtzcfz4AvBAs8pBP3M1ZtbzA8GPLlL8";
  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async () => {
    try {
      const response = await axios.get("/api/check/boards?page=1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(boardList);

  return (
    <div className={styles.form}>
      <div className={styles.createBoard_wrapper}>
        <h1>전체 보드</h1>
        <button onClick={(e) => navigate("/createBoard")}>보드 등록</button>
      </div>
      {boardList.map((e) => {
        <ThumbnailBoard boardInfo={e} />;
      })}
    </div>
  );
};

export default Main;
