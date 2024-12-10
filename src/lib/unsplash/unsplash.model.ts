export interface UploadedBy {
    first_name: string;
    id: string;
    last_name: string;
    profile_image: {
        large: string;
        medium: string;
        small: string;
    };
    username: string;
}

export interface Image {
    id: string;
    slug: string;
    width: number;
    height: number;
    color: string;
    description?: string;
    likes: number;
    alt_description?: string;
    urls: {
        full: string;
        raw: string;
        regular: string;
        small: string;
        small_s3: string;
        thumb: string;
    };
    user: UploadedBy;
}

export interface ImageResult {
    total: number;
    total_pages: number;
    results: Image[];
}