import { useNavigate } from "react-router-dom";
import styles from "./Board.module.scss";
import axios from "axios";
import { baseUrl } from "../App";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Columns from "../components/columns/Columns";
import Modal from "react-modal";
import CreateColumn from "./CreateColumn";
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

const Board = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [columnList, setColumnList] = useState({});
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("accessToken");

  const columnRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getBoardInfo();
        await getColumns();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBoardInfo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle(response.data.title);
    } catch (err) {
      console.error(err);
    }
  };

  const getColumns = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/boards/${id}/columns`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setColumnList(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateColumnPosition = async (columnId, newPosition) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/boards/${id}/columns/${columnId}/move?position=${newPosition}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      getColumns();
    } catch (err) {
      console.error(err);
    }
  };

  const handleColumnPositionChange = (columnId, newPosition) => {
    // Update local state immediately to reflect the change
    const updatedColumns = Object.values(columnList).map((column) =>
      column.id === columnId ? { ...column, position: newPosition } : column
    );
    setColumnList(updatedColumns);

    // Call API to update position
    updateColumnPosition(columnId, newPosition + 1);
  };

  const handleDragStart = (e, columnId) => {
    // Set the data to be transferred during the drag
    e.dataTransfer.setData("text/plain", columnId);
  };

  const handleDragOver = (e, index) => {
    // Prevent default to allow drop
    e.preventDefault();

    // Highlight the potential drop target when the draggable element enters it
    // (optional - for visual feedback)
    // columnRefs.current[index].classList.add('drag-over');
  };

  const handleDragEnter = (e, index) => {
    // Prevent default to allow drop
    e.preventDefault();

    // (optional) Add visual feedback here if desired
  };

  const handleDragLeave = (e) => {
    // (optional) Remove visual feedback here if added in handleDragOver or handleDragEnter
  };

  const handleDrop = (e, index) => {
    // Prevent default to allow drop
    e.preventDefault();

    // Get the columnId from the data transfer
    const columnId = e.dataTransfer.getData("text/plain");

    // Call the function to update the position
    handleColumnPositionChange(columnId, index);
  };

  const openCreateColumnModal = () => {
    setIsCreateColumnModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateColumnModalOpen(false);
  };

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  return (
    <div className={styles.form}>
      <div className={styles.createBoard_wrapper}>
        <h1>{title}</h1>
        <button onClick={openCreateColumnModal}>컬럼 등록</button>
      </div>
      <div className={styles.columnList_wrapper}>
        {Object.keys(columnList).length > 0 ? (
          Object.values(columnList).map((column, index) => (
            <div
              key={column.id}
              ref={(element) => (columnRefs.current[index] = element)}
              draggable
              onDragStart={(e) => handleDragStart(e, column.id)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDrop={(e) => handleDrop(e, index)}
            >
              <Columns
                key={column.id}
                columnInfo={column}
                handleColumnPositionChange={handleColumnPositionChange}
              />
            </div>
          ))
        ) : (
          <div>컬럼이 없습니다</div>
        )}
      </div>

      {/* 컬럼 등록 모달 */}
      <Modal
        isOpen={isCreateColumnModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <CreateColumn id={id} closeModal={closeModal} getColumns={getColumns} />
      </Modal>
    </div>
  );
};

export default Board;
