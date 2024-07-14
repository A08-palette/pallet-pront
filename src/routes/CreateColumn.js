import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../App";
import { useParams } from "react-router-dom";

const CreateColumn = () => {
  const [statusName, setStatusName] = useState("");
  const { id } = useParams();

  const token = localStorage.getItem("accessToken");
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
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        placeholder="컬럼의 상태를 입력해주세요."
        onChange={(e) => setStatusName(e.target.value)}
      ></input>
      <button onClick={(e) => createColumnPost()}>컬럼등록</button>
    </div>
  );
};

export default CreateColumn;
