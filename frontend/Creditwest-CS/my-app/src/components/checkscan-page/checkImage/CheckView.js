import React from 'react'
import { FiRotateCw } from "react-icons/fi";
const CheckView = ({checkImage, setIsFrontImage}) => {
  return (
    <div className='check-view'>
      <img  className='check-view-image' src={checkImage}></img>
      <FiRotateCw onClick={() => setIsFrontImage(prev => !prev)} className='check-view-image-button' size={40}/>
    </div>

    
  )
}

export default CheckView
