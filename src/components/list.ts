import { autoBind } from "../decorators/autobind.js";
import { DragTarget } from "../interfaces/drag-drop.js";
import { Status, TProject } from "../interfaces/project.js";
import { state } from "../state/global.js";
import { Component } from "./base-component.js";
import { ProjectItem } from "./project-item.js";

export class RenderList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  projectsList: TProject[] = [];

  constructor(private type: "finished" | "active") {
    super("project-list", "app", `${type}-projects`, false);

    //add listener to state
    state.addListener((projects: TProject[]) => {
      this.projectsList = projects.filter((project) => {
        if (this.type === "active") {
          return project.status === Status.Todo;
        }
        return project.status === Status.Done;
      });
      this.renderContent();
    });

    this.configure();
  }

  @autoBind
  dragOverHandler(e: DragEvent): void {
    if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
      e.preventDefault();
      const list = this.actualElement.querySelector("ul");
      list?.classList.add("droppable");
    }
  }
  @autoBind
  dragHandler(e: DragEvent): void {
    console.log("drop");
    const id = e.dataTransfer?.getData("text/plain");
    if (id)
      state.moveProject(
        +id,
        this.type === "active" ? Status.Todo : Status.Done
      );
  }
  @autoBind
  dragLeaveHandler(_: DragEvent): void {
    console.log("dragleave");
    const list = this.actualElement.querySelector("ul");
    list?.classList.remove("droppable");
  }

  configure() {
    this.actualElement.addEventListener("dragover", this.dragOverHandler);
    this.actualElement.addEventListener("dragleave", this.dragLeaveHandler);
    this.actualElement.addEventListener("drop", this.dragHandler);

    const listId = `${this.type}-projects-list`;
    this.actualElement.querySelector("ul")!.id = listId;
    this.actualElement.querySelector("h2")!.textContent =
      this.type.toUpperCase();
  }

  renderContent() {
    let listUl = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;
    listUl!.innerHTML = "";
    for (let project of this.projectsList) {
      new ProjectItem(listUl.id, project);
    }
  }
}
