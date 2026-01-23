import React from "react";
import { Loader2 } from "lucide-react";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center animate-bounce-small">
        <Loader2 className="w-10 h-10 text-orange-600 animate-spin mb-3" />
        <p className="text-gray-800 font-bold text-lg">Processing...</p>
        <p className="text-gray-500 text-sm">Please wait a moment</p>
      </div>
    </div>
  );
}
