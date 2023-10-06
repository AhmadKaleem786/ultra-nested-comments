import "./comments.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Comment from "./comment";
import { v4 as uuidv4 } from "uuid";
import { handleComment } from "../../features/comment/commentSlice";

const Comments = () => {
  const { commentRecord } = useSelector((store) => store.comment);
  const [commented, setCommented] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commented !== "") {
      dispatch(
        handleComment({
          text: commented,
          id: uuidv4(),
          parentId: null,
          child: false,
        })
      );
      setCommented("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <h3>Please write something to start conversation</h3>
        </label>
        <input
          type="text"
          value={commented}
          className="comment-container"
          placeholder="Write here......."
          autoFocus
          onChange={(e) => setCommented(e.target.value)}
        />
        <button className="comment-container">Add</button>
      </form>
      <div>
        {commentRecord.map((comm) => {
          return (
            comm.parentId === null && <Comment key={comm.id} data={comm} />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
