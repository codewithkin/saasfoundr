'use client';

import { CookingPot } from "lucide-react";

export function ComingSoon() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <CookingPot className="w-16 h-16 text-blue-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">We're still cooking</h1>
      <p className="text-muted-foreground">
        We&apos;re working hard to bring you something amazing! Stay tuned
      </p>
    </div>
  );
}
