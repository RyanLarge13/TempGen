#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const { execSync } = require("child_process");
const ncp = require("ncp");

program.version("1.0.0");

program
  .command("static [projectName]")
  .description("Generate a static code template")
  .option("-t, --type <type>", "Specify the project type (e.g., portfolio)")
  .action((projectName = "newStaticTemp", options) => {
    const projectDir = path.join(process.cwd(), projectName);
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir);

      let templateDir;

      if (options.type === "portfolio") {
        templateDir = path.join(__dirname, "templates/portfolioBasic");
      } else {
        templateDir = path.join(__dirname, "templates/staticBasic");
      }

      // Use ncp to copy the entire directory structure
      ncp(templateDir, projectDir, function (err) {
        if (err) {
          console.error("Error copying the template:", err);
        } else {
          console.log(
            `Static code template '${projectName}' generated with type '${options.type}'.`
          );
        }
      });
    } else {
      console.error(`Directory '${projectName}' already exists.`);
    }
  });

program
  .command("react [projectName]")
  .description("Generate a new React project")
  .option("-TS, --typescript", "Use TypeScript for the project")
  .option("-TW, --tailwind", "Install Tailwind CSS")
  .action((projectName = "newReactProject", options) => {
    const projectDir = path.join(__dirname, projectName);
    const template = options.typescript ? "react-ts" : "react";
    if (!fs.existsSync(projectDir)) {
      execSync(
        `npm init vite@latest ${projectName} -- --template ${template}`,
        {
          stdio: "inherit",
        }
      );
      if (options.tailwind) {
        execSync(`cd ${projectName} && npm install tailwindcss`, {
          stdio: "inherit",
        });
      }
      console.log(
        `React project '${projectName}' generated with Vite${
          options.typescript ? " using TypeScript" : ""
        }.`
      );
      if (options.tailwind) {
        console.log("Tailwind CSS has been installed.");
      }
    } else {
      console.error(`Directory '${projectName}' already exists.`);
    }
  });

program.parse(process.argv);
