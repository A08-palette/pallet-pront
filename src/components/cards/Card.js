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
  const [isUpdate, setIsUpdate] = useState(false);
  const [titleUpdate, setTitleUpdate] = useState("");

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
      alert(response.data.message);
      getCards();
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
      alert(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTitle = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/cards/${cardInfo.cardId}`,
        { title: titleUpdate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      console.log(response.data);
      setIsUpdate(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCard = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}/api/cards/${cardInfo.cardId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.cardDetail_wrapper}>
      <button className={styles.delete_btn} onClick={(e) => deleteCard()}>
        카드 삭제
      </button>
      {!isUpdate ? (
        <div className={styles.card_title}>
          제목:{cardInfo.title}
          <button onClick={(e) => setIsUpdate(true)}>제목 수정</button>
        </div>
      ) : (
        <div className={styles.card_title}>
          <input
            onChange={(e) => setTitleUpdate(e.target.value)}
            placeholder="수정할 제목을 입력하세요"
          ></input>
          <button onClick={(e) => updateTitle()}>제목 수정하기</button>
        </div>
      )}
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
