import React, {Component } from 'react'
// import './Main.css'
import AlcoList from './AlcoList'
import {Redirect, Link} from 'react-router-dom'
import qs from 'qs'
import axios from "axios"
import {getJWT, setJWT, confirmJWT, removeJWT, decodeJWT} from "./tokenHelpers"
import Profile from './Profile';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: "",
      loading: true,
      avatar: null,
      dataCame: false
      //users: [{"loging":1, "name": 2 }, {"shit": 1, "u": 2}]
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleStart = this.handleStart.bind(this)
  }

  componentDidMount(e) {
    this.setState({loading: false})
  }
  
  onSubmit = (event) => {
    event.preventDefault()
    this.setState({loading: true})
    console.log(event.target.value)
    axios({
      url:'http://localhost:9000/',
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded', "Accept" : "application/json"},
      data: qs.stringify({"id": decodeJWT().id, "target": this.state.id})
    })
    .then(res=> {
      console.log(res)
      for (let key in res.data) {
        this.setState({ 
          [key] : res.data[key]
        })
      }
      this.setState({loading: false})
    }) 
    
  }

  handleStart(e) {
    e.preventDefault()
    this.setState({loading: true})
    axios({
      url:'http://localhost:9000/',
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded', "Accept" : "application/json"},
      data: qs.stringify({"id": decodeJWT().id})
    })
    .then(res => {
      console.log(res.data)
      for (let key in res.data) {
        this.setState({ 
          [key] : res.data[key]
        })
      }
      this.setState({loading: false})
      this.setState({dataCame: true})
      console.log(this.state)
  })

  }

  render() {
    const list = [1,2,3,4];
    
    if (!getJWT()) {
      return <Redirect to="/auth"/>      
    } else {
      console.log(getJWT())
      console.log(decodeJWT())
    }
    if (this.state.loading) {
      return <h1>Loading</h1>
    } else {
      if (this.state.dataCame) {
        return (
          <div>
            <Link to="/profile">
              <input type="submit" value="To profile"/>
            </Link>
            <input  type="submit" onClick={this.onSubmit} value='Approve'/>
            <input type="submit" onClick={this.onSubmit} value='Decline'/>
            <Profile user={this.state}/>
          </div>
        );
      } else {
        return (
          <div>  
            <Link to="/profile">
              <input type="submit" value="To profile"/>
            </Link>
            <button size="lg" onClick={this.handleStart}>Let's Start</button>
            <h1>Some shit</h1>
            <AlcoList list={list} />
  
        </div>
        );
      }     
    }
  }
   
}

export default Main;

