import React, { useRef, useState } from "react";
import "./searchbar.css";

const SearchBar = ({ placeholder, data, handleSelect }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const inputRef = useRef();

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setSearchVal(searchWord)
    const newFilter = data.filter((val) => {
      return val.city_name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(newFilter)
  };

  const handleOnFocus = () => {
    setFilteredData(data);
  };

  const handleOnSelect = (sel) => {
    handleSelect(sel)
    clearInput("")
  };

  const clearInput = (e) => {
    setFilteredData([]);
    setSearchVal("")
    inputRef.current.value = "";
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          onChange={handleFilter}
          onFocus={handleOnFocus}
          value={searchVal}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <h2>O</h2>
          ) : (
            <h2 id="clearBtn" onClick={clearInput}>
              X
            </h2>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((item, index) => {
            return (
              <a
                key={index}
                className="dataItem"
                onClick={() => handleOnSelect(item.city_name)}
              >
                <p>{item.city_name}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
