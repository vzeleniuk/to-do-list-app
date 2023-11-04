import { makeObservable, observable } from 'mobx';

export class ToDo {
  id: string;
  name: string;
  checked: boolean;

  constructor(name?: string, id?: string, checked?: boolean) {
    makeObservable(this, {
        name: observable,
        checked: observable,
    })
    this.name = name ?? "";
    this.id = id ?? Math.random().toString();
    this.checked = checked ?? false;
  }
}
