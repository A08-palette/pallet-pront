import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate 임포트
import { baseUrl } from "../App";
import UpdateBoard from "./UpdateBoard"; // UpdateBoard 컴포넌트 import
import InviteBoard from "./InviteBoard"; // InviteBoard 컴포넌트 import

Modal.setAppElement("#root");

const customModalStyles = {
  content: {
    width: "400px",
    maxWidth: "90%",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [boardList, setBoardList] = useState({ data: { content: [] } });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [editBoardId, setEditBoardId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumberInput, setPageNumberInput] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용
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
      setTotalPages(response.data.data.totalPages);
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

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const openEditModal = (boardId) => {
    setEditBoardId(boardId);
    setIsEditModalOpen(true);
    fetchBoard(boardId); // 보드 정보를 불러오는 함수 호출
  };

  const fetchBoard = async (boardId) => {
    try {
      const response = await axios.get(`${baseUrl}/api/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle(response.data.title);
      setIntro(response.data.intro);
    } catch (error) {
      console.error("Error fetching board:", error);
    }
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setTitle("");
    setIntro("");
    setEditBoardId(null);
  };

  const handleDeleteBoard = async (boardId) => {
    if (window.confirm("정말로 이 보드를 삭제하시겠습니까?")) {
      try {
        await axios.delete(`${baseUrl}/api/boards/${boardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchData(); // 삭제 후 데이터 다시 불러오기
      } catch (error) {
        console.error("Error deleting board:", error);
      }
    }
  };

  const goToPage = async (pageNumber) => {
    if (
        pageNumber >= 1 &&
        pageNumber <= totalPages &&
        pageNumber !== currentPage
    ) {
      setCurrentPage(pageNumber);
      setPageNumberInput("");
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
      return null;
    }

    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
          <button
              key={i}
              onClick={() => goToPage(i)}
              className={
                currentPage === i ? styles.activePage : styles.pageButton
              }
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
          <button onClick={openCreateModal} className={styles.createButton}>
            보드 등록
          </button>
        </div>
        <div className={styles.boardListContainer}>
          <div className={styles.boardItems}>
            {boardList?.data?.content.map((board) => (
                <div
                    key={board.boardId}
                    className={styles.boardItem}
                    onClick={() => navigate(`/board/${board.boardId}`)} // 클릭 시 컬럼 페이지로 이동
                >
                  <div className={styles.boardItemContent}>
                    <div className={styles.boardItemId}>{board.boardId}</div>
                    <div className={styles.boardItemUsername}>{board.username}</div>
                    <div className={styles.boardItemTitle}>{board.title}</div>
                    <div className={styles.boardItemIntro}>{board.intro}</div>
                    <div className={styles.boardItemDate}>{board.createdAt}</div>
                  </div>
                  <div className={styles.boardItemButtons}>
                    <button
                        onClick={(e) => {
                          e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
                          openEditModal(board.boardId);
                        }}
                        className={styles.updateButton}
                    >
                      🔨
                    </button>
                    <button
                        onClick={(e) => {
                          e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
                          handleDeleteBoard(board.boardId);
                        }}
                        className={styles.deleteButton}
                    >
                      ❌
                    </button>
                    {/* 보드 초대 버튼 */}
                    <InviteBoard boardId={board.boardId} />
                  </div>
                </div>
            ))}
          </div>
        </div>
        <div className={styles.pagination}>
          <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
          >
            ◀
          </button>
          {renderPaginationButtons()}
          <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>

        <Modal
            isOpen={isCreateModalOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
        >
          <h2 className={styles.modalTitle}>📝</h2>
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
            <button className={styles.modalButton1} onClick={handleCreateBoard}>
              등록
            </button>
            <button className={styles.modalButton2} onClick={closeModal}>
              취소
            </button>
          </div>
        </Modal>

        {/* 보드 수정 모달 */}
        {isEditModalOpen && (
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeModal}
                style={customModalStyles}
            >
              <UpdateBoard
                  boardId={editBoardId}
                  title={title}
                  intro={intro}
                  closeModal={closeModal}
                  fetchData={fetchData}
              />
            </Modal>
        )}
      </div>
  );
};

export default Main;
