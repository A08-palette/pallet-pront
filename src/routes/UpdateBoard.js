// UpdateBoard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../App";

const UpdateBoard = ({ onSave }) => {
  const { boardId } = useParams(); // URL에서 boardId 가져오기
  const [board, setBoard] = useState(null);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchBoard();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const fetchBoard = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBoard(response.data); // 서버에서 받아온 보드 정보 설정
      setTitle(response.data.title);
      setIntro(response.data.intro);
    } catch (error) {
      console.error("Error fetching board:", error);
    }
  };

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
      onSave(); // 저장 후 콜백 함수 호출하여 부모 컴포넌트에서 처리
    } catch (err) {
      console.error("Error updating board:", err);
    }
  };

  if (!board) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <h2>보드 수정하기</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="보드 제목을 입력하세요"
      />
      <input
        type="text"
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
        placeholder="보드 소개를 입력하세요"
      />
      <button onClick={updateBoard}>저장</button>
    </div>
  );
};

export default UpdateBoard;
