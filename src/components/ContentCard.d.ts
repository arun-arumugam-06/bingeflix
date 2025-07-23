interface Content {
    id: string;
    title: string;
    description: string;
    type: string;
    poster_url: string;
    duration?: number;
    rating?: number;
    language: string;
    age_rating: string;
    is_premium: boolean;
    is_trending: boolean;
}
interface ContentCardProps {
    content: Content;
    size?: 'small' | 'medium' | 'large';
    showDetails?: boolean;
}
export declare const ContentCard: ({ content, size, showDetails }: ContentCardProps) => import("react/jsx-runtime").JSX.Element;
export default ContentCard;
