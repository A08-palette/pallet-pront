import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";

const CreateBoard = () => {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");

  const token = localStorage.getItem("accessToken");
  const createBoard = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/boards`,
        {
          title: title,
          intro: intro,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      보드 등록하기
      <input
        placeholder="보드 제목을 입력해주세요."
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <input
        placeholder="보드 소개를 입력해주세요."
        onChange={(e) => setIntro(e.target.value)}
      ></input>
      <button onClick={(e) => createBoard()}>버튼</button>
    </div>
  );
};

export default CreateBoard;
