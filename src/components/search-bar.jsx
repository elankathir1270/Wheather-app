import React, { useRef, useState } from "react";
import "./searchbar.css";
import { SearchIcon } from "./searchIcon";

const SearchBar = ({ placeholder, data, handleSelect }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const inputRef = useRef();

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setSearchVal(searchWord)
    const newFilter = data.filter((val) => {
      return val.toLowerCase().includes(searchWord.toLowerCase());
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
            <SearchIcon />
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
                onClick={() => handleOnSelect(item)}
              >
                <p>{item}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
