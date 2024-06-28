import React from 'react'
import './css/MainBtn.css';

const MainBtn = ( {text} ) => {
  return (

    <div className="py-2">
        <button type="submit" className="mainbtn btn btn-dark w-100" >{text}</button>
    </div>

  )
}

export default MainBtn;