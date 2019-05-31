import React from 'react'

export default function AlcoList(props) {
  const alco = props.list;
  const alcoList = alco.map((ingredient, i ) => 
    <li key={i}>{ingredient}</li>
  )
  return (
    <div>
      <ul>
        {alcoList}
      </ul>
    </div>
  )
}
