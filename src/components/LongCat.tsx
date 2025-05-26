export const LongCat = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    id="longCat"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '350px',
      maxWidth: '350px',
    }}
  >
    <defs>
      <marker
        id="catHead"
        viewBox="0 0 100 100"
        refX="50"
        refY="50"
        markerWidth="2.5"
        markerHeight="2.5"
        orient="auto-start-reverse"
      >
        <g transform="rotate(90 50 50)">
          <ellipse cx="20" cy="28" ry="25" rx="10" fill="#f5f5f5" />
          <ellipse cx="20" cy="21" ry="15" rx="6" fill="pink" />
          <ellipse cx="80" cy="28" ry="25" rx="10" fill="#f5f5f5" />
          <ellipse cx="80" cy="21" ry="15" rx="6" fill="pink" />
          <ellipse
            cx="16"
            cy="66"
            ry="25"
            rx="10"
            fill="#f5f5f5"
            stroke="#ccc"
          />
          <ellipse
            cx="80"
            cy="66"
            ry="25"
            rx="10"
            fill="#f5f5f5"
            stroke="#ccc"
          />
          <ellipse cx="50" cy="52" ry="36" rx="45" fill="#ccc" />
          <ellipse cx="50" cy="50" ry="35" rx="45" fill="#f5f5f5" />
          <circle cx="35" cy="45" r="9" fill="#111" />
          <circle cx="65" cy="45" r="9" fill="#111" />
          <circle cx="36" cy="41" r="3" fill="#fff" />
          <circle cx="64" cy="41" r="3" fill="#fff" />
          <path
            d="M50 54 v 3M 50 57 a 12 12 0 0 0 16 13 M 50 57 a 12 12 0 0 1 -16 13"
            fill="none"
            stroke="#999"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse cx="50" cy="54" ry="4" rx="5" fill="pink" />
        </g>
      </marker>
    </defs>

    <path
      strokeDasharray="395.8965"
      strokeDashoffset="0"
      d="M 100 15 a 85 85 0 1 1 -85 85"
      fill="none"
      stroke="#f5f5f5"
      strokeWidth="10"
      strokeLinecap="round"
    >
      <animate
        attributeName="strokeDashoffset"
        values="337; 0; 337"
        dur="4s"
        begin="0s"
        repeatCount="indefinite"
        keyTimes="0;0.75;1"
        keySplines="0.5 0.25 0.75 0.5;0.5 0.25 0.75 0.5"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 100 100; -360 100 100"
        dur="3s"
        begin="-2.85s"
        repeatCount="indefinite"
      />
    </path>

    <path
      strokeDasharray="306.3486"
      strokeDashoffset="0"
      d="M 100 35 a 65 65 0 1 1 -65 65"
      fill="none"
      stroke="#f5f5f5"
      strokeWidth="10"
      strokeLinecap="round"
    >
      <animate
        attributeName="strokeDashoffset"
        values="259; 0; 259"
        dur="4s"
        begin="0s"
        repeatCount="indefinite"
        keyTimes="0;0.75;1"
        keySplines="0.5 0.25 0.75 0.5;0.5 0.25 0.75 0.5"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 100 100; -360 100 100"
        dur="3s"
        begin="-2.85s"
        repeatCount="indefinite"
      />
    </path>

    <path
      d="M 100 25 a 75 75 0 1 1 -75 75"
      fill="none"
      stroke="#f5f5f5"
      strokeWidth="30"
      strokeLinecap="round"
      strokeDasharray="353.4791"
      strokeDashoffset="0"
    >
      <animate
        attributeName="strokeDashoffset"
        values="300; 0; 300"
        dur="4s"
        begin="0s"
        repeatCount="indefinite"
        keyTimes="0;0.75;1"
        keySplines="0.5 0.25 0.75 0.5;0.5 0.25 0.75 0.5"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 100 100; -360 100 100"
        dur="3s"
        begin="0s"
        repeatCount="indefinite"
      />
    </path>

    <path
      strokeDasharray="353.4791"
      strokeDashoffset="0"
      d="M 100 25 a 75 75 0 1 1 -75 75"
      fill="none"
      stroke="#ccc"
      strokeWidth="20"
      markerStart="url(#catHead)"
      markerEnd="url(#catHead)"
      strokeLinecap="round"
    >
      <animate
        attributeName="strokeDashoffset"
        values="300; 0; 300"
        dur="4s"
        begin="0s"
        repeatCount="indefinite"
        keyTimes="0;0.75;1"
        keySplines="0.5 0.25 0.75 0.5;0.5 0.25 0.75 0.5"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 100 100; -360 100 100"
        dur="3s"
        begin="0s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);
