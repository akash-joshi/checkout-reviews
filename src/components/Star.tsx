export type StarStates = "empty" | "full";

interface StarProps {
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onMouseMove?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onMouseLeave?: () => void;
  state?: StarStates;
}

export default function Star({
  className,
  onClick,
  onMouseMove,
  onMouseLeave,
  state,
}: StarProps) {
  const getFillRule = (state: StarStates) => {
    if (state === "full") {
      return "full";
    }

    return "empty";
  };

  return (
    <svg
      data-testid="star"
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29.8947 11.3211C29.6603 10.6474 29.0892 10.1495 28.3862 10.047L20.3164 8.80207L16.7135 1.06914C16.3767 0.439371 15.7323 0 15 0C14.2677 0 13.6233 0.439371 13.2865 1.06914L9.68361 8.80207L1.56989 10.047C0.910833 10.1495 0.339651 10.6474 0.105319 11.3211C-0.129012 11.9802 0.0320908 12.7271 0.54469 13.2251L6.43226 19.2445L5.02628 27.8122C4.92376 28.5152 5.23132 29.2182 5.78785 29.6576C6.1247 29.8919 6.49085 29.9944 6.90093 29.9944C7.19384 29.9944 7.5014 29.9212 7.80896 29.7601L15 25.7764L22.191 29.7601C22.4986 29.9212 22.8062 29.9944 23.0991 29.9944C23.5092 29.9944 23.8753 29.8919 24.2121 29.6576C24.7687 29.2182 25.0762 28.5152 24.9737 27.8122L23.5677 19.2445L29.4553 13.2251C29.9679 12.7271 30.129 11.9802 29.8947 11.3211Z"
          fill={`url(#paint0_${getFillRule(state ?? "empty")})`}
        />
      </g>
      <defs>
        <filter
          id="filter0_i"
          x="0"
          y="0"
          width="30"
          height="29.9944"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
        <linearGradient
          id="paint0_full"
          x1="15"
          y1="-3.5"
          y2="-3.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFD966" />
          <stop offset="0%" stopColor={"#FFD966"} />
        </linearGradient>
        <linearGradient
          id="paint0_empty"
          x1="15"
          y1="-3.5"
          y2="-3.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#E0E0E0" />
          <stop offset="0%" stopColor={"#E0E0E0"} />
        </linearGradient>
        <linearGradient
          id="paint0_half"
          x1="15"
          y1="-3.5"
          y2="-3.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FDCE71" />
          <stop offset="0%" stopColor={"#E0E0E0"} />
        </linearGradient>
        <linearGradient
          id="paint0_half_hover"
          x1="15"
          y1="-3.5"
          y2="-3.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(253, 206, 113, 0.7)" />
          <stop offset="0%" stopColor={"rgba(253, 206, 113, 0.4)"} />
        </linearGradient>
      </defs>
    </svg>
  );
}
