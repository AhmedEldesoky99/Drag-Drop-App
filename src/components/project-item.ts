import { autoBind } from "../decorators/autobind.js";
import { Draggable } from "../interfaces/drag-drop.js";
import { TProject } from "../interfaces/project.js";
import { Component } from "./base-component.js";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  project: TProject;

  get person() {
    return `${+this.project.people} Person${
      +this.project.people > 1 ? "s" : ""
    } assigned`;
  }

  constructor(hostId: string, project: TProject) {
    super("single-project", hostId, project.id + "", false);
    this.project = { ...project };
    this.renderContent();
    this.configure();
  }

  @autoBind
  onDragStartHandler(event: DragEvent): void {
    console.log("drag start");
    event.dataTransfer!.setData("text/plain", this.project.id + "");
    event.dataTransfer!.effectAllowed = "move";
  }
  onDragEndHandler(_: DragEvent): void {
    console.log("drag end", this.project);
  }
  renderContent() {
    this.actualElement.querySelector("h2")!.textContent = this.project.title;
    this.actualElement.querySelector("h3")!.textContent = this.person;
    this.actualElement.querySelector("p")!.textContent =
      this.project.description;
  }
  configure() {
    this.actualElement.addEventListener("dragstart", this.onDragStartHandler);
    this.actualElement.addEventListener("dragend", this.onDragEndHandler);
  }
}
