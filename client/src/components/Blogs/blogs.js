import Blog from "../Blog/blog";
import "./blogs.css";

const Blogs = ({ blogs }) => {
  return (
    <div className="blogs">
      {blogs?.map((p) => (
        <Blog blog={p} />
      ))}
    </div>
  );
}

export default Blogs;