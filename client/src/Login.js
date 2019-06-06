import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import qs from 'qs'
import {getJWT, setJWT, confirmJWT, removeJWT} from "./tokenHelpers"
import {Redirect, Link} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      login: "",
      passwd: "", 
      redirect: false
      };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
handleSubmit(e) {
  e.preventDefault();
  console.log(this.state)
  const user = {
    login: this.state.login,
    passwd: this.state.passwd
  } 
  axios({
    method: 'post',
    url: 'http://localhost:9000/auth',
    headers: {'Content-Type':'application/x-www-form-urlencoded', "Accept" : "application/json"},
    data: qs.stringify(user)
  })
  //.then(res => console.log(res.data))
  .then(res => setJWT(res.data))
  .then(res => console.log(getJWT()))
  .then(res => this.setState({redirect: true}))
}

onChange(e) {
  this.setState({[e.target.name]: e.target.value})
}

  render() {
    const {redirect} = this.state;
    if(redirect) {
      return <Redirect to="/"/>
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Login</p>
          <input type="text" value={this.state.login} name="login" onChange = {this.onChange}/>
          <p>Password</p>
          <input type="password" value={this.state.passwd} name="passwd" onChange = {this.onChange}/>
          
          <input type="submit"  value="Login"/>
        </form>    
        <p>Have not registered yet?</p>
        <Link to="/registration">Click Here</Link>
      </div>
    );
  }
}

export default App;
