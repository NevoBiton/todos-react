import React from "react";

function AddTodoFilter(props) {
  return (
    <>
      <div>
        <label htmlFor="filter">Filter Todo's By : </label>
        <select
          value={props.filter}
          onChange={(e) => {
            props.setFilter(e.target.value);
          }}
          name=""
          id="filter"
        >
          <option>Select filter</option>
          <option>Completed</option>
          <option>Not completed</option>
          <option>Alphabet</option>
        </select>
      </div>
    </>
  );
}

export default AddTodoFilter;
