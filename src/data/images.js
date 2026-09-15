// ============================================================
// LUMORA — Centralized Image Configuration
// All imagery references live here so they can be swapped out
// easily without touching component/page code.
// ============================================================

const u = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const heroImages = [
  u('1519741497674-611481863552', 1920), // wedding rings, golden hour
  u('1606800052052-a08af7148866', 1920), // portrait studio light
  u('1519225421980-715cb0215aed', 1920), // couple, cinematic
];

export const categoryImages = {
  Wedding: u('1519225421980-715cb0215aed'),
  Portrait: u('1500648767791-00dcc994a43e'),
  Fashion: u('1523398002811-999ca8dec234'),
  'Pre-Wedding': u('1465495976277-4387d4b0b4c6'),
  Events: u('1517841905240-472988babdf9'),
  Product: u('1515169067868-5387ec356754'),
  Maternity: u('1519689680058-324335c77eba'),
  Travel: u('1493246507139-91e8fad9978e'),
  Corporate: u('1521737604893-d14cc237f11d'),
  Food: u('1600585154340-be6161a56a0c'),
  Architecture: u('1523050854058-8df90110c9f1'),
  Lifestyle: u('1476234251651-f353703a034d'),
};

export const photographerAvatars = [
  u('1573497019940-1c28c88b4f3e', 400),
  u('1500648767791-00dcc994a43e', 400),
  u('1519085360753-af0119f7cbe7', 400),
  u('1544005313-94ddf0286df2', 400),
  u('1534528741775-53994a69daeb', 400),
  u('1506794778202-cad84cf45f1d', 400),
  u('1507003211169-0a1dd7228f2d', 400),
  u('1580489944761-15a19d654956', 400),
  u('1531123897727-8f129e1688ce', 400),
  u('1508214751196-bcfd4ca60f91', 400),
  u('1560250097-0b93528c311a', 400),
  u('1522075469751-3a6694fb2f61', 400),
];

export const photographerCovers = [
  u('1554048612-b6a482bc67e5', 1600),
  u('1554080353-a576cf803bda', 1600),
  u('1522673607200-164d1b6ce486', 1600),
  u('1519741497674-611481863552', 1600),
  u('1452587925148-ce544e77e70d', 1600),
  u('1487958449943-2429e8be8625', 1600),
];

export const portfolioShots = {
  Wedding: [
    u('1519225421980-715cb0215aed'),
    u('1465495976277-4387d4b0b4c6'),
    u('1511285560929-80b456fea0bc'),
    u('1522673607200-164d1b6ce486'),
    u('1521543387405-8a9587e40e9d'),
    u('1583939003579-730e3918a45a'),
  ],
  Portrait: [
    u('1500648767791-00dcc994a43e'),
    u('1544005313-94ddf0286df2'),
    u('1519085360753-af0119f7cbe7'),
    u('1534528741775-53994a69daeb'),
    u('1531123897727-8f129e1688ce'),
    u('1489980557514-251d61e3eeb6'),
  ],
  Fashion: [
    u('1523398002811-999ca8dec234'),
    u('1490481651871-ab68de25d43d'),
    u('1483985988355-763728e1935b'),
    u('1490750967868-88aa4486c946'),
    u('1509631179647-0177331693ae'),
    u('1515372039744-b8f02a3ae446'),
  ],
  Travel: [
    u('1493246507139-91e8fad9978e'),
    u('1476514525535-07fb3b4ae5f1'),
    u('1502602898657-3e91760cbb34'),
    u('1488646953014-85cb44e25828'),
    u('1469474968028-56623f02e42e'),
    u('1483683804023-6ccdb62f86ef'),
  ],
  Product: [
    u('1515169067868-5387ec356754'),
    u('1526170375885-4d8ecf77b99f'),
    u('1523275335684-37898b6baf30'),
    u('1547394765-185e1e68f34e'),
    u('1523293182086-7651a899d37f'),
    u('1560343090-f0409e92791a'),
  ],
  Architecture: [
    u('1523050854058-8df90110c9f1'),
    u('1487958449943-2429e8be8625'),
    u('1496307653780-42ee777d4833'),
    u('1449824913935-59a10b8d2000'),
    u('1487958449943-2429e8be8625'),
    u('1518005020951-eccb494ad742'),
  ],
};

export const galleryImages = [
  { id: 'g1', src: u('1519225421980-715cb0215aed'), category: 'Wedding', title: 'Golden Hour Vows' },
  { id: 'g2', src: u('1500648767791-00dcc994a43e'), category: 'Portrait', title: 'Quiet Confidence' },
  { id: 'g3', src: u('1523398002811-999ca8dec234'), category: 'Fashion', title: 'Editorial Line' },
  { id: 'g4', src: u('1493246507139-91e8fad9978e'), category: 'Travel', title: 'Coastal Drift' },
  { id: 'g5', src: u('1465495976277-4387d4b0b4c6'), category: 'Wedding', title: 'First Look' },
  { id: 'g6', src: u('1544005313-94ddf0286df2'), category: 'Portrait', title: 'Natural Light Study' },
  { id: 'g7', src: u('1490481651871-ab68de25d43d'), category: 'Fashion', title: 'Monochrome Motion' },
  { id: 'g8', src: u('1476514525535-07fb3b4ae5f1'), category: 'Travel', title: 'Ridge Line' },
  { id: 'g9', src: u('1511285560929-80b456fea0bc'), category: 'Wedding', title: 'The Reception' },
  { id: 'g10', src: u('1519085360753-af0119f7cbe7'), category: 'Portrait', title: 'Window Light' },
  { id: 'g11', src: u('1483985988355-763728e1935b'), category: 'Fashion', title: 'Structure & Silk' },
  { id: 'g12', src: u('1502602898657-3e91760cbb34'), category: 'Travel', title: 'Low Tide' },
  { id: 'g13', src: u('1522673607200-164d1b6ce486'), category: 'Wedding', title: 'Something Blue' },
  { id: 'g14', src: u('1534528741775-53994a69daeb'), category: 'Portrait', title: 'Studio Session' },
  { id: 'g15', src: u('1490750967868-88aa4486c946'), category: 'Fashion', title: 'Campaign 04' },
  { id: 'g16', src: u('1488646953014-85cb44e25828'), category: 'Travel', title: 'Desert Light' },
  { id: 'g17', src: u('1521543387405-8a9587e40e9d'), category: 'Wedding', title: 'Confetti Exit' },
  { id: 'g18', src: u('1531123897727-8f129e1688ce'), category: 'Portrait', title: 'Editorial Headshot' },
];

export const digitalPhotoImages = [
  { id: 'p1', src: u('1441984904996-e0b6ba687e04'), category: 'Nature', title: 'Alpine Ridge at Dawn' },
  { id: 'p2', src: u('1523050854058-8df90110c9f1'), category: 'Architecture', title: 'Glass & Light' },
  { id: 'p3', src: u('1500648767791-00dcc994a43e'), category: 'Portrait', title: 'Soft Focus Study' },
  { id: 'p4', src: u('1523398002811-999ca8dec234'), category: 'Fashion', title: 'Editorial No. 12' },
  { id: 'p5', src: u('1493246507139-91e8fad9978e'), category: 'Travel', title: 'Coastal Horizon' },
  { id: 'p6', src: u('1487958449943-2429e8be8625'), category: 'Architecture', title: 'Concrete Geometry' },
  { id: 'p7', src: u('1519225421980-715cb0215aed'), category: 'Wedding', title: 'Golden Vows' },
  { id: 'p8', src: u('1476234251651-f353703a034d'), category: 'Lifestyle', title: 'Morning Ritual' },
  { id: 'p9', src: u('1506905925346-21bda4d32df4'), category: 'Nature', title: 'Peak Silence' },
  { id: 'p10', src: u('1521737604893-d14cc237f11d'), category: 'Business', title: 'The Boardroom' },
  { id: 'p11', src: u('1470071459604-3b5ec3a7fe05'), category: 'Nature', title: 'Valley Fog' },
  { id: 'p12', src: u('1490481651871-ab68de25d43d'), category: 'Fashion', title: 'Monochrome Study' },
];

export const printImages = {
  'Canvas Prints': u('1441984904996-e0b6ba687e04'),
  'Framed Prints': u('1500648767791-00dcc994a43e'),
  Posters: u('1523398002811-999ca8dec234'),
  'Photo Books': u('1519225421980-715cb0215aed'),
  'Metal Prints': u('1470071459604-3b5ec3a7fe05'),
  'Fine Art Prints': u('1506905925346-21bda4d32df4'),
};

export const locationImages = {
  'Aravalli Hills, Rajasthan': u('1470071459604-3b5ec3a7fe05'),
  'Marine Drive, Mumbai': u('1529253355930-ddbe423a2ac7'),
  'Coorg, Karnataka': u('1501785888041-af3ef285b470'),
  'Udaipur Lakes, Rajasthan': u('1587474260584-136574528ed5'),
  'Alibaug Coastline, Maharashtra': u('1502602898657-3e91760cbb34'),
  'Munnar Tea Estates, Kerala': u('1506905925346-21bda4d32df4'),
};

export const articleImages = {
  'Best Portrait Photography Ideas': u('1500648767791-00dcc994a43e'),
  'Wedding Photoshoot Ideas': u('1519225421980-715cb0215aed'),
  'Fashion Photography Trends': u('1523398002811-999ca8dec234'),
  'How to Prepare for a Photoshoot': u('1534528741775-53994a69daeb'),
  'Best Locations for Photography': u('1470071459604-3b5ec3a7fe05'),
  'Photography Poses': u('1531123897727-8f129e1688ce'),
  'Professional Headshot Guide': u('1519085360753-af0119f7cbe7'),
};

export const reviewAvatars = [
  u('1573497019940-1c28c88b4f3e', 200),
  u('1500648767791-00dcc994a43e', 200),
  u('1519085360753-af0119f7cbe7', 200),
  u('1544005313-94ddf0286df2', 200),
  u('1531123897727-8f129e1688ce', 200),
  u('1506794778202-cad84cf45f1d', 200),
];

export const experienceImage = u('1554048612-b6a482bc67e5', 1600);
export const aboutHeroImage = u('1522673607200-164d1b6ce486', 1920);
export const authHeroImage = u('1554080353-a576cf803bda', 1600);
