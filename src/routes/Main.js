import ThumbnailBoard from "../components/boards/ThumbnailBoard";
import styles from "./Main.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [boardList, setBoardList] = useState([]);

  const navigate = useNavigate();

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZTUiLCJyb2xlIjoiTUFOQUdFUiIsImlhdCI6MTcyMDg2NTk4MCwiZXhwIjoxODIwODY1OTgwfQ.FZ40qZvitItAhtzcfz4AvBAs8pBP3M1ZtbzA8GPLlL8";
  useEffect(() => {
    setIsLoading(true);
    getBoards();
    setIsLoading(false);
  }, []);

  const getBoards = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/check/boards?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBoardList(response.data);
      // console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading == true) {
    return <div>로딩중입니다...</div>;
  }
  // console.log(boardList.data.content);

  return (
    <div className={styles.form}>
      <div className={styles.createBoard_wrapper}>
        <h1>전체 보드</h1>
        <button onClick={(e) => navigate("/createBoard")}>보드 등록</button>
      </div>
      <div>
        <div className={styles.thumbnail_wrapper}>
          {boardList?.data?.content.map((e) => {
            return (
              <div>
                <ThumbnailBoard boardInfo={e} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
