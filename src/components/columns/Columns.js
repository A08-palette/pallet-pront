import { useEffect, useState } from "react";
import Card from "../cards/Card";
import styles from "./Columns.module.scss";
import axios from "axios";
import { baseUrl } from "../../App";

const Columns = ({ columnInfo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreate, setIsCreate] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [cardContent, setCardContent] = useState("");
  const [cardWorker, setCardWorker] = useState("");
  const [cardList, setCardList] = useState([]);
  const [columnId, setColumnId] = useState(columnInfo.id);

  console.log(columnInfo);
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
      console.log("카드생성완료");
    } catch (err) {
      console.error(err);
    }
  };

  const getCards = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cards/column?column=${columnId}`,
        {
          // params: {
          //   column: columnInfo.id,
          // },
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

  if (isLoading) {
    return <div>로딩중입니다..</div>;
  }
  console.log(typeof cardList);
  return (
    <div className={styles.column_wrapper}>
      <div className={styles.status_wrapper}>
        <h3>{columnInfo.statusName}</h3>
      </div>
      <div className={styles.card_wrapper}>
        {Object.keys(cardList).length > 0 ? (
          Object.values(cardList).map((card) => (
            <Card key={card.id} cardInfo={card} />
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
