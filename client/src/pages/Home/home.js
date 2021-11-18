import { useContext, useEffect, useState } from "react";
import Blogs from "../../components/Blogs/blogs";
import "./home.css";
import axios from "axios";
import config from '../../config';
import { authContext } from "../../contexts/authContext";

const Home=()=> {
  const {accesstoken} = useContext(authContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(config.serverUrl+"/blogs" , {
        headers: {
            "Authorization": 'Bearer ' + accesstoken
        }
    })
    .then(res => {
      console.log(res.data);
        setBlogs(res.data);
    })
    .catch(err => {
        if(err.response) alert(err.response.data);
        else if(err.message) alert(err.message);
    })
  }, [accesstoken]);

  return (
      <div className="home">
        <Blogs blogs={blogs} />
      </div>
  );
}

export default Home;