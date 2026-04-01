import { useQuery } from "@tanstack/react-query";
interface Plant {
    id: number;
    name: string;
    category: string;
    shortDescription: string;
    description: string;
    imageUrl: string;
}

export const PlantsGrid = () => {
    const { data: plants, isLoading } = useQuery<Plant[]>({
        queryKey: ["plants"],
        queryFn: async () => {
            const res = await fetch("http://localhost:8080/plants");
            return res.json();
        },
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="grid grid-cols-3 gap-4 mt-8">
            {plants?.map((plant) => (
                <div key={plant.id} className="border p-4 rounded">
                    <h2 className="text-lg font-bold">{plant.name}</h2>
                    <p className="text-sm text-gray-600">{plant.shortDescription}</p>
                    <img src={plant.imageUrl} alt={plant.name} className="mt-2 w-full h-48 object-cover rounded" />
                </div>
            ))}
        </div>
    );
} 