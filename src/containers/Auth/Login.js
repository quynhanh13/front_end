import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
// import { KeyCodeUtils, LanguageUtils } from "../utils";

// import userIcon from '../../src/assets/images/user.svg';
// import passIcon from '../../src/assets/images/pass.svg';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

// import adminService from '../services/adminService';
// import { divide } from 'lodash';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: ' '
        }

    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value)
    }

    handleLogin = async () => {
        this.setState({
            errMessage: '',
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            console.log('123', data)
            if (data && data.errCode != 0) {
                this.setState({
                    errMessage: data.message
                })
            }

            if (data && data.errCode == 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login sussesfull')
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('qa', error.response)
        }


    }


    render() {

        return (
            <div className="login-background">
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center'>Login</div>
                        <div className='form-row'>
                            <div className='form-group col-md-12'>
                                <label for="inputEmail">Email</label>
                                <input type='email'
                                    className='form-control' name="email"
                                    value={this.state.username}
                                    placeholder='Email' required
                                    onChange={(event) => this.handleOnChangeUsername(event)}>
                                </input>
                            </div>

                            <div className='form-group col-md-12'>
                                <label for="inputPassword">Password</label>
                                <input type='password'
                                    className='form-control'
                                    name="password"
                                    placeholder='Password' required
                                    onChange={(event) => this.handleOnChangePassword(event)}>

                                </input>
                            </div>

                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>

                            <button type="submit" className="button" onClick={() => this.handleLogin()}>Sign in</button>

                            <div className='col-12 forgot-pass' >
                                <a href='https://www.google.com/'> Forgot password</a>
                            </div>

                            <div className='col-12 login-with' >
                                <span>Or login with</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
