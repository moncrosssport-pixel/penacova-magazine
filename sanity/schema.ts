import type { SchemaTypeDefinition } from 'sanity';
import { article } from './schemas/article';
import { collection } from './schemas/collection';
import { glossary } from './schemas/glossary';
import { look } from './schemas/look';
import { person } from './schemas/person';
import { product } from './schemas/product';
import { rider } from './schemas/rider';
import { siteSettings } from './schemas/siteSettings';

export const schemaTypes: SchemaTypeDefinition[] = [
  article,
  collection,
  glossary,
  look,
  person,
  product,
  rider,
  siteSettings,
];
