import React, { Component } from 'react';
import {Input,FormFeedback} from 'reactstrap';
import './style.css'
import axios from 'axios';
import config from '../../config';
import LoadingSpinner from '../../components/loadingSpinner';

class Signup extends Component {
    state= {
        isLoading:false,
        emailId: '',
        username: '',
        password: '',
        mobNum:'',
        touched: {
            user:false,
            emailId: false,
            pass: false,
            mobNum: false
        }
    }

    //for touchng th box
    handleTouch =(feild) =>(e) => {
        this.setState({
            touched: {...this.state.touched, [feild]:true}
        });
    }

    handleChange=(e) => {
        this.setState({
            [e.target.id]:e.target.value
        });
    }

    //validating the form
    validate(user,email,pass, mob) {
        let err ={
            user: '',
            email:'',
            pass:'',
            mob: ''
        }
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let mobformat = /^[7-9][0-9]{9}$/;

        if(this.state.touched.emailId && !mailformat.test(email))
            err.email='Mail format is not correct';
        if(this.state.touched.mobNum && !mobformat.test(mob))
            err.mob='mobile format is not correct';
        if(this.state.touched.user && user.length<3)
            err.user='usernmae must be atleat of lenght 3';
        else if(this.state.touched.pass && user.length>8)
            err.user='username must be atmax of lenght 8';
        if(this.state.touched.pass && pass.length<6)
            err.pass='Password must be atleat of lenght 6';
        return err;
    }

    handleSubmit=(e) => {
        e.preventDefault();

        this.setState({
            isLoading:true
        })

        axios.post(config.serverUrl+'/auth/signup',this.state)
        .then(res => {
            this.setState({
                isLoading:false
            })
            console.log(res);
            this.props.history.push('/login');
        })
        .catch(err => {
            this.setState({
                isLoading:false
            })
            if(err.response)
                alert(err.response.data);
            else
                alert(err.message);
        });
    }

    render() {
        let errs=this.validate(this.state.username, this.state.emailId,this.state.password, this.state.mobNum);

        return (
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-11 col-lg-4 col-md-7 col-sm-9">
                            <form onSubmit={this.handleSubmit} className="">

                                <div className="row justify-content-center mt-1">
                                    <div className="col-auto heading label">
                                        <h3>Sign Up</h3>
                                            <hr></hr>
                                    </div>
                                </div>

                                {
                                    this.state.isLoading
                                    ?
                                    <LoadingSpinner />
                                    :
                                
                                    <>
                                    <div className="row mb-3 px-3">
                                        <label htmlFor="username" className="form-label label col-12 col-md-6">Username</label>
                                        <Input type="text" id="username" className="col-11 col-md-7" 
                                            placeholder="Your choice..."
                                            valid={errs.user===''}
                                            invalid={errs.user!==''}
                                            value={this.state.username}
                                            onBlur={this.handleTouch('user')}
                                            onChange={this.handleChange}>
                                        </Input>                                    
                                        <FormFeedback>{errs.user}</FormFeedback>
                                    </div>

                                    <div className="row mb-3  px-3">
                                        <label htmlFor="emailId" className="form-label label col-12 col-md-6">Email Id</label>
                                        <Input type="email" id="emailId" className="col-12 col-md-9" 
                                            placeholder="User Email Id..."
                                            valid={errs.email===''}
                                            invalid={errs.email!==''}
                                            value={this.state.emailId}
                                            onBlur={this.handleTouch('email')}
                                            onChange={this.handleChange}>
                                        </Input>
                                        <FormFeedback>{errs.email}</FormFeedback>
                                    </div>

                                    <div className="row mb-3  px-3">
                                        <label htmlFor="password" className="form-label label col-12 col-md-6">Password</label>
                                        <Input type="password" id="password"  className="col-12 col-md-9" 
                                            placeholder="Your Password..."
                                            valid={errs.pass===''}
                                            invalid={errs.pass!==''}
                                            value={this.state.pass}
                                            onBlur={this.handleTouch('pass')}
                                            onChange={this.handleChange}>
                                        </Input>
                                        <FormFeedback>{errs.pass}</FormFeedback>
                                    </div>

                                    <div className="row mb-3  px-3">
                                        <label htmlFor="mobNum" className="form-label label col-12 col-md-6">Mobile</label>
                                        <Input type="text" id="mobNum" className="col-12 col-md-9" 
                                            placeholder="Moblie no..."
                                            valid={errs.mob===''}
                                            invalid={errs.mob!==''}
                                            value={this.state.mobNum}
                                            onBlur={this.handleTouch('mobNum')}
                                            onChange={this.handleChange}>
                                        </Input> 
                                        <FormFeedback>{errs.mob}</FormFeedback>                                  
                                    </div>

                                    <div className="row my-3 mx-3 ">
                                            <button type="submit" className="btn btn-primary btn-block sub">Get started here</button>
                                    </div>

                                    <div class="row mt-3">
                                        <a className="text-center link-info fs-5" id="link" href="/login">Alreday have an Account?</a>
                                    </div>
                                    </>
                                }
                            </form>
                        </div>
                    </div>
                </div>
        );     
    }
}

export default Signup;