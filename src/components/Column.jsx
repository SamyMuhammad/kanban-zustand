import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";
import { useState } from "react";
import { useRef } from "react";
import classNames from "classnames";

function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [canDrop, setCanDrop] = useState(false);
  const titleInput = useRef(null);
  const tasks = useStore(
    useShallow((store) => store.tasks.filter((task) => task.state === state))
  );
  const draggedTaskId = useStore((store) => store.draggedTaskId);

  const addTask = useStore((store) => store.addTask);
  const setDraggedTaskId = useStore((store) => store.setDraggedTaskId);
  const moveTask = useStore((store) => store.moveTask);

  return (
    <div
      className={classNames("column", {drop: canDrop})}
      onDragOver={(e) => {
        setCanDrop(true);
        e.preventDefault();
      }}
      onDrop={() => {
        moveTask(draggedTaskId, state);
        setCanDrop(false);
        setDraggedTaskId(null);
      }}
      onDragLeave={(e) => {
        setCanDrop(false);
        e.preventDefault();
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task key={task.id} title={task.title} />
      ))}

      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Column;
