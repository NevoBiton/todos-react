import React from "react";

function ItemInformation(props) {
  const currentDate = new Date(props.date);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return (
    <div>
      <h4>Info</h4>
      <p>Created at: {`${day}/${month}/${year}`}</p>
      <p>Title: {props.title}</p>
    </div>
  );
}

export default ItemInformation;
