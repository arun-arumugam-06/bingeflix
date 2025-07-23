export type Json = string | number | boolean | null | {
    [key: string]: Json | undefined;
} | Json[];
export type Database = {
    __InternalSupabase: {
        PostgrestVersion: "12.2.3 (519615d)";
    };
    public: {
        Tables: {
            cart: {
                Row: {
                    created_at: string;
                    id: string;
                    product_id: string;
                    quantity: number;
                    updated_at: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    product_id: string;
                    quantity?: number;
                    updated_at?: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    product_id?: string;
                    quantity?: number;
                    updated_at?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "cart_product_id_fkey";
                        columns: ["product_id"];
                        isOneToOne: false;
                        referencedRelation: "products";
                        referencedColumns: ["id"];
                    }
                ];
            };
            categories: {
                Row: {
                    created_at: string;
                    description: string | null;
                    id: string;
                    name: string;
                    parent_id: string | null;
                    slug: string;
                    updated_at: string;
                };
                Insert: {
                    created_at?: string;
                    description?: string | null;
                    id?: string;
                    name: string;
                    parent_id?: string | null;
                    slug: string;
                    updated_at?: string;
                };
                Update: {
                    created_at?: string;
                    description?: string | null;
                    id?: string;
                    name?: string;
                    parent_id?: string | null;
                    slug?: string;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "categories_parent_id_fkey";
                        columns: ["parent_id"];
                        isOneToOne: false;
                        referencedRelation: "categories";
                        referencedColumns: ["id"];
                    }
                ];
            };
            content: {
                Row: {
                    age_rating: string | null;
                    audio_tracks: string[] | null;
                    backdrop_url: string | null;
                    category_id: string | null;
                    created_at: string;
                    description: string | null;
                    duration: number | null;
                    id: string;
                    is_premium: boolean | null;
                    is_trending: boolean | null;
                    language: string | null;
                    poster_url: string | null;
                    rating: number | null;
                    release_date: string | null;
                    subtitles: string[] | null;
                    title: string;
                    trailer_url: string | null;
                    type: string;
                    updated_at: string;
                    video_url: string | null;
                    view_count: number | null;
                };
                Insert: {
                    age_rating?: string | null;
                    audio_tracks?: string[] | null;
                    backdrop_url?: string | null;
                    category_id?: string | null;
                    created_at?: string;
                    description?: string | null;
                    duration?: number | null;
                    id?: string;
                    is_premium?: boolean | null;
                    is_trending?: boolean | null;
                    language?: string | null;
                    poster_url?: string | null;
                    rating?: number | null;
                    release_date?: string | null;
                    subtitles?: string[] | null;
                    title: string;
                    trailer_url?: string | null;
                    type: string;
                    updated_at?: string;
                    video_url?: string | null;
                    view_count?: number | null;
                };
                Update: {
                    age_rating?: string | null;
                    audio_tracks?: string[] | null;
                    backdrop_url?: string | null;
                    category_id?: string | null;
                    created_at?: string;
                    description?: string | null;
                    duration?: number | null;
                    id?: string;
                    is_premium?: boolean | null;
                    is_trending?: boolean | null;
                    language?: string | null;
                    poster_url?: string | null;
                    rating?: number | null;
                    release_date?: string | null;
                    subtitles?: string[] | null;
                    title?: string;
                    trailer_url?: string | null;
                    type?: string;
                    updated_at?: string;
                    video_url?: string | null;
                    view_count?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "content_category_id_fkey";
                        columns: ["category_id"];
                        isOneToOne: false;
                        referencedRelation: "content_categories";
                        referencedColumns: ["id"];
                    }
                ];
            };
            content_categories: {
                Row: {
                    created_at: string;
                    description: string | null;
                    id: string;
                    name: string;
                    slug: string;
                    updated_at: string;
                };
                Insert: {
                    created_at?: string;
                    description?: string | null;
                    id?: string;
                    name: string;
                    slug: string;
                    updated_at?: string;
                };
                Update: {
                    created_at?: string;
                    description?: string | null;
                    id?: string;
                    name?: string;
                    slug?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            live_channels: {
                Row: {
                    category: string | null;
                    created_at: string;
                    id: string;
                    is_active: boolean | null;
                    logo_url: string | null;
                    name: string;
                    stream_url: string | null;
                };
                Insert: {
                    category?: string | null;
                    created_at?: string;
                    id?: string;
                    is_active?: boolean | null;
                    logo_url?: string | null;
                    name: string;
                    stream_url?: string | null;
                };
                Update: {
                    category?: string | null;
                    created_at?: string;
                    id?: string;
                    is_active?: boolean | null;
                    logo_url?: string | null;
                    name?: string;
                    stream_url?: string | null;
                };
                Relationships: [];
            };
            orders: {
                Row: {
                    created_at: string;
                    id: string;
                    shipping_address: Json | null;
                    status: string;
                    total_amount: number;
                    updated_at: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    id?: string;
                    shipping_address?: Json | null;
                    status?: string;
                    total_amount: number;
                    updated_at?: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    id?: string;
                    shipping_address?: Json | null;
                    status?: string;
                    total_amount?: number;
                    updated_at?: string;
                    user_id?: string;
                };
                Relationships: [];
            };
            products: {
                Row: {
                    category_id: string | null;
                    created_at: string;
                    description: string | null;
                    id: string;
                    image_url: string | null;
                    is_active: boolean;
                    name: string;
                    price: number;
                    rating: number | null;
                    review_count: number | null;
                    slug: string;
                    stock_quantity: number;
                    updated_at: string;
                };
                Insert: {
                    category_id?: string | null;
                    created_at?: string;
                    description?: string | null;
                    id?: string;
                    image_url?: string | null;
                    is_active?: boolean;
                    name: string;
                    price: number;
                    rating?: number | null;
                    review_count?: number | null;
                    slug: string;
                    stock_quantity?: number;
                    updated_at?: string;
                };
                Update: {
                    category_id?: string | null;
                    created_at?: string;
                    description?: string | null;
                    id?: string;
                    image_url?: string | null;
                    is_active?: boolean;
                    name?: string;
                    price?: number;
                    rating?: number | null;
                    review_count?: number | null;
                    slug?: string;
                    stock_quantity?: number;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "products_category_id_fkey";
                        columns: ["category_id"];
                        isOneToOne: false;
                        referencedRelation: "categories";
                        referencedColumns: ["id"];
                    }
                ];
            };
            profiles: {
                Row: {
                    created_at: string;
                    email: string | null;
                    first_name: string | null;
                    id: string;
                    last_name: string | null;
                    phone: string | null;
                    updated_at: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    email?: string | null;
                    first_name?: string | null;
                    id?: string;
                    last_name?: string | null;
                    phone?: string | null;
                    updated_at?: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    email?: string | null;
                    first_name?: string | null;
                    id?: string;
                    last_name?: string | null;
                    phone?: string | null;
                    updated_at?: string;
                    user_id?: string;
                };
                Relationships: [];
            };
            subscription_plans: {
                Row: {
                    created_at: string;
                    duration_months: number;
                    features: string[] | null;
                    id: string;
                    is_active: boolean | null;
                    name: string;
                    price: number;
                };
                Insert: {
                    created_at?: string;
                    duration_months: number;
                    features?: string[] | null;
                    id?: string;
                    is_active?: boolean | null;
                    name: string;
                    price: number;
                };
                Update: {
                    created_at?: string;
                    duration_months?: number;
                    features?: string[] | null;
                    id?: string;
                    is_active?: boolean | null;
                    name?: string;
                    price?: number;
                };
                Relationships: [];
            };
            user_profiles: {
                Row: {
                    avatar_url: string | null;
                    created_at: string;
                    id: string;
                    is_kid: boolean | null;
                    language_preference: string | null;
                    name: string;
                    updated_at: string;
                    user_id: string;
                };
                Insert: {
                    avatar_url?: string | null;
                    created_at?: string;
                    id?: string;
                    is_kid?: boolean | null;
                    language_preference?: string | null;
                    name: string;
                    updated_at?: string;
                    user_id: string;
                };
                Update: {
                    avatar_url?: string | null;
                    created_at?: string;
                    id?: string;
                    is_kid?: boolean | null;
                    language_preference?: string | null;
                    name?: string;
                    updated_at?: string;
                    user_id?: string;
                };
                Relationships: [];
            };
            user_subscriptions: {
                Row: {
                    created_at: string;
                    end_date: string;
                    id: string;
                    is_active: boolean | null;
                    plan_id: string | null;
                    start_date: string;
                    user_id: string;
                };
                Insert: {
                    created_at?: string;
                    end_date: string;
                    id?: string;
                    is_active?: boolean | null;
                    plan_id?: string | null;
                    start_date?: string;
                    user_id: string;
                };
                Update: {
                    created_at?: string;
                    end_date?: string;
                    id?: string;
                    is_active?: boolean | null;
                    plan_id?: string | null;
                    start_date?: string;
                    user_id?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "user_subscriptions_plan_id_fkey";
                        columns: ["plan_id"];
                        isOneToOne: false;
                        referencedRelation: "subscription_plans";
                        referencedColumns: ["id"];
                    }
                ];
            };
            watch_history: {
                Row: {
                    completed: boolean | null;
                    content_id: string | null;
                    id: string;
                    last_watched: string;
                    profile_id: string | null;
                    total_duration: number | null;
                    watch_time: number | null;
                };
                Insert: {
                    completed?: boolean | null;
                    content_id?: string | null;
                    id?: string;
                    last_watched?: string;
                    profile_id?: string | null;
                    total_duration?: number | null;
                    watch_time?: number | null;
                };
                Update: {
                    completed?: boolean | null;
                    content_id?: string | null;
                    id?: string;
                    last_watched?: string;
                    profile_id?: string | null;
                    total_duration?: number | null;
                    watch_time?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "watch_history_content_id_fkey";
                        columns: ["content_id"];
                        isOneToOne: false;
                        referencedRelation: "content";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "watch_history_profile_id_fkey";
                        columns: ["profile_id"];
                        isOneToOne: false;
                        referencedRelation: "user_profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
            watchlist: {
                Row: {
                    content_id: string | null;
                    created_at: string;
                    id: string;
                    profile_id: string | null;
                };
                Insert: {
                    content_id?: string | null;
                    created_at?: string;
                    id?: string;
                    profile_id?: string | null;
                };
                Update: {
                    content_id?: string | null;
                    created_at?: string;
                    id?: string;
                    profile_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "watchlist_content_id_fkey";
                        columns: ["content_id"];
                        isOneToOne: false;
                        referencedRelation: "content";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "watchlist_profile_id_fkey";
                        columns: ["profile_id"];
                        isOneToOne: false;
                        referencedRelation: "user_profiles";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];
export type Tables<DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]) | {
    schema: keyof DatabaseWithoutInternals;
}, TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
} ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] & DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"]) : never = never> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
} ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] & DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
    Row: infer R;
} ? R : never : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]) ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
    Row: infer R;
} ? R : never : never;
export type TablesInsert<DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | {
    schema: keyof DatabaseWithoutInternals;
}, TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
} ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] : never = never> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
} ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
} ? I : never : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I;
} ? I : never : never;
export type TablesUpdate<DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | {
    schema: keyof DatabaseWithoutInternals;
}, TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
} ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] : never = never> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
} ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
} ? U : never : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U;
} ? U : never : never;
export type Enums<DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | {
    schema: keyof DatabaseWithoutInternals;
}, EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
} ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"] : never = never> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
} ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName] : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions] : never;
export type CompositeTypes<PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | {
    schema: keyof DatabaseWithoutInternals;
}, CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
} ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"] : never = never> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
} ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName] : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions] : never;
export declare const Constants: {
    readonly public: {
        readonly Enums: {};
    };
};
export {};
