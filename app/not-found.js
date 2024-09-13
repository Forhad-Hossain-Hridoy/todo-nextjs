import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div>
        <div className="mb-10">
          <h2 className="text-3xl">404 | Not Found</h2>
          <p>Could not find requested resource</p>
        </div>
        <Link className="border px-5 py-1 rounded font-semibold text-[14px]" href="/">Return Home</Link>
      </div>
    </div>
  );
}
