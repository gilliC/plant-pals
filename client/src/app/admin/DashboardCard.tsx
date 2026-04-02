type Variants = 'listed' | 'adopted' | 'pending' | 'users';
const variantsConfig = {
    listed: {
        emoji: '🌿',
        border: 'var(--chart-3)',
        bg: 'var(--chart-4)'
    },
    adopted: {
        emoji: '✅',
        border: 'var(--success)',
        bg: 'var(--primary-dark)'
    },
    pending: {
        emoji: '⏳',
        border: 'var(--chart-5)',
        bg: 'var(--chart-6)'
    },
    users: {
        emoji: '👥',
        border: 'var(--chart-1)',
        bg: 'var(--chart-2)'

    },
}
interface DashboardCardProps {
    title: string;
    value: string;
    variant: Variants;
}
export const DashboardCard = ({ title, value, variant }: DashboardCardProps) => {
    const config = variantsConfig[variant];
    return (
        <div className="border-1 border-primary-darker  rounded-lg">
            <div className="p-4 rounded-lg shadow-sm border-t-2 border-primary" style={{ borderColor: config?.border, backgroundColor: config?.bg }}>
                <div className="text-2xl mb-2">{config?.emoji}</div>
                <p className="text-4xl font-bold">{value}</p>
                <h2 className="text-xs text-primary-foreground">{title}</h2>
            </div>
        </div>
    );
};