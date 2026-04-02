import { Badge } from "./badge";

type Variant = "success" | "error" | "warning";
const variantsColor: Record<Variant, string> = {
    success: "var(--primary)",
    error: "var(--error)",
    warning: "var(--warning)",
}

interface ChipProps {
    text: string;
    variant: Variant;
}
export const Chip = ({ text, variant }: ChipProps) => {
    const color = variantsColor[variant];
    console.log("Rendering Chip with variant:", variant, "and color:", color);
    return <Badge className="border-1 bg-primary-dark p-4  gap-2" style={{
        borderColor: color,
        color: color,
    }}>
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        {text}
    </Badge>
}