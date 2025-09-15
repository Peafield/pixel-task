import { Suspense } from "react";
import ErrorWidget from "@/components/ErrorWidget";
import Loading from "@/components/Loading";
import Navigation from "@/components/Navigation";
import TaskList from "@/components/taskList/TaskList";
import { getTaskList } from "@/lib/queries";

async function TasksContent() {
  const { tasks, error } = await getTaskList();

  if (error) {
    return <ErrorWidget error={error} />;
  }

  return <TaskList tasks={tasks} />;
}

export default async function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Navigation
        title="Public Tasks"
        subtitle="Browse available tasks from the community"
        link={{ href: "/admin", title: "My Tasks" }}
        isAdminArea={false}
      />
      <TasksContent />
    </Suspense>
  );
}
