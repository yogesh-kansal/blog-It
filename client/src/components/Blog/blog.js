import "./blog.css";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div className="post">
      {blog.imageUrl && <img className="postImg" src={blog.imageUrl} alt="" />}
      <div className="row">
        <div className="col-7">
          <Link to={`/blog/${blog._id}`} className="link">
            <span className="postTitle col-7">{blog.title}</span>
          </Link>
        </div>
        <div className="col-5">
          <span className="postDate col-5">
            {new Date(blog.createdAt).toDateString()}
          </span>
        </div>
      </div>
      <hr/>
      <p className="postDesc">{blog.description}</p>
    </div>
  );
}


export default Blog;