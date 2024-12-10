import type { UploadedBy, Image, ImageResult } from "./unsplash.model"
import { v4 as uuidv4 } from 'uuid';

export const createMockUploadedBy = (overrides: Partial<UploadedBy> = {}): UploadedBy => ({
    first_name: 'John',
    last_name: 'Doe',
    id: 'user-123',
    username: 'johndoe',
    profile_image: {
        large: 'https://example.com/large-profile.jpg',
        medium: 'https://example.com/medium-profile.jpg',
        small: 'https://example.com/small-profile.jpg',
        ...overrides.profile_image
    },
    ...overrides
})

export const createMockImage = (overrides: Partial<Image> = {}): Image => ({
    id: uuidv4(),
    slug: 'example-image',
    width: 1920,
    height: 1080,
    color: '#000000',
    description: 'A sample image',
    alt_description: 'Example alt text',
    likes: 100,
    urls: {
        full: 'https://example.com/full-image.jpg',
        raw: 'https://example.com/raw-image.jpg',
        regular: 'https://example.com/regular-image.jpg',
        small: 'https://example.com/small-image.jpg',
        small_s3: 'https://example.com/small-s3-image.jpg',
        thumb: 'https://example.com/thumb-image.jpg',
        ...overrides.urls
    },
    user: createMockUploadedBy(overrides.user),
    ...overrides
})

export const createMockImageResult = (
    imageCount = 3,
    overrides: Partial<ImageResult> = {}
): ImageResult => ({
    total: imageCount,
    total_pages: Math.ceil(imageCount / 10),
    results: Array.from({ length: imageCount }, () => createMockImage({})),
    ...overrides
})