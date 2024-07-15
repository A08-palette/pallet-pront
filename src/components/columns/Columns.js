import { useEffect, useState, useCallback } from "react";
import Card from "../cards/Card";
import styles from "./Columns.module.scss";
import axios from "axios";
import { baseUrl } from "../../App";
import { useParams } from "react-router-dom";

const Columns = ({ columnInfo, boardSize }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreate, setIsCreate] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [cardContent, setCardContent] = useState("");
  const [cardWorker, setCardWorker] = useState("");
  const [cardList, setCardList] = useState([]);
  const [columnId, setColumnId] = useState(columnInfo.id);

  const { id } = useParams();

  const token = localStorage.getItem("accessToken");

  const getCards = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/cards/column?column=${columnId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCardList(response.data.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getCards();
    setIsLoading(false);
  }, [getCards]);

  const createCard = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/column/${columnInfo.id}/cards`,
        {
          title: cardTitle,
          content: cardContent,
          worker: cardWorker,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("카드 생성 완료");
      setIsCreate(false);
      getCards();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteColumn = async () => {
    if (window.confirm("⚠ 정말로 이 컬럼을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${baseUrl}/api/boards/${id}/columns/${columnId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("컬럼 삭제 완료 🎉");
        // 페이지를 새로고침하여 변경 사항을 즉시 반영
        window.location.reload();
      } catch (err) {
        console.error("컬럼 삭제 에러 :", err);
        alert("컬럼 삭제에 실패했습니다.");
      }
    }
  };

  if (isLoading) {
    return <div>로딩중입니다 ···</div>;
  }

  return (
    <div className={styles.column_wrapper}>
      <div className={styles.status_wrapper}>
        <h3>{columnInfo.statusName}</h3>
        {/* 컬럼 삭제 버튼 추가 */}
        <button onClick={deleteColumn} className={styles.delete_button}>
          ❌
        </button>
      </div>
      <div className={styles.card_wrapper}>
        {Object.keys(cardList).length > 0 ? (
          Object.values(cardList).map((card, index) => (
            <Card
              key={index}
              cardInfo={card}
              columnPosition={columnInfo.position}
              setIsLoading={setIsLoading}
              getCards={getCards}
              boardSize={boardSize}
            />
          ))
        ) : (
          <div>카드가 없습니다</div>
        )}
      </div>
      <div className={styles.createCard_wrapper}>
        {isCreate ? (
          <div className={styles.writeCard_wrapper}>
            <input
              placeholder="카드 제목을 입력하세요."
              onChange={(e) => setCardTitle(e.target.value)}
              className={styles.form_input}
            />
            <input
              placeholder="카드 내용을 입력하세요."
              onChange={(e) => setCardContent(e.target.value)}
              className={styles.form_input}
            />
            <input
              placeholder="카드 작업자를 입력하세요."
              onChange={(e) => setCardWorker(e.target.value)}
              className={styles.form_input}
            />
            <div className={styles.button_wrapper}>
              <button
                onClick={(e) => createCard()}
                className={styles.form_button}
              >
                🃏
              </button>
              <button
                onClick={(e) => setIsCreate(false)}
                className={styles.form_cancel_button}
              >
                ↩
              </button>
            </div>
          </div>
        ) : (
          <button
            className={styles.form_button}
            onClick={(e) => setIsCreate(true)}
          >
            카드 생성
          </button>
        )}
      </div>
    </div>
  );
};

export default Columns;
