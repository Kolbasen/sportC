import React, {Component } from 'react'
// import './Main.css'
import AlcoList from './AlcoList'

class Main extends Component {

  state = {

  }

  onHandleSubmitApprove = (event) => {
    event.preventDefault()
    console.log(1)   
  }

  onHandleSubmitDecline = (e) => {
    e.preventDefault();
    console.log(2);
  }

  
 
  render() {
    const list = [1,2,3,4];
    return (
      <div>  
        <h1>Some shit</h1>
         <form className="leftButton" onSubmit={this.onHandleSubmitApprove}>
           <input  type="submit" value='Approve'/>
         </form>
         <form className="rightButton"  onSubmit = {this.onHandleSubmitDecline}> 
         <input type="submit" value='Decline'/>
         </form>
         <AlcoList list={list} />
      </div>
      
    );
  }
   
}

export default Main;

