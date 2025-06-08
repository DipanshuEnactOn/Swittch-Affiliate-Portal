import cron from "node-cron";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const URL = process.env.CRONS_URL;

console.log("Cron job started with URL:", URL);

const programCronConfig = [
  {
    name: "Payout",
    url: `${URL}/process-conversion`,
    schedule: "*/5 * * * *",
  },
];

const callApi = async (url: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
    }).then((res) => res.json());
    console.log({ url, response });
  } catch (error: any) {
    console.error(`API call failed: ${error.message}`);
  }
};

const main = async () => {
  if (!URL) {
    console.error("CRONS_URL environment variable is not set.");
    return;
  }
  programCronConfig.forEach((prog) => {
    cron.schedule(prog.schedule, async function () {
      try {
        console.log(`Running cron job: ${prog.name}`);
        await callApi(prog.url);
      } catch (error) {
        console.error(error);
      }
    });
  });
};

main();
