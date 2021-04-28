import React from 'react';

const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {width:"40rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <div className="SearchBar">
    <input 
     style={BarStyling}
     key="random1"
     placeholder={"search user"}
     onChange={(e) => {
       if(e.key == 'Enter'){
        setKeyword(e.target.value)
       }
     }}
    />
    </div>
  );
}

export default SearchBar