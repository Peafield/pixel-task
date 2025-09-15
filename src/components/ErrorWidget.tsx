"use client";

import Link from "next/link";
import ContentContainer from "./Container";

type ErrorWidgetProps = {
  error: string;
};

export default function ErrorWidget({ error }: ErrorWidgetProps) {
  return (
    <ContentContainer>
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <h3 className="font-semibold mb-2">Error Loading Tasks</h3>
        <p>{error}</p>
        <Link
          href={"/"}
          className="mt-3 bg-red-100 hover:bg-red-200 px-4 py-2 rounded text-sm transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </ContentContainer>
  );
}
