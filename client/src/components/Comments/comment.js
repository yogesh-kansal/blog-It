const Comment = ({comment}) => {
  return (
    <div className="message">
      <div className="messageTop">
        <div className="row">
          <div className="col-9 me-auto"><h6 className="messageSender">{comment.author}</h6></div>
          <div className="col-3 ms-auto"><span className="postDate col-5">
            {new Date(comment.createdAt).toDateString()}
          </span></div>

        </div>
        
        <p className="messageText mt">{comment.comment}</p>
      </div>
    </div>
  );
}

export default Comment;