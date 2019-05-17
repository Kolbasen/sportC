import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      login: "",
      password: "" 
  };
  this.onLoginChange = this.onLoginChange.bind(this);
  this.onPasswordChange = this.onPasswordChange.bind(this);
}
/*
callAPI() {
    fetch("http://localhost:9000/login")
    .then(data => console.log(data))
}
componentWillMount() {
    this.callAPI();
}
*/

handleSubmit(e) {
}

onLoginChange(e) {
  let login = e.target.value;
  this.setState({login:login})

}

onPasswordChange(e) {
  let password = e.target.value;
  this.setState({password:password})

}


  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Login</p>
          <input type="text" value={this.state.login} onChange = {this.onLoginChange}/>
          <p>Password</p>
          <input type="password" value={this.state.password} onChange = {this.onPasswordChange}/>
          
          <input type="submit" value="Send"/>
        </form>    
      </div>
    );
  }
}

export default App;
