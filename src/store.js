import { create } from "zustand";
import { persist } from 'zustand/middleware'

const store = (set) => ({
    tasks: [
        { id: 1, title: "First Task", state: 'PLANNED' },
        { id: 2, title: "Second Task", state: 'DONE' },
        { id: 3, title: "Third Task", state: 'ONGOING' },
        { id: 4, title: "Fourth Task", state: 'ONGOING' },
    ],
    draggedTaskId: null,

    addTask: (title, state) => {
        let newTaskId = Math.floor((Math.random() * 1000) + 1);
        return set(
            (store) => (
                { tasks: [...store.tasks, { id: newTaskId, title, state }] }
            )
        );
    },

    deleteTask: (id) => set(store => ({ tasks: store.tasks.filter(task => task.id !== id) })),

    setDraggedTaskId: (id) => set({ draggedTaskId: id }),

    moveTask: (id, state) => set(store => ({
        tasks: store.tasks.map(task => {
            if (task.id === id) {
                task.state = state;
            }
            return task;
        })
    }))
});

export const useStore = create(persist(store, {name: 'store'}));