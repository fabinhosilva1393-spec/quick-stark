type Props = {
  src: string;
  alt?: string;
};

/**
 * Decorative right-anchored backdrop for content page heroes.
 * Purely presentational; sits behind hero text with a left fade.
 */
export function PageHeroBackdrop({ src, alt = "" }: Props) {
  return (
    <div
      aria-hidden={alt ? undefined : true}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-y-0 right-0 h-full w-full object-cover object-right opacity-90"
        loading="eager"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--canvas, #07071D) 0%, rgba(7,7,29,0.96) 42%, rgba(7,7,29,0.4) 72%, rgba(7,7,29,0) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,7,29,0) 0%, var(--canvas, #07071D) 100%)",
        }}
      />
    </div>
  );
}
