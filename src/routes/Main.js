import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../App";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customModalStyles = {
  content: {
    width: "400px",
    maxWidth: "90%",
    height: "auto",
    top: "calc(50% + 80px)", // 헤더 이미지 높이에 따라 조절
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [boardList, setBoardList] = useState({ data: { content: [] } });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumberInput, setPageNumberInput] = useState(""); // 추가된 부분
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchData();
  }, [token, currentPage]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/check/boards?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBoardList(response.data || { data: { content: [] } });
      setTotalPages(response.data.data.totalPages); // 수정된 부분
    } catch (error) {
      console.error("Error fetching boards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBoard = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/boards`,
        { title, intro },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBoardList((prevData) => ({
        ...prevData,
        data: {
          ...prevData.data,
          content: [...prevData.data.content, response.data],
        },
      }));
      closeModal();
      fetchData();
    } catch (err) {
      console.error("Error creating board:", err);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setIntro("");
  };

  const goToPage = async (pageNumber) => {
    console.log("goToPage 함수 호출:", pageNumber); // 함수 호출 확인용 로그 추가
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      setCurrentPage(pageNumber);
      setPageNumberInput(""); // 페이지 이동 후 입력 필드 초기화
      fetchData();
    }
  };

  const handlePageNumberChange = (e) => {
    setPageNumberInput(e.target.value);
  };

  const handlePageNumberSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(pageNumberInput, 10);
    if (
      !isNaN(pageNumber) &&
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      goToPage(pageNumber);
    }
  };

  const renderPaginationButtons = () => {
    if (totalPages <= 1) {
      return null; // totalPages가 1 이하면 버튼을 렌더링하지 않음
    }

    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => {
            console.log(`페이지 이동 버튼 클릭: ${i}`); // 페이지 이동 버튼 클릭 로그 추가
            goToPage(i);
          }}
          className={currentPage === i ? styles.activePage : styles.pageButton}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1> 📜 </h1>
        <button onClick={openModal} className={styles.createButton}>
          보드 등록
        </button>
      </div>
      <div className={styles.boardListContainer}>
        <div className={styles.boardItems}>
          {boardList?.data?.content.map((board) => (
            <div
              key={board.boardId}
              className={styles.boardItem}
              onClick={() => navigate(`/board/${board.boardId}`)}
            >
              <div className={styles.boardItemContent}>
                <div className={styles.boardItemId}>{board.boardId}</div>
                <div className={styles.boardItemUsername}>{board.username}</div>
                <div className={styles.boardItemTitle}>{board.title}</div>
                <div className={styles.boardItemIntro}>{board.intro}</div>
                <div className={styles.boardItemDate}>{board.createdAt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => {
            console.log(`◀ 버튼 클릭: ${currentPage - 1}`); // 이전 페이지 버튼 클릭 로그 추가
            goToPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => {
            console.log(`▶ 버튼 클릭: ${currentPage + 1}`); // 다음 페이지 버튼 클릭 로그 추가
            goToPage(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
      </div>
      <form onSubmit={handlePageNumberSubmit}></form>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <h2 className={styles.modalTitle}> 📝 </h2>
        <input
          className={styles.modalInput}
          type="text"
          placeholder="보드 제목을 입력해 주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={styles.modalInput}
          type="text"
          placeholder="보드 소개를 입력해 주세요."
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
        <div className={styles.modalButtons}>
          <button className={styles.modalButton} onClick={handleCreateBoard}>
            등록
          </button>
          <button className={styles.modalButton} onClick={closeModal}>
            취소
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Main;
