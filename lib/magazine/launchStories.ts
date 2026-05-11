import launchBriefSeed from '@/sanity/seed/launch-briefs.json';
import {
  getArticleHref,
  type ArticleCategory,
} from './categories';

type LaunchBriefSeedDocument = {
  _id: string;
  briefType: string;
  priority: number;
  slug: {
    current: string;
  };
  category?: ArticleCategory;
  purpose: string;
  requiredAssets?: string[];
  ctaIntent?: string;
  routeHint?: string;
  needsApproval?: boolean;
  publishingNotes: string;
};

export type LaunchStoryWorkbook = {
  priority: number;
  category: ArticleCategory;
  slug: string;
  sourceBriefId: string;
  purpose: string;
  requiredAssets: string[];
  ctaIntent: string;
  approvalNote: string;
  bodyAngle: string;
  routeHint: string;
  publicRoute: string;
  needsApproval: boolean;
  publishReady: false;
  editorChecklist: string[];
};

const bodyAngles: Record<string, string> = {
  'quiet-morning':
    'A quiet morning field scene centered on light, posture, fabric, and the discipline around getting ready.',
  'field-light-after-rain':
    'Wet ground, clear air after rain, field texture, and how the clothing holds shape in a natural riding environment.',
  'listening-before-riding':
    "A rider's pre-ride listening routine, the horse's response, and the restraint that gives the interview its tone.",
  'trainer-morning-routine':
    "A trainer's first checks of the day, what they notice before a lesson begins, and how preparation shapes confidence.",
  'ss26-dawn-silhouettes':
    'SS26 silhouettes as a dawn sequence, moving from stable preparation to field light and finishing with the collection link.',
  'red-stitch-standard':
    'The red stitch as a small design decision, not a slogan: where it appears, why it matters, and how it behaves in close-up.',
  'fabric-that-keeps-shape':
    'Fabric after motion, how shape is maintained, and the difference between visible polish and functional comfort.',
  'riding-jacket-fit-guide':
    'Fit checkpoints around shoulder, sleeve, waist, and riding posture, written as calm practical guidance.',
  'care-after-ride':
    'What to do after returning from the arena: airing, brushing, checking labels, storing, and protecting fabric shape.',
  'ss26-preview-note':
    "A short editor's note announcing SS26 with restrained dates, collection context, and where readers can see the look book.",
  'first-competition-morning':
    'The small preparations of a first competition morning, with personal details kept approved and modest.',
  'stable-weekend-style':
    'Weekend stable dressing as a riding-life story: comfort, movement, quiet polish, and the environment around the rider.',
};

export const launchStoryWorkbooks: LaunchStoryWorkbook[] = (
  launchBriefSeed as LaunchBriefSeedDocument[]
)
  .filter((brief) => brief.briefType === 'story')
  .sort((a, b) => a.priority - b.priority)
  .map((brief) => {
    if (!brief.category) {
      throw new Error(`Story brief ${brief._id} is missing category.`);
    }

    const slug = brief.slug.current;
    const publicRoute = getArticleHref('ko', brief.category, slug);

    return {
      priority: brief.priority,
      category: brief.category,
      slug,
      sourceBriefId: brief._id,
      purpose: brief.purpose,
      requiredAssets: brief.requiredAssets || [],
      ctaIntent: brief.ctaIntent || 'No CTA planned',
      approvalNote: brief.publishingNotes,
      bodyAngle: bodyAngles[slug] || brief.purpose,
      routeHint: brief.routeHint || publicRoute,
      publicRoute,
      needsApproval: Boolean(brief.needsApproval),
      publishReady: false,
      editorChecklist: [
        'Source launch brief',
        'Category / public section',
        'Slug',
        'Hero image',
        'Korean excerpt',
        'Korean body',
        'Published at',
        'Translation status',
        'End CTA',
      ],
    };
  });
