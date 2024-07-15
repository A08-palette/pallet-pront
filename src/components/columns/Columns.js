import { useEffect, useState, useRef } from "react";
import Card from "../cards/Card";
import styles from "./Columns.module.scss";
import axios from "axios";
import { baseUrl } from "../../App";
import { useParams } from "react-router-dom";

const Columns = ({ columnInfo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreate, setIsCreate] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [cardContent, setCardContent] = useState("");
  const [cardWorker, setCardWorker] = useState("");
  const [cardList, setCardList] = useState([]);
  const [columnId, setColumnId] = useState(columnInfo.id);

  const { id } = useParams();

  const dragItem = useRef();
  const dragOverItem = useRef();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    setIsLoading(true);
    getCards();
    setIsLoading(false);
  }, []);

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
      alert("카드생성완료");
      setIsCreate(false);
      getCards();
    } catch (err) {
      console.error(err);
    }
  };

  const getCards = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cards/column?column=${columnId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCardList(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const moveCard = async (cardId, newPosition) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/cards/${cardId}/move?position=${newPosition}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      getCards();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragStart = (e, cardId) => {
    // Set the data to be transferred during the drag
    console.log(cardId);
    e.dataTransfer.setData("text/plain", cardId);
  };

  const handleDragOver = (e) => {
    // Prevent default to allow drop
    e.preventDefault();
  };

  const handleDrop = (e, columnIndex) => {
    e.preventDefault();

    const cardId = e.dataTransfer.getData("text/plain");
    const draggedCard = cardList.find(
      (card) => card.cardId === parseInt(cardId)
    );

    if (draggedCard) {
      const newPosition = columnIndex + 1; // Since position starts from 1 in your API (assuming)
      console.log(draggedCard.cardId);
      moveCard(draggedCard.cardId, newPosition);
    }
  };

  if (isLoading) {
    return <div>로딩중입니다..</div>;
  }
  return (
    <div className={styles.column_wrapper}>
      <div className={styles.status_wrapper}>
        <h3>{columnInfo.statusName}</h3>
      </div>
      <div className={styles.card_wrapper}>
        {Object.keys(cardList).length > 0 ? (
          Object.values(cardList).map((card, index) => (
            <div
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, columnInfo.id)}
              key={card.cardId}
              draggable
              onDragStart={(e) => handleDragStart(e, card.cardId)}
            >
              <Card cardInfo={card} />
            </div>
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
            ></input>
            <input
              placeholder="카드 내용을 입력하세요."
              onChange={(e) => setCardContent(e.target.value)}
            ></input>
            <input
              placeholder="카드 작업자를 입력하세요."
              onChange={(e) => setCardWorker(e.target.value)}
            ></input>
            <button onClick={(e) => createCard()}>카드 생성하기</button>
            <button onClick={(e) => setIsCreate(false)}>뒤로 가기</button>
          </div>
        ) : (
          <button onClick={(e) => setIsCreate(true)}>카드생성</button>
        )}
      </div>
    </div>
  );
};

export default Columns;
