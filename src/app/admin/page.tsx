import { redirect } from "next/navigation";
import { Suspense } from "react";
import ErrorWidget from "@/components/ErrorWidget";
import Loading from "@/components/Loading";
import Navigation from "@/components/Navigation";
import TaskList from "@/components/taskList/TaskList";
import { getAuthToken, getUserId, isAuthenticated } from "@/lib/auth";
import { getUserTasks } from "@/lib/queries";

async function UserTasksContent({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) {
  const { tasks, error } = await getUserTasks(token, userId);

  if (error) {
    return <ErrorWidget error={error} />;
  }

  return <TaskList tasks={tasks} />;
}

export default async function AdminPage() {
  if (!isAuthenticated()) {
    redirect("/login");
  }

  const token = await getAuthToken();
  const userId = await getUserId();

  if (!token || !userId) {
    redirect("/login");
  }

  return (
    <Suspense fallback={<Loading />}>
      <Navigation
        title="My Tasks"
        subtitle="Manage your personal tasks"
        link={{ href: "/", title: "Public Tasks" }}
        isAdminArea={true}
      />
      <UserTasksContent token={token} userId={userId} />
    </Suspense>
  );
}
