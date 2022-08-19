import core from '@actions/core';

async function main() {
  core.info("TechCore deployment action initiated.");
  const buildId = core.getInput("techcore-build-id");
  const techCoreToken = core.getInput("techcore-api-key");
  console.log(`your buildId: ${buildId}`);
  console.log(`your techCoreToken: ${techCoreToken}`);
}

main();
