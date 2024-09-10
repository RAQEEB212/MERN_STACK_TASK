// app/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Welcome to the File Uploader!</h1>
                <button
                    onClick={() => router.push("/upload")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Go to Upload Page
                </button>
            </div>
        </div>
    );
}
