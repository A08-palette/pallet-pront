import { useNavigate } from "react-router-dom";
import styles from "./Board.module.scss";
import axios from "axios";
import { baseUrl } from "../App";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Columns from "../components/columns/Columns";

const Board = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [columnList, setColumnList] = useState({});

  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getBoardInfo();
        await getColumns();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getBoardInfo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle(response.data.title);
    } catch (err) {
      console.error(err);
    }
  };

  const getColumns = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/boards/${id}/columns`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
      setColumnList(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  Object.values(columnList).map((e) => {
    console.log(e, 111);
  });
  return (
    <div className={styles.form}>
      <div className={styles.createBoard_wrapper}>
        <h1>{title}</h1>
        <button onClick={(e) => navigate(`/board/${id}/createColumn`)}>
          컬럼 등록
        </button>
      </div>
      <div className={styles.columnList_wrapper}>
        {Object.keys(columnList).length > 0 ? (
          Object.values(columnList).map((column) => (
            <Columns key={column.id} columnInfo={column} />
          ))
        ) : (
          <div>컬럼이 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default Board;
