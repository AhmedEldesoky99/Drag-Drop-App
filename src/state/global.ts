import { Status, TListenerFn, TProject } from "../interfaces/project";

class GlobalState {
  private projects: any[] = [];
  private listeners: TListenerFn[] = [];
  private static instance: GlobalState;
  private constructor() {}

  addProject(project: TProject) {
    this.projects.push({ ...project, id: Date.now(), type: "todo" });
    this.updateUi();
  }
  moveProject(projectId: number, newStatus: Status) {
    const foundedProject: TProject = this.projects.find(
      (item) => item.id === projectId
    );

    if (foundedProject && newStatus !== foundedProject.status) {
      foundedProject.status = newStatus;
      this.updateUi();
    }
  }
  addListener(fn: TListenerFn) {
    this.listeners.push(fn);
  }
  updateUi() {
    for (let listener of this.listeners) {
      listener(this.projects.slice());
    }
  }
  static createInstance() {
    if (!this.instance) {
      this.instance = new GlobalState();
    }
    return this.instance;
  }
}

export const state = GlobalState.createInstance();
