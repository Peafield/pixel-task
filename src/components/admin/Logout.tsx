import { logoutAction } from "@/app/actions";

export default function Logout() {
  return (
    <form action={logoutAction} className="inline">
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Logout
      </button>
    </form>
  );
}
