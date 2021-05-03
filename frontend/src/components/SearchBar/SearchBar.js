import React from 'react';

const SearchBar = ({keyword,handleChange}) => {
  const BarStyling = {width:"40rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <div className="SearchBar">
    <input 
     style={BarStyling}
     key="random1"
     placeholder={keyword}
     onKeyUp={handleChange}
    />
    </div>
  );
}

export default SearchBar