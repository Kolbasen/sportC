import jwt from "jsonwebtoken"
import React from 'react';
import {Redirect} from 'react-router-dom'


function getJWT() {
    return sessionStorage.getItem("idToken")
}
function setJWT(token) {
    sessionStorage.setItem("idToken", token)    
}
function removeJWT() {
    sessionStorage.removeItem("idToken")    
}
function decodeJWT() {
    return jwt.decode(getJWT())
}

export {getJWT,  setJWT, removeJWT, decodeJWT}