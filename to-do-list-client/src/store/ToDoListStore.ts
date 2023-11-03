import { action, makeObservable, observable, runInAction } from 'mobx';
import { ToDoService } from '../services/ToDoService';
import { UpdateToDoPayload } from '../types';
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
    this.toDoList = [ new ToDo() ];
    makeObservable(this, {
      status: observable,
      toDoList: observable,
      getToDoList: action.bound,
      addToDo: action.bound,
      updateToDo: action.bound,
      removeToDo: action.bound,
    });
  }

  isLastToDoItemIsNotEmpty = () => !!this.toDoList.slice(-1)[0]?.name

  getToDoList = async () => {
    try {
      const data: ToDoItem[] = await this.toDoService.get();
      runInAction(() => {
        const toDoListData = data.map((item: ToDoItem) => new ToDo(item.name, item.id, item.checked));

        this.toDoList = [
          ...toDoListData,
          new ToDo(),
        ];

        this.status = 'success';
      });
    } catch (error) {
      console.log('error: ', error);
      this.status = 'error';
    }
  }

  addToDo = async (name: string) => {
    try {
      await this.toDoService.post({ name });
      runInAction(() => {
        this.status = 'success';
      })
      await this.getToDoList();
    } catch (error) {
      runInAction(() => {
        this.status = 'error';
      })
    }
  }

  updateToDo = async (id: string, { name, checked }: UpdateToDoPayload) => {
    try {
      await this.toDoService.put(id, { name, checked });
      runInAction(() => {
        this.status = 'success';
      })
      await this.getToDoList();
    } catch (error) {
      runInAction(() => {
        this.status = 'error';
      })
    }
  }

  removeToDo = async (id: string) => {
    try {
      await this.toDoService.delete(id);
      runInAction(() => {
        this.status = 'success';
      })
      await this.getToDoList();
    } catch (error) {
      runInAction(() => {
        this.status = 'error';
      })
    }
  }
}
