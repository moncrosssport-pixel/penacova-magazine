type InternalRouteEnv = {
  NODE_ENV?: string;
  PENACOVA_SHOW_INTERNAL_LAUNCH_PAGES?: string;
};

export function canShowInternalLaunchPages(
  env: InternalRouteEnv = process.env,
) {
  return (
    env.NODE_ENV !== 'production' ||
    env.PENACOVA_SHOW_INTERNAL_LAUNCH_PAGES === '1'
  );
}
