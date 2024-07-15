import { useState } from "react";
import styles from "./Card.module.scss";
import axios from "axios";
import { baseUrl } from "../../App";
import { useNavigate } from "react-router-dom";
import CardDetail from "./CardDetail";

const Card = ({
  cardInfo,
  columnPosition,
  setIsLoading,
  getCards,
  boardSize,
}) => {
  const [isDetailView, setIsDetailView] = useState(false);

  const token = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const rightMoveColumnCard = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/column/${cardInfo.columnId + 1}/cards/${
          cardInfo.cardId
        }/move`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const leftMoveColumnCard = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/column/${cardInfo.columnId - 1}/cards/${
          cardInfo.cardId
        }/move`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.cardDetail_wrapper}>
      <div>제목:{cardInfo.title}</div>
      <div>내용:{cardInfo.content}</div>
      <div>작업자:{cardInfo.worker}</div>
      <div className={styles.button_wrapper}>
        {columnPosition === 1 ? null : (
          <button onClick={(e) => leftMoveColumnCard()}>Left</button>
        )}
        {boardSize === columnPosition ? null : (
          <button onClick={(e) => rightMoveColumnCard()}>Right</button>
        )}
      </div>
      <button onClick={(e) => setIsDetailView(true)}>댓글 보기</button>
      {isDetailView ? (
        <CardDetail
          setIsDetailView={setIsDetailView}
          cardId={cardInfo.cardId}
        />
      ) : null}
    </div>
  );
};

export default Card;
