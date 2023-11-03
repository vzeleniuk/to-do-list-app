import { makeObservable, observable, action } from "mobx"
import { ToDo } from "./ToDo"

export class ToDoListStore {
  toDoList: ToDo[] = [];
  constructor(toDoList: ToDo[]) {
    makeObservable(this, {
      toDoList: observable,
      addToDo: action.bound,
      removeToDo: action.bound,
    });
    this.toDoList = toDoList;
  }

  addToDo(name?: string) {
    const lastToDoItemIsNotEmpty = this.toDoList.slice(-1)[0]?.name;
    if (lastToDoItemIsNotEmpty) {
      this.toDoList = [
        ...this.toDoList,
        new ToDo(name)
      ]
    }
  }

  removeToDo(id: string) {
    const hasSeveralToDos = this.toDoList.length > 1;
    const hasName = this.toDoList.find(toDo => toDo.id === id && !toDo.name);
    const isLastElement = this.toDoList.findIndex(toDo => toDo.id === id) === this.toDoList.length - 1;

    if (hasSeveralToDos && hasName && !isLastElement) {
      const filteredList = this.toDoList.filter(toDo => toDo.id !== id);
      this.toDoList = filteredList;
    }
  }
}
