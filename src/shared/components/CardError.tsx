"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  desc: string;
  url: string;
}

export const CardError = ({ desc, title, url }: Props) => {
  const router = useRouter();

  return (
    <div className="container mx-auto flex flex-col h-screen justify-center items-center py-16 px-4">
      <div className="text-center">
        <p className="text-4xl font-bold text-muted-foreground mb-2">404</p>
        <p className="text-destructive font-medium text-lg">{title}</p>
        <p className="text-muted-foreground text-sm mt-1">{desc}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push(url)}
        >
          ← Back to list
        </Button>
      </div>
    </div>
  );
};
