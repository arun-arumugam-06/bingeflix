interface HeroContent {
    id: string;
    title: string;
    description: string;
    backdrop_url: string;
    trailer_url?: string;
    rating?: number;
    language: string;
    age_rating: string;
    is_premium: boolean;
    type: string;
}
interface HeroBannerProps {
    content?: HeroContent;
}
export declare const HeroBanner: ({ content }: HeroBannerProps) => import("react/jsx-runtime").JSX.Element;
export default HeroBanner;
