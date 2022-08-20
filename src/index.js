import core from "@actions/core";
import axios from 'axios';

async function main() {
  core.info("TechCore build action initiated.");
  const buildId = core.getInput("techcore-build-id");
  const techCoreToken = core.getInput("techcore-api-key");
  console.log(`your buildId: ${buildId}`);
  console.log(`your techCoreToken: ${techCoreToken}`);

  const response = await axios.get("https://04c6-216-106-133-65.ngrok.io", {
    responseType: "stream",
  });

  const stream = response.data;

  stream.on("data", (data) => {
    const parsedData = Buffer.from(data).toString("utf-8");
    console.log(parsedData);
  });

  stream.on("end", () => {
    console.log("stream done");
  });
}

main();
