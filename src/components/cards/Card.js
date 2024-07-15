import styles from "./Card.module.scss";

const Card = ({ cardInfo }) => {
  console.log(cardInfo);
  return (
    <div className={styles.cardDetail_wrapper}>
      <div>title:{cardInfo.title}</div>
      <div>content:{cardInfo.content}</div>
      <div>worker:{cardInfo.worker}</div>
    </div>
  );
};

export default Card;
