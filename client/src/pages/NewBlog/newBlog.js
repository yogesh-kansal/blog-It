import { useContext, useState } from "react";
import {Input } from 'reactstrap';
import "./newBlog.css";
import axios from "axios";
import config from '../../config';
import { authContext } from "../../contexts/authContext";

const NewBlog = (props)=> {
  const {accesstoken} = useContext(authContext);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [imageUrl, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
      imageUrl
    };

    axios.post(config.serverUrl+"/blogs/new" , newPost, {
      headers: {
          "Authorization": 'Bearer ' + accesstoken
      }
    })
    .then(res => {
      alert(res.data)
      props.history.push('/');
    })
    .catch(err => {
        if(err.response) alert(err.response.data);
        else if(err.message) alert(err.message);
    })
  };

  return (
    <div className="write container">
      {imageUrl && (
        <img className="writeImg" src={imageUrl} alt="" />
      )}
      
      <div className="row justify-content-center">
      <form className="col-8" onSubmit={handleSubmit}>
        <div className="row justify-content-center mt-1">
            <div className="col-auto heading label">
                <h3>Details</h3>
                <hr></hr>
            </div>
        </div>

        <div className="row mb-3 px-3">
            <label htmlFor="image" className="form-label label col-12 col-sm-6">Image Url</label>
            <Input type="text" id="image" className="col-12 col-sm-9" 
                placeholder="Enter url..."
                value={imageUrl}
                onChange={e=>setImage(e.target.value)}>
            </Input>
        </div>

        <div className="row mb-3 px-3">
            <label htmlFor="title" className="form-label label col-12 col-sm-6">Title</label>
            <Input type="text" id="title"  className="col-12 col-sm-9" 
                placeholder="Title..."
                value={title}
                onChange={e=> setTitle(e.target.value)}>
            </Input>
        </div>

        <div className="row mb-3 px-3">
            <label htmlFor="desc" className="form-label label col-12 col-sm-6">Description</label>
            <Input type="textarea" id="desc"  className="col-12 col-sm-9" rows="3"
                placeholder="your thoughts..."
                value={description}
                onChange={e=> setDesc(e.target.value)}>
            </Input>
        </div>

        <div className="row my-3 mx-3 justify-content-center">
          <button type="submit" className="col-6 btn btn-primary btn-block sub">Publish</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default NewBlog;