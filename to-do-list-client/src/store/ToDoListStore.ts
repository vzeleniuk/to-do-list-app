import { action, makeObservable, observable, runInAction } from 'mobx';
import { ToDoService } from '../services/ToDoService';
import { ToDo } from './ToDo';

export class ToDoListStore {
  toDoService: ToDoService = new ToDoService();
  toDoList: ToDo[] = [];
  status: 'initial' | 'success' | 'error' = 'initial';

  constructor() {
    this.toDoList = [new ToDo()];
    makeObservable(this, {
      toDoList: observable,
      addToDo: action.bound,
      removeToDo: action.bound,
    });
  }

  getToDoList = async () => {
    try {
      const data = await this.toDoService.get();
      runInAction(() => {
        this.toDoList = data;
        this.status = 'success';
      });
    } catch (error) {
        this.status = 'error';
    }
  }

  addToDo(name?: string) {
    const lastToDoItemIsNotEmpty = this.toDoList.slice(-1)[0]?.name;
    if (lastToDoItemIsNotEmpty) {
      const emptyToDo = new ToDo(name);
      this.toDoList = [
        ...this.toDoList,
        emptyToDo,
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
