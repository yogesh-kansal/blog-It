import axios from "axios";
import {Button, Input} from 'reactstrap';
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { authContext } from "../../contexts/authContext";
import Comments from '../../components/Comments/comments';
import "./singleBlog.css";
import config from '../../config';

const SingleBlog = () =>  {
  const { accesstoken } = useContext(authContext);
  const location = useLocation();
  const path = location.pathname.split("/")[2];


  const [blog, setBlog] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    axios.get(config.serverUrl+`/blogs/${path}`, {
      headers: {
        "Authorization": 'Bearer ' + accesstoken
      }
    })
    .then(res => {
      setBlog(res.data);
      setTitle(res.data.title);
      setDesc(res.data.description);
    })
    .catch(err => {
      if(err.response) alert(err.response.data);
      else if(err.message) alert(err.message);
    })
  }, [path, accesstoken]);

  const handleDelete = () => {
    axios.delete(config.serverUrl+`/blogs/${path}`, {
      headers: {
        "Authorization": 'Bearer ' + accesstoken
      }
    })
    .then(res => {
      alert(res.data);
      window.location.replace("/");
    })
    .catch(err => {
      if(err.response) alert(err.response.data);
      else if(err.message) alert(err.message);
    })
  };

  const handleUpdate = async () => {
    axios.patch(config.serverUrl+`/blogs/${path}`, {title, description: desc}, {
      headers: {
        "Authorization": 'Bearer ' + accesstoken
      }
    })
    .then(res => {
      setBlog(res.data);
      setTitle(res.data.title);
      setDesc(res.data.description);
    })
    .catch(err => {
      if(err.response) alert(err.response.data);
      else if(err.message) alert(err.message);
    })
  };

  return (
    <div className="container">
      <div className="row p-2">
        <div className="col-6">
          <div className="row mt-5">
            <div className="col-auto me-auto"><h3>Details</h3> <hr/></div>
            <div className="col-auto ms-auto me-3">
              <div className="singlePostEdit">
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(prev => !prev)}
                  ></i>
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={handleDelete}
                  ></i>
                </div>
            </div>
          </div>
          
          <div className="row">
            {blog.imageUrl && (
            <img src={blog.imageUrl} alt="" className="singlePostImg" />
          )}
          </div>

          <div className="row justify-content-center">
          {
            updateMode ? (
              <Input 
                type="text"
                value={title}
                className="singlePostTitleInput"
                autoFocus
                onChange={(e) => setTitle(e.target.value)} />
            )
            : <h1 className="singlePostTitle">{title}</h1>
          }
          </div>

          <div className="row p-1">
          {
            updateMode ? (
              <Input 
                type="textarea"
                value={desc}
                className="singlePostDescInput"
                autoFocus
                onChange={(e) => setDesc(e.target.value)} />
            )
            : <p className="singlePostDescInput">{desc}</p>
          }
          </div>

          {updateMode?<div className="row mt-1">
            <Button type="btn btn-primary" onClick={() => handleUpdate} >Update</Button>
          </div>:null}
        </div>

        <div className="col-6 box">
          <Comments blogId={blog._id}/>

        </div>
      </div>
    </div>
  );
}

export default SingleBlog;