export enum Status {
  Todo,
  Done,
}

export type TProject = {
  id?: number;
  title: string;
  description: string;
  people: string;
  status: Status;
};

export type TListenerFn = (list: TProject[]) => void;
