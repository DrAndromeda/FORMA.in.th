import type { Project } from '../../lib/types';

/**
 * Representative concept studies — placeholders until real project photography and
 * verified project data are supplied. See NOTES.md. Marked status: 'concept' throughout
 * so no page implies a specific completed, verified commission.
 */
export const projectsEn: Omit<Project, 'translations'>[] = [
  {
    slug: 'ridge-house-sri-thanu',
    tags: ['Villa', 'Architecture'],
    locationSlug: 'sri-thanu',
    serviceSlugs: ['architecture', 'villa-design'],
    status: 'concept',
    images: ['hero-villa', 'architecture'],
  },
  {
    slug: 'bay-view-residence-chaloklum',
    tags: ['Villa', 'Interior', 'Landscape'],
    locationSlug: 'chaloklum',
    serviceSlugs: ['villa-design', 'interior-design', 'landscape-design'],
    status: 'concept',
    images: ['pool-villa', 'interior'],
  },
  {
    slug: 'thong-sala-townhouse-renovation',
    tags: ['Renovation', 'Interior'],
    locationSlug: 'thong-sala',
    serviceSlugs: ['renovation', 'interior-design'],
    status: 'concept',
    images: ['design', 'interior'],
  },
  {
    slug: 'haad-yao-beachfront-pavilion',
    tags: ['Villa', 'Construction', 'Landscape'],
    locationSlug: 'haad-yao',
    serviceSlugs: ['construction', 'landscape-design', 'villa-design'],
    status: 'concept',
    images: ['hero-villa', 'pool-villa'],
  },
  {
    slug: 'haad-salad-privacy-villa',
    tags: ['Villa', 'Architecture', 'Landscape'],
    locationSlug: 'haad-salad',
    serviceSlugs: ['villa-design', 'landscape-design', 'eco-construction'],
    status: 'concept',
    images: ['architecture', 'pool-villa'],
  },
  {
    slug: 'baan-tai-family-compound',
    tags: ['Villa', 'Construction', 'Hospitality'],
    locationSlug: 'baan-tai',
    serviceSlugs: ['turnkey-projects', 'construction', 'project-management'],
    status: 'concept',
    images: ['construction', 'hero-villa'],
  },
];

export const projectsEnContent: Record<string, Project['translations']['en']> = {
  'ridge-house-sri-thanu': {
    seo: {
      title: 'Ridge House, Sri Thanu | FORMA Concept Study',
      description:
        'A hillside villa concept study for a sloped Sri Thanu site, planned around split-level massing and uninterrupted sunset sightlines.',
    },
    name: 'Ridge House',
    summary: 'A split-level villa concept for a steep Sri Thanu ridge, planned entirely around its sunset outlook.',
    story:
      'This concept study responds to a steeply sloped ridge plot typical of Sri Thanu\'s west-facing hillsides. Rather than cutting a single flat plate into the slope, the massing steps down in three linked levels, each opening toward the sunset while stepping back from its neighbour above for privacy and shade.',
    design:
      'Split-level planning follows the natural contour, reducing earthworks and retaining structure compared with a flattened single-level footprint. Deep roof overhangs and a partially open upper pavilion manage solar exposure through the hottest part of the day while keeping the view corridor clear.',
    materials:
      'Board-formed concrete retaining walls, dense hardwood screening on the west face, and locally sourced stone paving that reads consistently with the hillside\'s natural material palette.',
    outcome:
      'A design study demonstrating how steep Sri Thanu terrain can be treated as an asset for dramatic, view-led architecture rather than an obstacle requiring extensive cut-and-fill.',
  },
  'bay-view-residence-chaloklum': {
    seo: {
      title: 'Bay View Residence, Chaloklum | FORMA Concept Study',
      description:
        'A quiet, landscape-integrated villa concept for a Chaloklum bay-facing plot, designed to sit respectfully within the surrounding village context.',
    },
    name: 'Bay View Residence',
    summary: 'A landscape-led villa concept for a Chaloklum bay plot, scaled to sit quietly within its village setting.',
    story:
      'Chaloklum\'s working-harbour character called for a design that reads as calm and understated rather than a large architectural statement. This concept keeps the built footprint modest and lets the garden and pool carry much of the site\'s presence.',
    design:
      'A single-storey pavilion arrangement wraps around a central pool and garden, with the main living pavilion oriented to frame the bay without competing with the surrounding village rooftops in scale or material tone.',
    materials:
      'Warm timber cladding, textured render in tones drawn from the surrounding landscape, and a planting palette selected to mature into a genuine privacy screen within a few seasons.',
    outcome:
      'A demonstration of how a villa can achieve strong indoor-outdoor living and privacy while remaining a respectful, low-key neighbour within an established village fabric.',
  },
  'thong-sala-townhouse-renovation': {
    seo: {
      title: 'Thong Sala Townhouse Renovation | FORMA Concept Study',
      description:
        'A renovation concept for an ageing Thong Sala townhouse, addressing ventilation, layout and waterproofing while preserving its structural frame.',
    },
    name: 'Thong Sala Townhouse Renovation',
    summary: 'A renovation concept reworking an ageing townhouse\'s layout and ventilation while keeping its sound structural frame.',
    story:
      'This study addresses a common Koh Phangan renovation brief: a structurally sound but poorly ventilated older townhouse, with a layout no longer suited to how the household actually wants to live.',
    design:
      'Internal walls are reconfigured to open a cross-ventilation path through the building\'s depth, previously blocked by an enclosed central corridor. A new light well introduces daylight to what had been a dim interior core.',
    materials:
      'Existing structural walls are retained and refinished; new joinery and flooring introduce a lighter material palette than the original finishes, chosen for durability in the humid ground-floor levels.',
    outcome:
      'A concept demonstrating how targeted structural and ventilation intervention — rather than a full rebuild — can resolve the core problems of an older town property.',
  },
  'haad-yao-beachfront-pavilion': {
    seo: {
      title: 'Haad Yao Beachfront Pavilion | FORMA Concept Study',
      description:
        'A beachfront villa concept for Haad Yao, designed around setback requirements and the coastal microclimate\'s durability demands.',
    },
    name: 'Haad Yao Beachfront Pavilion',
    summary: 'A beachfront villa concept for Haad Yao, planned around setback rules and long-term coastal durability.',
    story:
      'This concept explores how a beachfront brief can be resolved within realistic setback and environmental constraints, without sacrificing the direct sea relationship that motivated the site choice.',
    design:
      'An elevated main pavilion lifts principal living spaces above ground-level flood and moisture risk, while a lower, more robust service level houses less climate-sensitive functions.',
    materials:
      'Marine-grade fixings, salt-tolerant timber species and a concrete frame specified for higher chloride exposure than an inland equivalent.',
    outcome:
      'A study in balancing an uncompromising sea connection with the durability and regulatory realities of building directly on a tropical shoreline.',
  },
  'haad-salad-privacy-villa': {
    seo: {
      title: 'Haad Salad Privacy Villa | FORMA Concept Study',
      description:
        'A secluded villa concept for Haad Salad, using massing and dense planting to achieve privacy on a modest, quiet north-west plot.',
    },
    name: 'Haad Salad Privacy Villa',
    summary: 'A concept exploring how a modest Haad Salad plot can achieve strong privacy through massing and planting rather than walls.',
    story:
      'The brief behind this study prioritised seclusion above all else, on a plot smaller than the villas typical of the island\'s busier beaches.',
    design:
      'Living spaces are arranged around a partially enclosed internal courtyard rather than facing outward, borrowing daylight and air from above while presenting a quiet, low profile from the access road.',
    materials:
      'Locally quarried stone at the base, timber screening at upper levels, and a dense native planting buffer designed to mature into the primary privacy strategy within two growing seasons.',
    outcome:
      'A demonstration of privacy achieved through spatial planning and landscape rather than solid perimeter walling, keeping the villa light-filled despite its enclosed character.',
  },
  'baan-tai-family-compound': {
    seo: {
      title: 'Baan Tai Family Compound | FORMA Concept Study',
      description:
        'A multi-pavilion family compound concept for a generous Baan Tai plot, coordinated as a turnkey design-build study.',
    },
    name: 'Baan Tai Family Compound',
    summary: 'A multi-generational compound concept for a generous Baan Tai plot, coordinated as a full turnkey study.',
    story:
      'This study responds to a brief for a multi-generational household wanting separate but connected living for parents, adult children and visiting guests on one shared plot.',
    design:
      'Three linked pavilions share a central garden and pool while each retaining independent entry and outdoor space, allowing genuine privacy within a connected family compound.',
    materials:
      'A consistent material language — board-formed concrete, timber screening and shared roof geometry — ties the pavilions together as one coherent composition rather than three unrelated buildings.',
    outcome:
      'A demonstration of how our Turnkey and Project Management services coordinate a larger, multi-structure brief as a single integrated design-build project.',
  },
};
