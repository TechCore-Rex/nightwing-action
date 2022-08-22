import core from "@actions/core";
import axios from 'axios';

async function main() {
  core.info("TechCore build action initiated.");
  const buildId = core.getInput("techcore-build-id");
  const techCoreToken = core.getInput("techcore-api-key");

  const {data: stream} = await axios.get("https://f779-216-106-133-65.ngrok.io", {
    responseType: "stream",
  }).catch((e) => {throw new Error("Failed to get build stream!")});

  stream.on("data", (data) => {
    const parsedData = Buffer.from(data).toString("utf-8");
    console.log(parsedData);
  });

  stream.on("end", () => {
    console.log("stream done");
  });
}

main();
