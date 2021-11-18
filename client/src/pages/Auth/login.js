import  { Component } from 'react';
import {Input,FormFeedback} from 'reactstrap';
import './style.css'
import axios from 'axios';
import config from'../../config';
import { authContext } from '../../contexts/authContext';

class Login extends Component {
    static contextType=authContext

    state= {
        email: '',
        password: '',
        touched: {
            email: false
        }
    }

    handleChange=(e) => {
        this.setState({
            [e.target.id]:e.target.value
        });
    }

    handleSubmit=() => {
        let {email,password}=this.state;
        let data={emailId:email,password};
        
        axios.post(config.serverUrl+'/auth/login',data)
        .then(res=> {
            console.log(res)
            this.context.modifyAuthStatus(res.data);
            this.props.history.push('/home');
        })
        .catch(err=> {
            if(err.response)
                alert(err.response.data)
            else    
                alert(err.message)
        });
    }

    //for touchng th box
    handleTouch =(feild) =>(e) => {
        this.setState({
            touched: {...this.state.touched, [feild]:true}
        });
    }

    //validating the form
    validate(email) {
        const err ={
            email:''
        }
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(this.state.touched.email && !mailformat.test(email))
            err.email='Mail format is not correct';
        return err
    }

    render() {
        let errs=this.validate(this.state.email);

        return (
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-11 col-lg-4 col-md-7 col-sm-9">
                            <form >

                                <div className="row justify-content-center mt-1">
                                    <div className="col-auto heading label">
                                        <h3>Log In</h3>
                                        <hr></hr>
                                    </div>
                                </div>

                                <div className="row mb-3 px-3">
                                    <label htmlFor="email" className="form-label label col-12 col-sm-6">Email Id</label>
                                    <Input type="email" id="email" className="col-12 col-sm-9" 
                                        placeholder="Enter User Email Id..."
                                        valid={errs.email===''}
                                        invalid={errs.email!==''}
                                        value={this.state.email}
                                        onBlur={this.handleTouch('email')}
                                        onChange={this.handleChange}>
                                    </Input>
                                    <FormFeedback>{errs.email}</FormFeedback>
                                </div>

                                <div className="row mb-3 px-3">
                                    <label htmlFor="password" className="form-label label col-12 col-sm-6">Password</label>
                                    <Input type="password" id="password"  className="col-12 col-sm-9" 
                                        placeholder="Enter Your Password..."
                                        valid={true}
                                        value={this.state.password}
                                        onChange={this.handleChange}>
                                    </Input>
                                </div>

                                <div className="row my-3 mx-3">
                                   <button type="button" className="btn btn-primary btn-block sub" onClick={this.handleSubmit}>Login</button>
                                </div>
                                <div class="row">
                                    <p class="text-center">Don't have account? <a className=" link-info fs-5" id="link" href="/signup">Sign up
                                        here</a></p>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
        );        
    }
}

export default Login;
