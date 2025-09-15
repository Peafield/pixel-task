import Link from "next/link";
import ContentContainer from "@/components/Container";

export default function NotFound() {
  return (
    <ContentContainer>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">That doesn't seem to exist!</p>
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors inline-block"
          >
            Return Home
          </Link>
        </div>
      </div>
    </ContentContainer>
  );
}
