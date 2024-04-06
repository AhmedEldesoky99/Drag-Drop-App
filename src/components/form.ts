import { autoBind } from "../decorators/autobind.js";
import { Status } from "../interfaces/project.js";
import { state } from "../state/global.js";
import { Component } from "./base-component.js";

export class RenderForm extends Component<HTMLDivElement, HTMLFormElement> {
  formInputs: HTMLInputElement[] = [];

  constructor() {
    super("project-input", "app", "user-input", true);
    //select inputs
    this.formInputs.push(
      this.actualElement.querySelector("#title") as HTMLInputElement
    );
    this.formInputs.push(
      this.actualElement.querySelector("#description") as HTMLInputElement
    );
    this.formInputs.push(
      this.actualElement.querySelector("#people") as HTMLInputElement
    );

    this.configure();
  }

  renderContent() {}
  configure() {
    this.actualElement.addEventListener("submit", this.submitHandler);
  }

  @autoBind
  private submitHandler(e: Event) {
    e.preventDefault();

    const [title, desc, people] = this.gatheringInputsValues();

    if (title.trim().length > 0 && desc.trim().length > 0 && +people > 0) {
      //some logic
      state.addProject({
        title,
        description: desc,
        people,
        status: Status.Todo,
      });
      //empty inputs
      this.clearInputsValues();
    } else {
      alert("please fill all inputs");
    }
  }

  private clearInputsValues() {
    this.formInputs.forEach((input) => {
      input.value = "";
    });
  }

  private gatheringInputsValues(): string[] {
    return this.formInputs.map((input) => input.value.trim());
  }
}
