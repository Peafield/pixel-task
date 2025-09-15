import type { Task } from "@/types/graphql";

type TaskCardProps = {
  task: Task;
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-800 border-green-200";
    case "OFFER_ACCEPTED":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
};

const getTypeColor = (type?: string) => {
  switch (type) {
    case "EXPRESS":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
      <header className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
          {task.title}
        </h3>
        <div className="flex gap-1 ml-2">
          {task.is_remote && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
              Remote
            </span>
          )}
        </div>
      </header>

      {task.description && (
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {task.description}
        </p>
      )}

      <div className="space-y-2 mb-4">
        {task.type && (
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${getTypeColor(task.type)}`}
            >
              {task.type.replace("_", " ")}
            </span>
          </div>
        )}

        {task.time_left && (
          <div className="text-sm text-orange-600 font-medium flex items-center gap-1">
            <span>⏰</span>
            <span>{task.time_left}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}
        >
          {task.status?.replace("_", " ") || "NEW"}
        </span>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          {task.number_of_offers !== undefined && (
            <span className="flex items-center gap-1">
              <span>💼</span>
              <span>{task.number_of_offers}</span>
            </span>
          )}
          {task.number_of_likes !== undefined && (
            <span className="flex items-center gap-1">
              <span>❤️</span>
              <span>{task.number_of_likes}</span>
            </span>
          )}
        </div>
      </div>

      {(task.human_friendly_end_date || task.createdAt) && (
        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400 space-y-1">
          {task.human_friendly_end_date && (
            <div>Ends: {task.human_friendly_end_date}</div>
          )}
          {task.createdAt && (
            <div>Created: {new Date(task.createdAt).toLocaleDateString()}</div>
          )}
        </div>
      )}
    </div>
  );
}
