import {
  collectLaunchReadinessInput,
  formatLaunchReadinessReport,
  summarizeLaunchReadiness,
} from '../lib/magazine/launchReadiness.mjs';

async function main() {
  const input = await collectLaunchReadinessInput();
  const summary = summarizeLaunchReadiness(input);

  console.log(formatLaunchReadinessReport(summary));

  if (!summary.ready) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
