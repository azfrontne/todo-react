import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  // TODO入力部分
  const [todoText, setTodoText] = useState("");
  // 未完了TODO部分
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了TODO部分
  const [completeTodos, setCompleteTodos] = useState([]);

  // テキスト入力時のイベント
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタン押下時のイベント
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  // 削除ボタン押下時のイベント
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // 選択した要素を削除
    newTodos.splice(index, 1);
    // 再度TODOの情報をセットし直す
    setIncompleteTodos(newTodos);
  };

  // 完了ボタン押下時のイベント
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    // 選択した要素を削除
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    // 再度TODOの情報をセットし直す
    setIncompleteTodos(newIncompleteTodos);
    // 再度TODOの情報をセットし直す
    setCompleteTodos(newCompleteTodos);
  };

  // 戻すボタン押下時のイベント
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    // 選択した要素を削除
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    // 再度TODOの情報をセットし直す
    setIncompleteTodos(newIncompleteTodos);
    // 再度TODOの情報をセットし直す
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODOは5個までです。</p>
      )}
      <IncompleteTodos
        incompleteTodos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos completeTodos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
