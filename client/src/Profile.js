import React, {Component } from 'react'
// import './Profile.css'
import AlcoList from './AlcoList'




function Profile(props) {
      return (
        <div>  
          <img src={require(`./public/uploads/${props.user.avatar}`)} width="100" height="100"/>
          <p>Login</p>
          <p>{props.user.login}</p>
          <p>Name</p>
          <p>{props.user.name}</p>
          <p>Surname</p>
          <p>{props.user.surname}</p>
          <p>Age</p>
          <p>{props.user.age}</p>
          <p>City</p>
          <p>{props.user.city}</p>
          <p>Info</p>
          <p>{props.user.info}</p>
          <p>Favourite drinks</p>
          <AlcoList list={[props.user.drink1,props.user.drink2,props.user.drink3]} />
        </div>
       
      );
}

export default Profile;