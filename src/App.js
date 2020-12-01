import { FormControl, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { db } from "./firebase";
import AcUnitIcon from '@material-ui/icons/AcUnit';


const App = () => {
  // 1.記述
  const [data, setData] = useState([{ id: "", title: ""}]);
  // 記述登録1
  const [inputValue, setInputValue] = useState("");
  // 記述登録２
  const handleInputChange = (e) => {
    console.log(e, "event");
    setInputValue(e.target.value); //inputValueに値を書き込む（更新）
  };

  // 記述登録3
  const addInputData = () => {
    db.collection("group").add({ title: inputValue});
    setInputValue("");
  };

  // 2.記述
  useEffect(() => {
    const firebaseData = db
    .collection("group")
    .orderBy("title", "asc")
    .onSnapshot((snapshot) => {
      setData(
        snapshot.docs.map((dbData) => ({
          id: dbData.id,
          title: dbData.data().title
        }))
      );
    });
    return () => firebaseData();
  }, []); //←ここに最後一つ書きたします

  // // ここに記述,useStateで作ったdata変数をコンソールログで表示
  //console.log(data);

  return (
    <div>
      <h1>一言タイトル</h1>
      {/* 登録の処理 */}
      <FormControl>
        {/* inputタグ */}
        <TextField
          label="登録追加"
          value={inputValue}
          onChange={handleInputChange}
        />
        

      </FormControl>

       {/* 登録の処理　ボタン */}
       <button disabled={!inputValue} onClick={addInputData}>
        <AcUnitIcon/>
      </button>
      
      {/* dataっていう変数のなかに全てのデータが入っているのでmapを使って展開 */}
      {data.map((dataItem) => (
        ///<h1 key={dataItem.id}>{dataItem.title}</h1>
        <>
          
          <TaskItem id={dataItem.id} title={dataItem.title} />
        </>  
      ))}
    </div>
  );
};
export default App;