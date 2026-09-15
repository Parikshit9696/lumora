const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function InstagramIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3V3z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinterestIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M8 20c1-2 2-6 2-6M12 3a9 9 0 1 0 3 17.5c-1-1-2-2-2.4-3.5-.3-1 .6-4.5.6-4.5.5.9 1.8 1.5 2.7 1.5 2.8 0 4.6-2.5 4.6-5.7 0-2.9-2.4-5.3-5.9-5.3" />
    </svg>
  );
}
