"use server";

import { ImageResult } from "@/lib/unsplash/unsplash.model";
import { get } from "@/lib/fetch";


export async function getImages(page = 1, query = "Manchester"): Promise<ImageResult> {
    try {
        return get<ImageResult>(`/search/photos?query=${query}&page=${page}&per_page=16`, {
            options: {
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
                },
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}