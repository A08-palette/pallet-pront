import styles from "./ThumbnailBoard.module.scss";

const ThumbnailBoard = (boardInfo) => {
  console.log(boardInfo, "1111");
  console.log(1231234);
  return (
    <div className={styles.boards_wrapper}>
      <div className={styles.thumbnail_wrapper}>
        <h3>제목</h3>
        <img src="https://i.namu.wiki/i/QUvSjE_q_vlwACfGWlkS__68mRm6wz6kZPRDEG42rJlgp7EjBUEYArc5-cIxKMiA0jGu49GQEkguS7hc6UrfAw.webp"></img>
      </div>
    </div>
  );
};

export default ThumbnailBoard;
