export interface Draggable {
  onDragStartHandler(event: DragEvent): void;
  onDragEndHandler(event: DragEvent): void;
}
export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dragHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
