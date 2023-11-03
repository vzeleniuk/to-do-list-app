import { makeObservable, observable, action } from "mobx"

export class ToDo {
  id = Math.random().toString()
  name = ""
  checked = false

  constructor(name?: string) {
    makeObservable(this, {
        name: observable,
        checked: observable,
        toggle: action,
        update: action,
    })
    this.name = name ?? ""
  }

  toggle() {
    this.checked = !this.checked
  }

  update(name: string) {
    this.name = name
  }
}
