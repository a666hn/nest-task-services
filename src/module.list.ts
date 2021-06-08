import { TasksModule } from "./infrastructure/rest/tasks/tasks.module";
import { UsersModule } from "./infrastructure/rest/users/users.module";

// TASKS APP MODULE
export const TASKS_APP = [
  TasksModule
]

// USERS APP MODULE
export const USERS_APP = [
  UsersModule
]