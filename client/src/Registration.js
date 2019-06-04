import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import qs from 'qs'
import {getJWT, setJWT, confirmJWT, removeJWT} from "./tokenHelpers"
import {Redirect, Link} from 'react-router-dom'

class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: "",
            passwd: "",
            confirmPasswd: "",
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
      }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        const user = {
            login: this.state.login,
            passwd: this.state.passwd
        }
        if (this.state.passwd === this.state.confirmPasswd) {
          axios({
            method: 'post',
            url: 'http://localhost:9000/register',
            headers: {'Content-Type':'application/x-www-form-urlencoded', "Accept" : "application/json"},
            data: qs.stringify(user)
          })
          .then(res => console.log(res))
          .then(res => this.setState({redirect: true}))
        } else {
          console.log("Passwords dont match")
          this.setState({
            passwd: "",
            confirmPasswd: ""
          })
        }
        
    }

    render() {
        const {redirect} = this.state;
        if(redirect) {
          return <Redirect to={{
            pathname: '/nextstepreg',
            state: {login: this.state.login}
          }}/>
        }
    
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <p>Login</p>
              <input type="text" required value={this.state.login} name="login" onChange = {this.onChange}/>
              <p>Password</p>
              <input type="password" required placeholder="Password" value={this.state.passwd} name="passwd" onChange = {this.onChange}/>
              <p>Confirm Password</p>
              <input type="password" required placeholder="Confirm Password" value={this.state.confirmPasswd} name="confirmPasswd" onChange = {this.onChange}/>
              
              <input type="submit"  value="Register"/>
            </form>    
          </div>
        );
      }
}

export default Registration;