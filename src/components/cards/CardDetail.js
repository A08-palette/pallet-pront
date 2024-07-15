import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../App";

const CardDetail = ({ setIsDetailView, cardId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [commentList, setConmmentList] = useState({});

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    setIsLoading(true);
    getComment();
    setIsLoading(false);
  }, []);

  const createComment = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/cards/${cardId}/comments`,
        { comment: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      getComment();
    } catch (err) {
      console.error(err);
    }
  };

  const getComment = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/cards/${cardId}/comments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConmmentList(response.data.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        {Object.keys(commentList).length > 0 ? (
          Object.values(commentList).map((commentImpl, index) => (
            <div>{commentImpl.comment}</div>
          ))
        ) : (
          <div>댓글이 없습니다</div>
        )}
      </div>
      <div>
        <input
          placeholder="댓글을 작성해주세요."
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button onClick={(e) => createComment()}>댓글 달기</button>
        <button onClick={(e) => setIsDetailView(false)}>닫기</button>
      </div>
    </div>
  );
};

export default CardDetail;
