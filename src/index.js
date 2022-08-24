import core from "@actions/core";
import axios from 'axios';

async function main() {
  core.info("TechCore build action initiated.");
  const buildId = core.getInput("techcore-build-id");
  const techCoreToken = core.getInput("techcore-api-key");
  const logHost = core.getInput("techcore-api-url") ?? "https://api.techcore.com";

  const url = `${logHost}/api/builds/${buildId}/logs`;
  const {data: stream} = await axios.get(url, {
    responseType: "stream",
    timeout: 30_000,
    headers: {
      ['X-API-KEY']: techCoreToken,
    },
  }).catch(() => {throw new Error("Failed to get build stream!")});

  stream.on("data", (data) => {
    const parsedData = Buffer.from(data).toString("utf-8");
    console.log(parsedData);
  });

  stream.on("end", () => {
    console.log("stream done");
  });
}

main();
