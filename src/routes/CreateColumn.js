import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CreateColumn.module.scss"; // 스타일 파일 import

const CreateColumn = ({ closeModal, getColumns }) => {
  const [statusName, setStatusName] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 열림 상태 추가

  const createColumnPost = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/boards/${id}/columns`,
        {
          statusName: statusName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getColumns();
      navigate(`/board/${id}`);
      alert(response.data.message);
      closeModal(); // 등록 후 모달 닫기
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    closeModal(); // 모달 닫기
  };

  if (!isModalOpen) {
    return null; // 모달이 닫혔을 때는 null을 반환하여 렌더링하지 않음
  }

  return (
    <div className={styles.createColumnContainer}>
      <h2 className={styles.modalTitle}> 📝 </h2>
      <input
        className={styles.modalInput}
        placeholder="컬럼의 상태를 입력해주세요."
        onChange={(e) => setStatusName(e.target.value)}
      />
      <div className={styles.buttonGroup}>
        <button className={styles.createButton} onClick={createColumnPost}>
          등록
        </button>
        <button className={styles.cancelButton} onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default CreateColumn;
