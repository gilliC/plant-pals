import { Card, CardContent } from "@/components/ui/card";
import { Plant } from "@/lib/type";
import Link from "next/link";
import { TagsRow } from "./TagsRow";
import Image from "next/image";

const classNames = {
    card: "relative h-full min-h-[187px] min-w-[280px] shrink-0 rounded-[20px] border-0 bg-card p-0 shadow-[0px_8px_28px_-4px_rgba(0,0,0,0.2)]",
    backgroundCircle: "absolute right-0 top-0 h-[131px] w-[196px] rounded-full bg-[#345a3e] opacity-14 translate-x-[-30px] translate-y-[-18px]",
    CardContent: "relative flex h-full flex-col justify-between p-3.5",
    top: "flex items-start justify-between",
    category: "rounded-full border border-badge-border bg-[#161a16] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-[#94a296]",
    image: "h-30 w-30 absolute right-3 top-3 rounded-full object-cover",
    name: "text-[22px] font-bold text-[#f2eee4]",
    description: "text-[11px] leading-4 text-[#94a296]",
}

export const SmallCard = ({ plant }: { plant: Plant }) => {
    return (
        <Link href={`/plants/${plant.id}`} className="h-full">
            <Card className={classNames.card}>
                <div className={classNames.backgroundCircle} />
                <CardContent className={classNames.CardContent}>
                    <div className={classNames.top}>
                        <span className={classNames.category}>
                            {plant.category?.name}
                        </span>
                        <Image src={plant.photoUrl} alt={plant.name} className={classNames.image} width={240} height={240} />
                    </div>

                    <div className="mt-auto space-y-1">
                        <h3 className={classNames.name}>{plant.name}</h3>
                        <p className={classNames.description}>
                            {plant.shortDescription}
                        </p>
                    </div>
                    <TagsRow plant={plant} />
                </CardContent>
            </Card>
        </Link>
    );
}
