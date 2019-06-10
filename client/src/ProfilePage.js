import React, {Component } from 'react'
// import './Profile.css'
import AlcoList from './AlcoList'
import {Redirect, Link} from 'react-router-dom'
import axios from "axios"
import {getJWT, setJWT, confirmJWT, removeJWT, decodeJWT} from "./tokenHelpers"
import qs from 'qs'
import Profile from './Profile'




class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  // fetchUsers() {
  //   fetch({
  //     url:'http://localhost:9000/profile',
  //     method: 'POST',
  //     headers: {'Content-Type':'application/x-www-form-urlencoded', "Accept" : "application/json"},
  //     data: qs.stringify({'data':1})
  //   })
  //     .then(response => console.log(response))
  //     .catch(error => console.log(error));
  // }

  componentWillMount() {
      //this.fetchUsers();
      axios({
        url:'http://localhost:9000/profile',
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded', "Accept" : "application/json"},
        data: qs.stringify({"login": decodeJWT().login})
      })
      .then(res => {
        console.log(res.data)
        for (let key in res.data) {
          this.setState({ 
            [key] : res.data[key]
          })
        }
        this.setState({loading: false})
        console.log(this.state)
    })
  }   
  

  onSubmit = (e) => {
    
  }

  render() {
    console.log(this.state)
    if (!getJWT()) {
      return <Redirect to="/auth"/>      
    } else {
      console.log(getJWT())
      console.log(decodeJWT())
    }
    if (this.state.loading) {
      return (<div>
        <p>Loading</p>
      </div>);    
    } else {
      return (
        <div>
          <Profile user={this.state}/>
          <Link to="/">Back to main page</Link>
        </div>
      );
    }
  }
   
}

export default ProfilePage;