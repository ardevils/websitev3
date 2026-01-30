
export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    thumbnail: string;
    media: string;
    videoUrl?: string;
    gallery?: string[];
    conceptGallery?: string[];
    finalGallery?: string[];
    tools: string[];
    featured?: boolean;
}
