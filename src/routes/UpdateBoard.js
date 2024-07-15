import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../App";
import styles from "./UpdateBoard.module.scss"; // 스타일 파일 import

const UpdateBoard = ({
  boardId,
  title: initialTitle,
  intro: initialIntro,
  closeModal,
  fetchData,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [intro, setIntro] = useState(initialIntro);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const updateBoard = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/boards/${boardId}`,
        { title, intro },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // 수정된 보드 정보 출력 (옵션)
      closeModal();
      fetchData();
    } catch (err) {
      console.error("Error updating board:", err);
    }
  };

  return (
    <div className={styles.updateBoardContainer}>
      <h2 className={styles.modalTitle}> 🛠️ </h2>
      <input
        className={styles.modalInput}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="보드 제목을 입력하세요"
      />
      <input
        className={styles.modalInput}
        type="text"
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
        placeholder="보드 소개를 입력하세요"
      />
      <div className={styles.modalButtons}>
        <button className={styles.updateButton} onClick={updateBoard}>
          수정
        </button>
        <button className={styles.cancelButton} onClick={closeModal}>
          취소
        </button>
      </div>
    </div>
  );
};

export default UpdateBoard;
