export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templeteElement: HTMLTemplateElement;
  hostElement: T;
  actualElement: U;

  constructor(
    templeteId: string,
    hostId: string,
    actualElementId?: string,
    insertInBegan?: boolean
  ) {
    //select form template
    this.templeteElement = document.getElementById(
      templeteId
    ) as HTMLTemplateElement;
    //select root element
    this.hostElement = document.getElementById(hostId) as T;

    //select actual form and attach id to it
    const importedNode = document.importNode(
      this.templeteElement.content,
      true
    );
    this.actualElement = importedNode.firstElementChild as U;
    if (actualElementId) {
      this.actualElement.id = actualElementId;
    }

    this.attach(insertInBegan);
  }
  private attach(insertInBegan?: boolean) {
    this.hostElement.insertAdjacentElement(
      insertInBegan ? "afterbegin" : "beforeend",
      this.actualElement
    );
  }
  abstract configure?(): void;
  abstract renderContent(): void;
}
