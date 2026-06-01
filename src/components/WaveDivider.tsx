type WaveDividerProps = {
  /** color of the waves */
  color?: string;
  /** flip vertically (use at top of a section) */
  flip?: boolean;
  /** background under waves (so the SVG band blends with the section above/below) */
  bgClass?: string;
  className?: string;
};

export function WaveDivider({
  color = "#F8F5F0",
  flip = false,
  bgClass = "bg-transparent",
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${bgClass} ${className}`}
      style={{ transform: flip ? "rotate(180deg)" : undefined, lineHeight: 0 }}
      aria-hidden
    >
      <svg
        className="block w-[200%] h-[80px] wave-slow"
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C480,90 960,0 1440,40 C1920,80 2400,20 2880,50 L2880,100 L0,100 Z"
          fill={color}
          opacity="0.4"
        />
      </svg>
      <svg
        className="block w-[200%] h-[80px] wave-mid -mt-[70px]"
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,55 C480,15 960,80 1440,45 C1920,10 2400,75 2880,40 L2880,100 L0,100 Z"
          fill={color}
          opacity="0.6"
        />
      </svg>
      <svg
        className="block w-[200%] h-[80px] wave-fast -mt-[70px]"
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,70 C480,50 960,90 1440,65 C1920,40 2400,85 2880,60 L2880,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
