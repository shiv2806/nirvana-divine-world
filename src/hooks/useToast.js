import { useState, useCallback } from "react";

// ============================================================
//  useToast  — Simple toast notification hook
//
//  Usage:
//    const { toast, showToast } = useToast();
//    showToast("Added to cart!");
//    // Render: <Toast message={toast} />
// ============================================================

export function useToast(duration = 2500) {
  const [toast, setToast] = useState("");

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(""), duration);
  }, [duration]);

  return { toast, showToast };
}
