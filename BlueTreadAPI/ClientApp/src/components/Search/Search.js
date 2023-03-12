import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

const Search = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState(null);

  const loadOptions = async (inputValue) => {
    return {
      options: [
        { label: 'Reno, NV' },
        { label: 'Austin, TX' },
        { label: 'Tampa, FL' }
      ]
    };
  };

  const onChangeHandler = (enteredData) => {
    onSearchChange(enteredData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600}
      getOptionValue={option => option.label}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
