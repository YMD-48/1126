import React from "react";
import { db } from "./firebase";
import AdbIcon from '@material-ui/icons/Adb';

const TaskItem = ({ id, title}) => {
  const DeleteInputData = () => {
    db.collection("group").doc(id).delete();
  };
  return (
    <div key={id}>
      <h2>{title}</h2>
      <button onClick={DeleteInputData}>
        <AdbIcon />
      </button>
    </div>
  );


};



export default TaskItem;