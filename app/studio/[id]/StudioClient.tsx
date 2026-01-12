"use client";

import { useState } from "react";
import Link from "next/link";

interface StudioClientProps {
    id: string;
}

export default function StudioClient({ id }: StudioClientProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <div className="text-center p-8 border rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Video Studio</h1>
                <p className="mb-4">Project ID: {id}</p>
                <div className="w-10 h-10 bg-blue-500 rounded-full mx-auto animate-pulse"></div>
                <p className="mt-4 text-sm text-gray-500">Loading editor environment...</p>
                <Link href="/production" className="block mt-6 text-blue-600 hover:underline">
                    Back to List
                </Link>
            </div>
        </div>
    );
}
