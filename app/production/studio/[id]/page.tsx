"use client";

import { use } from "react";

export default function VideoStudioPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Studio Loaded!</h1>
                <p>Project ID: {id}</p>
            </div>
        </div>
    );
}
