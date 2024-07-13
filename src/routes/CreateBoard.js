import { useState } from "react";
import axios from "axios";

const CreateBoard = () => {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZTUiLCJyb2xlIjoiTUFOQUdFUiIsImlhdCI6MTcyMDg2MzI1MCwiZXhwIjoxODIwODYzMjUwfQ.yRE7C6FlTZtSwRZPdBBQx8iItMSNmPTud9IZ3hV6KMk";
  const createBoard = async () => {
    try {
      const response = await axios.post(
        "/api/boards",
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
