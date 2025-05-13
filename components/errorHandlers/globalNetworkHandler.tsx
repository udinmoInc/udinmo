"use client";

import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useOnlineStatus } from "@/hooks/use-online-status";

export default function GlobalNetworkError() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <Card className="p-6 rounded-2xl bg-red-100 text-red-800 shadow-xl text-center space-y-3 w-[90%] max-w-sm">
        <div className="flex flex-col items-center">
          <AlertTriangle className="w-12 h-12 mb-2 text-red-600" />
          <h2 className="text-lg font-semibold">No Internet Connection</h2>
          <p className="text-sm text-red-700">
            Please check your network. We’ll reconnect automatically.
          </p>
        </div>
      </Card>
    </div>
  );
}
