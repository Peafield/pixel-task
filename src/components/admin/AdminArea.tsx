import Link from "next/link";
import { logoutAction } from "@/app/actions";
import ContentContainer from "../Container";

export default function AdminArea() {
  return (
    <ContentContainer>
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600 mt-1">Manage your personal tasks</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Public Tasks
          </Link>
          <form action={logoutAction} className="inline">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
    </ContentContainer>
  );
}
