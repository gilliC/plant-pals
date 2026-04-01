import { Badge } from "@/components/ui/badge"
const MOCKED_CATEGORIES = ['All', 'Succulents', 'For Beginners', 'Advanced', 'Shadow Lovers']

const badgeUnselected = "h-auto rounded-2xl border-[#2c3a2e] bg-[#1e241e] px-4 py-1.5 text-sm text-[#94a296]"
const badgeSelected = "h-auto rounded-2xl border-[#2c3a2e] bg-[#345A3E] px-4 py-1.5 text-sm text-[#A8DAB0]"
export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-6xl font-extrabold">Every Plant</h1>
      <h1 className="text-6xl font-extrabold text-primary">needs a friend.</h1>
      <div className="flex flex-wrap gap-2 mt-4">
        {MOCKED_CATEGORIES.map((category) => (
          <Badge key={category} variant="outline" className={category === 'All' ? badgeSelected : badgeUnselected}>{category}</Badge>
        ))}
      </div>
    </div>
  );
}
