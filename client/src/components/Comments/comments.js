import './comments.css';
import Comment from './comment';
import axios from 'axios';
import config from '../../config';
import { authContext } from '../../contexts/authContext';
import { useContext, useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';


const Comments = ({blogId}) => {
    const {user, accesstoken} = useContext(authContext);
    const [comments, setComments] = useState([]);
    const [New, setNew] = useState('');

    useEffect(() => {
        axios.get(config.serverUrl+`/comments/${blogId}`, {
            headers: {
              "Authorization": 'Bearer ' + accesstoken
            }
        })
        .then(res => {
            setComments(res.data);
        })
        .catch(err => {
            if(err.response) alert(err.response.data);
            else if(err.message) alert(err.message);
        })
    }, [blogId, accesstoken]);

    const addComment=() => {
        let comment={
            author: user.emailId,
            comment: New,
            blogId
        }
        axios.post(config.serverUrl+`/comments/new`, comment, {
            headers: {
              "Authorization": 'Bearer ' + accesstoken
            }
        })
        .then(res => {
            alert(res.data);
            setNew('');
            setComments([...comments, comment]);
        })
        .catch(err => {
            if(err.response) alert(err.response.data);
            else if(err.message) alert(err.message);
        })
    }


    return (
        <>
            <div className="row mt-5">
                <div className="col-auto"><h3>comments</h3><hr/></div>
            </div>

            <div className="row">
                <div className="col-10">
                    <Input 
                        type="text"
                        value={New}
                        onChange={e=> setNew(e.target.value)}/>
                    </div>
                <div className="col-2">
                    <Button type="btn" color="primary" onClick={()=>addComment()}>Add it</Button>
                </div>
            </div>

            <div className="row mt-3 commentBox p-2 ms-2 me-3">
                {comments?.map((c, id) => {
                    return (
                        <Comment key={id} comment={c}/>
                    )
                })}
            </div>



        </>
    );
}

export default Comments;