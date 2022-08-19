const core = require('@actions/core');

async function handler() {
  core.info("TechCore deployment action initiated.");
  const buildId = core.getInput("build-id");
  const techCoreToken = core.getInput("techcore-api-key");
  console.log(`your buildId: ${buildId}`);
  console.log(`your techCoreToken: ${techCoreToken}`);
}

handler();
