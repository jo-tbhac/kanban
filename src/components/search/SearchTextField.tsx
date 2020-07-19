import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SearchTextFieldProps = {
  keyword: string
  onChangeSearchKeyword: (keyword: string) => void
  placeholder: string
}

export const SearchTextField = (props: SearchTextFieldProps) => {
  const { keyword, onChangeSearchKeyword, placeholder } = props;

  return (
    <div className="searchTextField">
      <input
        data-testid="searchTextField"
        type="text"
        value={keyword}
        onChange={(event) => onChangeSearchKeyword(event.target.value)}
        placeholder={placeholder}
        className="searchTextField__input"
      />
      {keyword === ''
        ? (
          <FontAwesomeIcon
            data-testid="searchTextFieldSearchIcon"
            icon={['fas', 'search']}
            className="searchTextField__searchIcon"
          />
        ) : (
          <div
            data-testid="searchTextFieldClearButton"
            role="button"
            tabIndex={0}
            onClick={() => onChangeSearchKeyword('')}
            onKeyPress={() => onChangeSearchKeyword('')}
            className="searchTextField__clear"
          >
            <FontAwesomeIcon icon={['far', 'times-circle']} />
          </div>
        )}
    </div>
  );
};

export default SearchTextField;
