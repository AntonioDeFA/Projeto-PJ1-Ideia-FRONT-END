import React from "react";
import CardCompeticao from "../CardCompeticao";
import CardMinhasCompeticoes from "../CardMinhasCompeticoes";
import "./styles.css";

function CardItemList() {
  return (
    <div id="component-cardItemList" className=" me-5 margem-personalizada-list">
      <CardCompeticao />
    </div>
  );
}

export default CardItemList;