import { useState } from "react";
import styles from "./Card.module.scss";
import axios from "axios";
import { baseUrl } from "../../App";

const Card = ({
  cardInfo,
  columnPosition,
  setIsLoading,
  getCards,
  boardSize,
}) => {
  const token = localStorage.getItem("accessToken");

  const moveCard = async (cardId, newPosition) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/cards/${cardId}/move?position=${newPosition}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const rightMoveColumnCard = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/column/${cardInfo.columnId + 1}/cards/${
          cardInfo.cardId
        }/move`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsLoading(true);
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
      setIsLoading(true);
      getCards();
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
    </div>
  );
};

export default Card;
