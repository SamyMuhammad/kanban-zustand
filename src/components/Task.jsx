import classNames from "classnames";
import "./Task.css";
import { useStore } from "../store";
import trash from "../assets/trash.svg";

function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggedTaskId = useStore((store) => store.setDraggedTaskId);

  return (
    <div className="task" draggable onDragStart={() => setDraggedTaskId(task.id)}>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div>
          <img
            src={trash}
            alt="trash-icon"
            onClick={() => deleteTask(task.id)}
          />
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}

export default Task;
