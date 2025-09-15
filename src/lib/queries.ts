import type {
  Task,
  TaskListResponse,
  UserTasksResponse,
} from "@/types/graphql";
import { graphqlFetch } from "./graphql";

// Props can be expanded to include additional parameters if needed
export async function getTaskList(status?: string): Promise<{
  tasks: Task[];
  error?: string;
}> {
  const query = `
    query TaskListQuery($filter: FilterFindManyTaskInput) {
      taskList(filter: $filter) {
        title
        is_active
        type
        end_date
        is_remote
        description
        number_of_offers
        number_of_likes
        _id
        updatedAt
        createdAt
        time_left
        human_friendly_end_date
        start_date
        status
      }
    }
  `;

  const variables = status ? { filter: { status } } : {};

  try {
    const result = await graphqlFetch<TaskListResponse>(query, variables);

    if (result.errors && result.errors.length > 0) {
      console.error("GraphQL errors:", result.errors);
      return {
        tasks: [],
        error: `GraphQL error: ${result.errors[0].message}`,
      };
    }

    if (!result.data || !result.data.taskList) {
      return {
        tasks: [],
        error: "No task data received",
      };
    }

    return {
      tasks: result.data.taskList,
    };
  } catch (error) {
    console.error("Error fetching task list:", error);
    return {
      tasks: [],
      error: error instanceof Error ? error.message : "Failed to fetch tasks",
    };
  }
}

export async function getUserTasks(
  token: string,
  userId: string,
): Promise<{
  tasks: Task[];
  error?: string;
}> {
  const query = `
    query GetUserTasks($userId: ID) {
      getUserTasks(user_id: $userId) {
        title
        is_active
        type
        end_date
        is_remote
        description
        number_of_offers
        number_of_likes
        _id
        updatedAt
        createdAt
        time_left
        human_friendly_end_date
        start_date
        status
      }
    }
  `;

  try {
    const result = await graphqlFetch<UserTasksResponse>(
      query,
      { userId },
      token,
    );

    if (result.errors && result.errors.length > 0) {
      console.error("GraphQL errors:", result.errors);

      const authError = result.errors.find(
        (error) =>
          error.message.toLowerCase().includes("unauthorized") ||
          error.message.toLowerCase().includes("authentication") ||
          error.message.toLowerCase().includes("token"),
      );

      if (authError) {
        return {
          tasks: [],
          error: "Authentication failed. Please log in again.",
        };
      }

      return {
        tasks: [],
        error: `GraphQL error: ${result.errors[0].message}`,
      };
    }

    if (!result.data || !result.data.getUserTasks) {
      return {
        tasks: [],
        error: "No user task data received",
      };
    }

    return {
      tasks: result.data.getUserTasks,
    };
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    return {
      tasks: [],
      error:
        error instanceof Error ? error.message : "Failed to fetch user tasks",
    };
  }
}
