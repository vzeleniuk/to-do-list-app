import { action, makeObservable, observable, runInAction } from 'mobx';
import { ToDoService } from '../services/ToDoService';
import { ToDo } from './ToDo';

type ToDoItem = {
  id: string;
  name: string;
  checked: boolean;
}

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
      getToDoList: action,
    });
  }

  getToDoList = async () => {
    try {
      const { data } = await this.toDoService.get('todo-list');
      runInAction(() => {
        const toDoListData = !data.length
          ? [new ToDo()]
          : data.map((item: ToDoItem) => new ToDo(item.name, item.id, item.checked)
        );
        this.toDoList = toDoListData;
        this.status = 'success';
      });
    } catch (error) {
      console.log('error: ', error);
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
