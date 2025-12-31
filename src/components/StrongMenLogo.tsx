
export function StrongMenLogo({ className = "" }: { className?: string }) {
  // 13 items in a circle
  const count = 13;
  const radius = 75; // Increased radius to space them out more (was 65)
  const items = Array.from({ length: count }, (_, i) => {
    // Start from top (-90 degrees)
    const angle = (i * 360) / count - 90;
    const radian = (angle * Math.PI) / 180;
    const x = 100 + radius * Math.cos(radian);
    const y = 100 + radius * Math.sin(radian);
    return { x, y, angle };
  });

  return (
    <div className={`relative w-64 h-64 md:w-96 md:h-96 mx-auto mb-0 ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Central Number */}
        <text
          x="100"
          y="118"
          textAnchor="middle"
          fill="white"
          fontSize="64"
          fontWeight="bold"
          style={{ fontFamily: 'var(--font-heading)', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
        >
          13
        </text>

        {/* Icons Ring */}
        {items.map((item, i) => (
          <g key={i} transform={`translate(${item.x}, ${item.y})`}>
            <g transform="translate(0, 0)">
               {/* Head */}
              <circle cx="0" cy="0" r="5" stroke="white" strokeWidth="1.5" fill="none" />
              {/* Body (Arc) */}
              <path
                d="M -7 10 Q 0 4 7 10"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Diamond (Floating above) */}
              <path
                d="M 0 -10 L 4 -15 L 0 -20 L -4 -15 Z"
                fill="#f2c94c" 
                stroke="#f2c94c"
                strokeWidth="0.5"
                className="animate-float-sparkle"
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  animationDelay: `${i * 0.1}s` // Optional: stagger the animations slightly for a wave effect
                }}
              />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
