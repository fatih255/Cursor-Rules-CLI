#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const chalk = require("chalk");

function getAllFiles(dirPath, arrayOfFiles = [], extension = null) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles, extension);
    } else {
      if (!extension || file.endsWith(extension)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

function generateGlobalRules() {
  const basePath = process.cwd();
  const docsDir = path.join(basePath, ".cursor", "docs");
  const rulesDir = path.join(basePath, ".cursor", "rules");

  // Ensure rules directory exists
  if (!fs.existsSync(rulesDir)) {
    fs.mkdirSync(rulesDir, { recursive: true });
  }

  const globalMdcPath = path.join(rulesDir, "global.mdc");

  // Check if .cursor directory exists
  if (!fs.existsSync(path.join(basePath, ".cursor"))) {
    console.error(chalk.red("Error: .cursor directory not found"));
    console.log(chalk.yellow("Make sure you're in a Cursor project directory"));
    process.exit(1);
  }

  console.log(chalk.blue("Processing documentation..."));

  let content = `---
description: Global rules and documentation index
---

# Cursor Rules are extra documentation provided by the user to help the AI understand the codebase.\n\n`;

  // Process all documentation files
  if (fs.existsSync(docsDir)) {
    const docCategories = new Map();

    // Get all .md and .mdc files
    const docFiles = [
      ...getAllFiles(docsDir, [], ".md"),
      ...getAllFiles(docsDir, [], ".mdc"),
    ].sort();

    console.log(chalk.gray(`Found ${docFiles.length} documentation files`));

    // Categorize files by their parent directory
    docFiles.forEach((file) => {
      const relativePath = file
        .replace(basePath + path.sep, "")
        .replace(/\\/g, "/");
      const displayName = path.basename(file);
      const docFolder = path
        .dirname(relativePath)
        .split("/")
        .slice(2)
        .join("/");

      if (!docCategories.has(docFolder)) {
        docCategories.set(docFolder, []);
      }
      docCategories.get(docFolder).push({ displayName, relativePath });
    });

    // Add documentation to content
    for (const [docFolder, files] of docCategories) {
      const isRootFolder = docFolder === "";
      if (isRootFolder) continue;

      console.log(chalk.gray(`Processing documentation for: ${docFolder}`));
      content += `## ${docFolder}\n`;
      files.forEach(({ displayName, relativePath }) => {
        content += `- [${displayName}](mdc:${relativePath})\n`;
      });
      content += "\n";
    }
  } else {
    console.log(
      chalk.yellow("No docs directory found. Creating empty global.mdc file.")
    );
  }

  // Write the content to global.mdc
  try {
    fs.writeFileSync(globalMdcPath, content);
    console.log(chalk.green("✓ Successfully generated global.mdc"));
    console.log(chalk.gray("\nFile location:"), chalk.white(globalMdcPath));
  } catch (error) {
    console.error(chalk.red("Error writing global.mdc:"), error.message);
    process.exit(1);
  }
}

function showExamples() {
  console.log(chalk.blue("\nCursor Rules Examples:"));

  console.log(chalk.yellow("\nBasic Structure:"));
  console.log(`
.cursor/
└── docs/
    ├── components/
    │   └── button.md
    └── api/
        └── endpoints.md`);

  console.log(chalk.yellow("\nCommand:"));
  console.log(`
# Generate documentation index
cursor-rules`);
}

// CLI configuration
program
  .name("cursor-rules")
  .description("CLI tool to generate Cursor rules documentation")
  .version("1.0.0")
  .option("--examples", "show example usage patterns")
  .action((options) => {
    if (options.examples) {
      showExamples();
      process.exit(0);
    }

    try {
      generateGlobalRules();
    } catch (error) {
      console.error(chalk.red("\nError:"), error.message);
      process.exit(1);
    }
  });

program.parse();
