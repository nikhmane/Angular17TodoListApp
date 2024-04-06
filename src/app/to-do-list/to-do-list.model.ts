export interface Task {
  id?: any;
  name: string;
}

export interface TaskDetails {
  id?: any;
  name?: string;
  description?: string;
  completed?: boolean;
  completedPercent?: number;
}
