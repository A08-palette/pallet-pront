import { useState } from "react";
import styles from "./ThumbnailBoard.module.scss";
import { useNavigate } from "react-router-dom";

const ThumbnailBoard = ({ boardInfo }) => {
  const [id, setId] = useState(boardInfo.boardId);
  const navigate = useNavigate();
  console.log(boardInfo);

  return (
    <div className={styles.boards_wrapper}>
      <div
        className={styles.thumbnail_wrapper}
        onClick={(e) => navigate(`/board/${id}`, { stata: { boardInfo } })}
      >
        <h3>{boardInfo.title}</h3>
        <img src="https://i.namu.wiki/i/QUvSjE_q_vlwACfGWlkS__68mRm6wz6kZPRDEG42rJlgp7EjBUEYArc5-cIxKMiA0jGu49GQEkguS7hc6UrfAw.webp"></img>
      </div>
    </div>
  );
};

export default ThumbnailBoard;
