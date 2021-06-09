import { TasksModule } from "./infrastructure/rest/tasks/tasks.module";
import { AuthModule } from "./infrastructure/rest/users/auth/auth.module";
import { ProfileModule } from "./infrastructure/rest/users/profile/profile.module";

// TASKS APP MODULE
export const TASKS_APP = [
  TasksModule
]

// USERS APP MODULE
export const USERS_APP = [
  AuthModule,
  ProfileModule
]