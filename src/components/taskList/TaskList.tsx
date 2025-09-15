"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Task } from "@/types/graphql";
import ContentContainer from "../Container";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const pathname = usePathname();
  const isStatusPage = pathname.includes("/status");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedTasks = [...tasks].sort((a, b) => {
    const statusA = a.status || "NEW";
    const statusB = b.status || "NEW";

    if (sortOrder === "asc") {
      return statusA.localeCompare(statusB);
    }
    return statusB.localeCompare(statusA);
  });

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="text-gray-500 text-lg">No tasks found</div>
        <p className="text-gray-400 mt-2">Check back later for new tasks!</p>
      </div>
    );
  }

  return (
    <ContentContainer>
      <div className="mb-6 flex flex-col gap-4 flex-wrap">
        {!isStatusPage && (
          <div>
            <label
              htmlFor="sort-order"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Sort by Status:
            </label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        )}

        <div className="mb-6 flex gap-2 flex-wrap">
          <Link
            href="/status/new"
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            New
          </Link>
          <Link
            href="/status/completed"
            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
          >
            Completed
          </Link>
          <Link
            href="/status/offer_accepted"
            className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition-colors"
          >
            Offer Accepted
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>
    </ContentContainer>
  );
}
