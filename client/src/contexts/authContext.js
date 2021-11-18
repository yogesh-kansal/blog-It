import React, { Component } from 'react';
import axios from 'axios';
import config  from '../config';

export const authContext=React.createContext();

class AuthContextProvider extends Component {
    state= {
        loginStatus:false,
        accesstoken:null,
        user:null,
        data:null
    }

    componentDidMount() {
        console.log('called')

        if(!this.state.accesstoken)
        {
            let token=localStorage.getItem('token');
            console.log(token);

            if(!token)
                return ;
            axios.get(config.serverUrl+'/auth/refresh', {
                headers: {
                    'Authorization': 'Bearer '+token
                }
            })
            .then(res => {
                console.log(res);
                localStorage.setItem('token',res.data.accesstoken);
                this.setState({
                    loginStatus:true,
                    accesstoken:res.data.accesstoken,
                    user:res.data.user
                })
            })
            .catch(err => {
                console.log(err.response)
                alert(err.message);
                this.setState({
                    loginStatus:false
                })
            });
        }
    }

    modifyAuthStatus=(data) => {
        console.log(data)
        localStorage.setItem('token',data.accesstoken);
        this.setState({
            loginStatus:true,
            accesstoken:data.accesstoken,
            user:data.user
        })
        console.log("done")
    }

    logOut= () => {
        localStorage.clear();
        this.setState({
            loginStatus:false,
        accesstoken:null,
        user:null,
        data:null
        });
    }

    modifyInfo=(user) => {
        this.setState({
            user
        })
    }

    modifyData =(data) => {
        this.setState({
            data
        })
    } 

    render() {
        return (
            <authContext.Provider value={{...this.state,
                        modifyInfo:this.modifyInfo,
                        modifyData:this.modifyData,
                        modifyAuthStatus: this.modifyAuthStatus,
                        logOut:this.logOut}
            }>
                {this.props.children}
            </authContext.Provider>
        );
    }
}

export default AuthContextProvider;
