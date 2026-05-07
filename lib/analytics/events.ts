export const MAGAZINE_ANALYTICS_EVENTS = [
  'locale_switch',
  'category_nav',
  'outbound_cafe24',
  'article_read_depth',
  'lookbook_read_depth',
  'newsletter_submit',
] as const;

export type MagazineAnalyticsEventName =
  (typeof MAGAZINE_ANALYTICS_EVENTS)[number];

export type MagazineAnalyticsPayloadValue = string | number | boolean | null;

export type MagazineAnalyticsPayload = Record<
  string,
  MagazineAnalyticsPayloadValue
>;

export type MagazineAnalyticsEvent = {
  name: MagazineAnalyticsEventName;
  payload: MagazineAnalyticsPayload;
};

const readDepthSurfaces = {
  article: 'article_read_depth',
  lookbook: 'lookbook_read_depth',
} as const satisfies Record<string, MagazineAnalyticsEventName>;

export function isMagazineAnalyticsEventName(
  value: string | null | undefined,
): value is MagazineAnalyticsEventName {
  return MAGAZINE_ANALYTICS_EVENTS.includes(value as MagazineAnalyticsEventName);
}

export function createMagazineAnalyticsEvent(
  name: MagazineAnalyticsEventName,
  payload: Record<string, unknown> = {},
): MagazineAnalyticsEvent {
  return {
    name,
    payload: sanitizeAnalyticsPayload(payload),
  };
}

export function readDepthEventNameForSurface(
  surface: string | null | undefined,
): MagazineAnalyticsEventName | null {
  return surface && surface in readDepthSurfaces
    ? readDepthSurfaces[surface as keyof typeof readDepthSurfaces]
    : null;
}

function sanitizeAnalyticsPayload(
  payload: Record<string, unknown>,
): MagazineAnalyticsPayload {
  const sanitized: MagazineAnalyticsPayload = {};

  for (const [key, value] of Object.entries(payload)) {
    if (value === null) {
      sanitized[key] = value;
      continue;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();

      if (trimmed) {
        sanitized[key] = trimmed;
      }

      continue;
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
      sanitized[key] = value;
      continue;
    }

    if (typeof value === 'boolean') {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
