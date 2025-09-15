export type EnumTaskType = "EXPRESS" | "STANDARD";
export type EnumTaskStatus = "NEW" | "COMPLETED" | "OFFER_ACCEPTED";

export const VALID_TASK_STATUSES: EnumTaskStatus[] = [
  "NEW",
  "COMPLETED",
  "OFFER_ACCEPTED",
];

export function isValidTaskStatus(status: string): status is EnumTaskStatus {
  return VALID_TASK_STATUSES.includes(status as EnumTaskStatus);
}

export interface User {
  _id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  token: string;
  is_email_verified?: boolean;
  is_active?: boolean;
}

export interface Permission {
  title: string;
  code: string;
  _id: string;
}

export interface LoginData {
  user: User;
  permissions: Permission[];
  isSuperAdmin: boolean;
  unReadMessages: number;
}

export interface Task {
  _id: string;
  title: string;
  is_active?: boolean;
  type?: EnumTaskType;
  start_date?: string;
  end_date?: string;
  is_remote?: boolean;
  status?: EnumTaskStatus;
  description?: string;
  number_of_offers?: number;
  number_of_likes?: number;
  updatedAt?: string;
  createdAt?: string;
  time_left?: string;
  human_friendly_end_date?: string;
}

export interface TaskListResponse {
  data: {
    taskList: Task[];
  };
  errors?: GraphQLError[];
}

export interface LoginResponse {
  data: {
    login: LoginData;
  };
  errors?: GraphQLError[];
}

export interface UserTasksResponse {
  data: {
    getUserTasks: Task[];
  };
  errors?: GraphQLError[];
}

export interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
}
