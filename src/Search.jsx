import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useRef } from 'react';




const Search = ({text,handleCity,handleKeyDown,search}) => {
  
    const inputRef = useRef()
  return (
    <div className="search-box">
    <div className="location"> <FaMapMarkerAlt /></div>
    <input  
            autoFocus
            required
            ref={inputRef}
            type="text"
            placeholder="enter your location"
            value={text}
            onChange={handleCity}
            onKeyDown={handleKeyDown}
        />
    <button onClick={() => {
            search();
            inputRef.current.focus();
            }}>
        <FaSearch />
    </button>
  </div>
  )
}

export default Search