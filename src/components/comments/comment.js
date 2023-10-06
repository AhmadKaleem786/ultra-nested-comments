import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { handleDelete, handleReply } from "../../features/comment/commentSlice";
import { v4 as uuidv4 } from "uuid";

const Comment = ({ data }) => {
  const { commentRecord } = useSelector((store) => store.comment);
  const [like, setLike] = useState("Like");
  const [replyOn, setReplyOn] = useState(false);
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();

  const handleLike = () => {
    if (like === "👍") {
      setLike("Like");
    } else {
      setLike("👍");
    }
  };

  return (
    <div>
      <div className="comment-container">
        <h3>{data.text}</h3>
        {replyOn ? (
          <div>
            <input
              type="text"
              value={reply}
              placeholder="Write here....."
              onChange={(e) => setReply(e.target.value)}
              autoFocus
            />
            <button
              onClick={() => {
                if (reply !== "") {
                  dispatch(
                    handleReply({
                      text: reply,
                      id: uuidv4(),
                      parentId: data.id,
                      child: false,
                    })
                  );
                  setReply("");
                  setReplyOn(false);
                }
              }}
            >
              Ok
            </button>
            <button
              onClick={() => {
                setReplyOn(false);
                setReply("");
              }}
            >
              cancel
            </button>
          </div>
        ) : (
          <div>
            <button onClick={() => handleLike()}>{like}</button>
            <button onClick={() => setReplyOn(true)}>Reply</button>
            <button
              onClick={() =>
                dispatch(handleDelete({ id: data.id, child: data.child }))
              }
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {data.child && (
        <div style={{ paddingLeft: 25 }}>
          {commentRecord.map((reply) => {
            return (
              reply.parentId === data.id && (
                <Comment key={reply.id} data={reply} />
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
