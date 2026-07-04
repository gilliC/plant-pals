"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { PlantsGrid } from "./home/plantsGrid/PlantsGrid";
import { useGetCategories } from "@/hooks/useGetCategories";

const badgeUnselected =
  "rounded-2xl border-badge-border bg-badge text-badge-foreground";
const badgeSelected =
  "rounded-2xl border-badge-border bg-badge-active text-badge-active-foreground";

export default function Home() {
  const { categories, isLoading } = useGetCategories();
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
        <Button
          key="All"
          variant={null}
          size='lg'
          className={
            selectedCategory === "All" ? badgeSelected : badgeUnselected
          }
          onClick={() => setSelectedCategory("All")}
        >
          All
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.id}
            variant={null}
            size='lg'
            className={
              category.name === selectedCategory ? badgeSelected : badgeUnselected
            }
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <PlantsGrid selectedCategory={selectedCategory} />
    </div>
  );
}
