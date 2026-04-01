"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { PlantsGrid } from "./home/plantsGrid/plantsGrid";

const badgeUnselected =
  "rounded-2xl border-badge-border bg-badge text-badge-foreground";
const badgeSelected =
  "rounded-2xl border-badge-border bg-badge-active text-badge-active-foreground";

export default function Home() {
  const { data: categories, isLoading } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8080/categories");
      return res.json();
    },
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="p-10">
      <h1 className="text-6xl font-extrabold">Every Plant</h1>
      <h1 className="text-6xl font-extrabold text-primary mt-2">
        needs a friend.
      </h1>
      <div className="flex flex-wrap gap-2 mt-4">
        {isLoading && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-2xl" />
            ))}
          </>
        )}
        {categories?.map((category) => (
          <Button
            key={category}
            variant={null}
            size='lg'
            className={
              category === selectedCategory ? badgeSelected : badgeUnselected
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <PlantsGrid />
    </div>
  );
}
