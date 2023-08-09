#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");

program.version("1.0.0");

program
  .command("static [type] [projectName]")
  .description("Generate a static code template")
  .action((projectName = "newStaticTemp") => {
    const projectDir = path.join(process.cwd(), projectName);
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir);
      const templatesDir = path.join(__dirname, "templates/staticBasic");
      const htmlContent = fs.readFileSync(
        path.join(templatesDir, "index.html"),
        "utf-8"
      );
      const cssContent = fs.readFileSync(
        path.join(templatesDir, "style.css"),
        "utf-8"
      );
      const jsContent = fs.readFileSync(
        path.join(templatesDir, "script.js"),
        "utf-8"
      );
      fs.writeFileSync(path.join(projectDir, "index.html"), htmlContent);
      fs.writeFileSync(path.join(projectDir, "style.css"), cssContent);
      fs.writeFileSync(path.join(projectDir, "script.js"), jsContent);
      console.log(`Static code template '${projectName}' generated.`);
    } else {
      console.error(`Directory '${projectName}' already exists.`);
    }
  });

program
  .command("react [type]")
  .description("Generate a new react project")
  .action((type) => {
  });

program.parse(process.argv);
