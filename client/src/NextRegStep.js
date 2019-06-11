import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'
import axios from "axios";
import qs from 'qs'

class NextRegStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            name: "",
            surname: "",
            age: "",
            info: "",
            city: "Kiev",
            drink1: "",
            drink2: "",
            drink3: "",
            file: null,
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
      }

    onFileChange(e) {
      console.log(e.target.files[0]);
      this.setState({file: e.target.files[0] }, function () {
        //this.setState({ava: this.state.file.name})
        console.log(this.state)
        console.log(this.state.file)})
      //console.log(this.state.file)
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.file.name)
        
        const information = {
            login: this.props.location.state.login,
            name: this.state.name,
            surname: this.state.surname,
            age: this.state.age,
            city: this.state.city,
            info: this.state.info,
            drink1: this.state.drink1,
            drink2: this.state.drink2,
            drink3: this.state.drink3,
          }  

          // for (let key in this.state) {
          //   if (key !== "file") {
          //     information[key] = this.state[key]
          //   }
          // }

           const formData = new FormData();
          // console.log(this.state.file)
           formData.append('avatar',this.state.file, this.state.file.name);
           formData.append('info', JSON.stringify(information))
           console.log(formData.get('avatar'));
          //console.log(formData);
          // function sendInfo() {
          //   axios({
          //     method: 'post',
          //     url: 'http://localhost:9000/nextstepreg',
          //     //headers: {'Content-Type':'multipart/form-data', "Accept" : "application/json"},
          //     data: formData, //qs.stringify(information)
          //     data: qs.stringify(information)
          //   })
          // }

          //  function sendImage() {
             axios.post('http://localhost:9000/nextstepreg', formData)
             .then(res => console.log(res))
             .then(res => this.setState({redirect:true}))
          //}

          // axios.all([sendImage(), sendInfo()])
          // .then(res => console.log(true))

          
          //  
          // .then(res => axios.post({
          //     method: 'post',
          //     url: 'http://localhost:9000/nextstepreg',
          //     //headers: {'Content-Type':'multipart/form-data', "Accept" : "application/json"},
          //     //data: qs.stringify(information)
          //   })
          //   
          
    }

    render() {
      console.log(this.props.location.state.login)
      if (this.state.redirect) {
        return <Redirect to="/auth"/>
      }

        return (
            
            <div>
                
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <p>Name</p>
                <input type="text"  value={this.state.name} name="name" onChange = {this.onChange}/>
                <p>Surname</p>
                <input type="text"  value={this.state.surname} name="surname" onChange = {this.onChange}/>
                <p>Add your photo</p>
                <input type="file" onChange={this.onFileChange}/>
                <p>Age</p>
                <input type="number"  min="18" max="120" value={this.state.age} name="age" onChange = {this.onChange}/>
                <p>City</p>
                <select name="city" required defaultValue="Choose a city" onClick={this.onChange}>
                    <option>Kiev</option>
                    <option>Odessa</option>
                    <option>Lviv</option>
                </select>
                <p>Some information about yourself</p>
                <textarea  maxLength="50" rows="10" cols="45" name="info"  value={this.state.info} onChange = {this.onChange}></textarea>
                <p>Your favourite drinks</p>
                <input  type="text" value={this.state.drink1} name="drink1" onChange = {this.onChange}/>
                <input  type="text" value={this.state.drink2} name="drink2" onChange = {this.onChange}/>
                <input  type="text" value={this.state.drink3} name="drink3" onChange = {this.onChange}/>
                <input  type="submit" onSubmit={this.handleSubmit}  value="Finish Registration"/>
              </form>    
        <     p>Have not registered yet?</p>
              <Link to="/registration">Click Here</Link>
           </div>
            
        )
    }

}

export default NextRegStep;