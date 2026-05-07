import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schema';
import { apiVersion, dataset, projectId } from './sanity/env';
import { publishingStructure } from './sanity/structure';
import { schemaTemplates } from './sanity/templates';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes, templates: schemaTemplates },
  plugins: [
    structureTool({ structure: publishingStructure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
