import { notFound } from "next/navigation";
import { Suspense } from "react";
import ErrorWidget from "@/components/ErrorWidget";
import Loading from "@/components/Loading";
import Navigation from "@/components/Navigation";
import TaskList from "@/components/taskList/TaskList";
import { getTaskList } from "@/lib/queries";
import { isValidTaskStatus } from "@/types/graphql";

async function StatusTasksContent({ status }: { status: string }) {
  const { tasks, error } = await getTaskList(status);
  const filteredTasks = tasks.filter((task) => task.status === status);

  if (error) {
    return <ErrorWidget error={error} />;
  }

  return <TaskList tasks={filteredTasks} />;
}

export default async function StatusPage({
  params,
}: {
  params: Promise<{ status: string }>;
}) {
  const { status } = await params;

  const statusUpperCase = status.toUpperCase();

  if (!isValidTaskStatus(statusUpperCase)) {
    notFound();
  }

  const statusDisplayName = status.replace("_", " ");

  return (
    <Suspense fallback={<Loading />}>
      <Navigation
        title={`${statusDisplayName} Tasks`}
        subtitle={`All tasks with ${status} status`}
        link={{ href: "/", title: "← All Tasks" }}
        isAdminArea={false}
      />
      <StatusTasksContent status={statusUpperCase} />
    </Suspense>
  );
}
