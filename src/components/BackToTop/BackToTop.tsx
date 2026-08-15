"use client";

type BackToTopProps = {
  className?: string;
};

export default function BackToTop({ className }: BackToTopProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <a href="#top" className={className} onClick={handleClick}>
      Back to top
      <span aria-hidden="true">{"\u2191\uFE0E"}</span>
    </a>
  );
}
