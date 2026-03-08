"use client";

import { MediaGrid } from "@/components/media-grid";
import { pagesContent } from "@/content/pages";

export function GlobalGallery() {
    const gallery = pagesContent.home.globalGallery;

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <MediaGrid
                title={gallery.title}
                intro={gallery.intro}
                images={gallery.images}
            />
        </div>
    );
}
