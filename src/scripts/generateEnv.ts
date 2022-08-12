import fs from "fs";

const envList: Array<string> = [
  "PORT",
  "NODE_ENV",
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "DB_PORT",
  "DB_URL",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
];

let envContent: string;
envList.map((item) => {
  envContent += item + "=\n";
});

const envPath = ".env";

fs.stat(envPath, (error, stats) => {
  if (error) {
    //console.error(error);
    fs.writeFile(envPath, envContent, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("🚀[Wiki API]: Generate .env file successfully!");
    });
  } else {
    console.log(
      "🚀[Wiki API]: Already have a .env file, cannot generate again!"
    );
  }
});
