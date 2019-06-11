import React, {Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
import qs from 'qs'
import axios from "axios"
import {getJWT,  decodeJWT} from "./tokenHelpers"
import Profile from './Profile';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: "",
      loading: true,
      avatar: null,
      dataCame: false,
      left: true
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleStart = this.handleStart.bind(this)
  }

  componentDidMount(e) {
    this.setState({loading: false})
  }
  
  onSubmit(e) {
    e.preventDefault() 
    this.setState({loading: true})
    fetch({
      url:'http://localhost:9000/',
      method:"POST",
      headers: {
      'Content-Type':'application/x-www-form-urlencoded',
      "Accept" : "application/json"
    },
      data: qs.stringify({
        "id": decodeJWT().id,
        "target": this.state.id,
        "action": e.target.value
      })
    })
    .then(res=> {
      //console.log(typeof res.data )
      console.log(res)
      console.log(Object.keys(res.data).length)
      if (Object.keys(res.data).length === 1) {
        console.log(res.data.first)
        for (let key in res.data.first) {
          this.setState({ 
            [key] : res.data.first[key]
          })
        }
      } else {
        for (let key in res.data.first) {
          this.setState({ 
            [key] : res.data.first[key]
          })
        }
        console.log(res.data.second)
        console.log(true)
      }
      
      this.setState({loading: false})
    }) 
    
  }

  handleStart(e) {
    e.preventDefault()
    this.setState({loading: true})
    fetch({
      url:'http://localhost:9000/',
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded', "Accept" : "application/json"},
      data: qs.stringify({"id": decodeJWT().id})
    })
    .then(res => {
      console.log(res.data)
      console.log(Object.keys(res.data).length)
      if (Object.keys(res.data).length === 1) {
        console.log(res.data.first)
        for (let key in res.data.first) {
          this.setState({ 
            [key] : res.data.first[key]
          })
        }
      } else {
        for (let key in res.data.first) {
          this.setState({ 
            [key] : res.data.first[key]
          })
        }
        console.log(res.data.second)
        console.log(true)
      }
      this.setState({loading: false})
      
      console.log(this.state)
  })
  .then(res => this.setState({dataCame: true}))

  }

  render() {
    if (!getJWT()) {
      return <Redirect to="/auth"/>      
    } 
    if (this.state.loading) {
      return <h1>Loading</h1>
    } else {
      if (this.state.dataCame) {
        if (this.state.left) {
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
          return(
            <div>
              <Link to="/profile">
                <input type="submit" value="To profile"/>
              </Link>
              <Link to="/">
                <input type="submit" value="To Begin"/>
              </Link>
              <h1>No more users left</h1>
            </div>
          );
        }
        
      } else {
        return (
          <div>  
            <Link to="/profile">
              <input type="submit" value="To profile"/>
            </Link>
            <button size="lg" onClick={this.handleStart}>Let's Start</button>
            <h1>Press Lets start to begin!</h1>
  
        </div>
        );
      }     
    }
  }
   
}

export default Main;

