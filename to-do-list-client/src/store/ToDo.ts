import { action, makeObservable, observable } from 'mobx';

export class ToDo {
  id: string;
  name: string;
  checked: boolean;

  constructor(name?: string, id?: string, checked?: boolean) {
    makeObservable(this, {
        name: observable,
        checked: observable,
        toggle: action,
        update: action,
    })
    this.name = name ?? "";
    this.id = id ?? Math.random().toString();
    this.checked = checked ?? false;
  }

  toggle() {
    this.checked = !this.checked
  }

  update(name: string) {
    this.name = name
  }
}
