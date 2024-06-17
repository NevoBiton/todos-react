import { React } from "react";

function AddSearchBar(props) {
  return (
    <>
      <div>
        <label htmlFor="search">Search Todo : </label>
        <input
          value={props.query}
          onChange={(e) => {
            props.setQuery(e.target.value);
          }}
          type="text"
          name="search"
          id="search"
        />
      </div>
    </>
  );
}

export default AddSearchBar;
