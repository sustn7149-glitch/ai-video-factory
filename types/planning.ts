export interface TrendItem {
    id: string;
    keyword: string;
    source: 'Youtube' | 'Google Trends' | 'TikTok' | 'News';
    summary: string;
    volume: string; // e.g., "100K+"
    growth: number; // percentage
    related_hashtags: string[];
}

export interface ScriptDraft {
    id: string;
    title: string;
    topic: string;
    target_audience: string;
    content: string; // The full script content
    status: 'draft' | 'reviewing' | 'approved';
    created_at: string;
}
