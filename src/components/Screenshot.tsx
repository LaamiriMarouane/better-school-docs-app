'use client';

import { useEffect, useState } from 'react';
import { ImageIcon, ZoomIn, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ScreenshotProps {
  /** Path to a real screenshot (e.g. `/docs/screenshots/create-level.png`). */
  src?: string;
  /** Accessible description / alt text. */
  alt?: string;
  /** Caption shown under the image. */
  caption?: string;
  /** Label shown inside the placeholder while no screenshot exists yet. */
  label?: string;
  /** Aspect ratio of the frame, e.g. "16/9" (default) or "4/3". */
  ratio?: string;
}

/**
 * A documentation screenshot with rounded borders.
 *
 * - When `src` is provided it renders the image.
 * - When `src` is omitted it renders a styled placeholder so the article
 *   structure is complete before real screenshots are captured.
 *
 * In both cases the figure is zoomable: clicking it opens a full-screen
 * lightbox. Press Escape or click the backdrop to close.
 */
export function Screenshot({
  src,
  alt = '',
  caption,
  label,
  ratio = '16/9',
}: ScreenshotProps) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [zoomed]);

  const placeholderLabel = label ?? alt ?? caption ?? 'Screenshot';

  return (
    <>
      <figure className="my-6 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label={alt || caption || 'Zoom image'}
          className={cn(
            'group relative block w-full overflow-hidden rounded-xl border border-fd-border',
            'bg-fd-card shadow-sm transition-shadow hover:shadow-md',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary',
          )}
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="block w-full"
              style={{ aspectRatio: ratio, objectFit: 'cover' }}
            />
          ) : (
            <div
              className="flex w-full flex-col items-center justify-center gap-2 bg-fd-muted/40 p-6 text-fd-muted-foreground"
              style={{ aspectRatio: ratio }}
            >
              <ImageIcon className="size-8 opacity-60" />
              <span className="text-center text-sm font-medium">
                {placeholderLabel}
              </span>
              <span className="text-xs opacity-70">
                Screenshot placeholder
              </span>
            </div>
          )}
          <span
            className={cn(
              'absolute end-2 top-2 flex items-center gap-1 rounded-md',
              'bg-black/55 px-2 py-1 text-xs text-white opacity-0',
              'transition-opacity group-hover:opacity-100',
            )}
          >
            <ZoomIn className="size-3.5" />
          </span>
        </button>
        {caption ? (
          <figcaption className="text-center text-sm text-fd-muted-foreground">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {zoomed ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute end-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setZoomed(false)}
          >
            <X className="size-5" />
          </button>
          <div
            className="max-h-[90vh] max-w-[92vw] overflow-auto rounded-xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={alt} className="block h-auto w-auto" />
            ) : (
              <div className="flex aspect-video w-[80vw] max-w-3xl flex-col items-center justify-center gap-3 bg-fd-card p-10 text-fd-muted-foreground">
                <ImageIcon className="size-12 opacity-60" />
                <span className="text-center text-base font-medium">
                  {placeholderLabel}
                </span>
                <span className="text-sm opacity-70">
                  Screenshot placeholder
                </span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Screenshot;
