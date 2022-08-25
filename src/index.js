import core from "@actions/core";
import axios from "axios";

async function main() {
  core.info("TechCore build action initiated.");
  const buildId = core.getInput("techcore-build-id");
  const techCoreToken = core.getInput("techcore-api-key");
  // const logHost = core.getInput("techcore-api-url") ?? "https://api.techcore.com";
  const logHost = "https://c2dc-66-90-165-82.ngrok.io";

  console.log(`buildId: `, buildId);
  console.log(`techCoreToken: `, techCoreToken);
  console.log(`logHost: `, logHost);

  const url = `${logHost}/builds/${buildId}/logs`;
  const { data: stream } = await axios
    .get(url, {
      responseType: "stream",
      timeout: 30_000,
      headers: {
        Authorization: `Bearer ${techCoreToken}`,
      },
    })
    .catch((e) => {
      console.log(e);
      throw new Error("Failed to get build stream!");
    });

  stream.on("data", (data) => {
    const stringLines = Buffer.from(data).toString("utf-8").split(/\r?\n/);
    for (let line of stringLines) {
      try {
        const parsed = JSON.parse(line);
        console.log(parsed.line);
      } catch {
        console.log(line);
      }
    }
  });

  stream.on("end", () => {
    console.log("stream done");
  });
}

main();
