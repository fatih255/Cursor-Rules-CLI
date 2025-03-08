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

function parseMetadata(content) {
  const metadataRegex = /^---([\s\S]*?)---/;
  const match = content.match(metadataRegex);
  if (!match) return { content, metadata: {} };

  const metadataStr = match[1];
  const metadata = {};
  metadataStr.split('\n').forEach(line => {
    const [key, ...values] = line.split(':').map(s => s.trim());
    if (key && values.length) metadata[key] = values.join(':');
  });

  return {
    content: content.slice(match[0].length).trim(),
    metadata
  };
}

function logHeader(message) {
  console.log(chalk.blue(`\n🔄 ${message}`));
}

function logSubHeader(message) {
  console.log(chalk.gray(`   ${message}`));
}

function logImportStart(importPath, fullPath) {
  const shortPath = fullPath.split('/docs/')[1];
  console.log(chalk.blue(`\n📂 ${importPath}`));
  console.log(chalk.gray(`   → .cursor/docs/${shortPath}`));
}

function logImportSuccess(files, importPath) {
  const fileWord = files.length === 1 ? 'file' : 'files';
  console.log(chalk.green(`   ✓ ${files.length} ${fileWord} found`));
}

function logImportWarning(message) {
  console.log(chalk.yellow(`   ⚠️  ${message}`));
}

function logSuccess(filePath) {
  const shortPath = filePath.split('/docs/')[1] || filePath;
  console.log(chalk.green("\n✨ Documentation generated successfully"));
  console.log(chalk.gray(`   → ${shortPath}`));
  console.log(); // Empty line at the end
}

function processImports(content, basePath, currentDir) {
  const importRegex = /{{([^}]+)}}/g;
  return content.replace(importRegex, (match, importStr) => {
    const importPath = importStr.trim();
    
    if (!importPath.startsWith('@')) return match;

    const actualPath = path.join(basePath, '.cursor/docs', importPath.slice(1));
    
    logImportStart(importPath, actualPath);
    
    if (!fs.existsSync(actualPath)) {
      logImportWarning('Directory not found');
      return '';
    }

    if (fs.statSync(actualPath).isDirectory()) {
      const files = [...getAllFiles(actualPath, [], ".md"), ...getAllFiles(actualPath, [], ".mdc")]
        .sort()
        .map(file => {
          const content = fs.readFileSync(file, 'utf-8');
          const { metadata } = parseMetadata(content);
          const relativePath = file.replace(basePath + path.sep, '').replace(/\\/g, '/');
          return {
            title: metadata.title || path.basename(file, '.md'),
            description: metadata.description || '',
            path: relativePath
          };
        });

      if (files.length === 0) {
        logImportWarning('No markdown files found');
        return '';
      }

      logImportSuccess(files, importPath);
      return files.map(file => 
        `### ${file.title}\n${file.description ? file.description + '\n\n' : ''}[View Documentation](mdc:${file.path})\n`
      ).join('\n');
    } else {
      const content = fs.readFileSync(actualPath, 'utf-8');
      return processContent(content, basePath, path.dirname(actualPath));
    }
  });
}

function processContent(content, basePath, currentDir) {
  const { metadata, content: mainContent } = parseMetadata(content);
  return processImports(mainContent, basePath, currentDir);
}

function generateGlobalRules() {
  const basePath = process.cwd();
  const docsDir = path.join(basePath, ".cursor", "docs");
  const rulesDir = path.join(basePath, ".cursor", "rules");
  
  if (!fs.existsSync(rulesDir)) {
    fs.mkdirSync(rulesDir, { recursive: true });
  }
  
  const globalMdcPath = path.join(rulesDir, "global.mdc");
  const contentPath = path.join(docsDir, "@content.md");

  if (!fs.existsSync(path.join(basePath, ".cursor"))) {
    console.error(chalk.red("\n❌ Error: .cursor directory not found"));
    console.log(chalk.yellow("   Make sure you're in a Cursor project directory"));
    process.exit(1);
  }

  logHeader("Processing documentation");

  let content = '';
  
  if (fs.existsSync(contentPath)) {
    logSubHeader("Found @content.md");
    const rawContent = fs.readFileSync(contentPath, 'utf-8');
    const { metadata, content: mainContent } = parseMetadata(rawContent);
    
    content = `---
description: ${metadata.description || 'Global rules and documentation index'}
---

# ${metadata.title || 'Cursor Rules Documentation'}

${processContent(rawContent, basePath, docsDir)}\n`;
  } else {
    // Default content generation
    content = `---
description: Global rules and documentation index
---

# Cursor Rules Documentation\n\n`;

    if (fs.existsSync(docsDir)) {
      const docCategories = new Map();
      const docFiles = [...getAllFiles(docsDir, [], ".md"), ...getAllFiles(docsDir, [], ".mdc")].sort();

      console.log(chalk.gray(`Found ${docFiles.length} documentation files`));

      docFiles.forEach(file => {
        if (path.basename(file) === '@content.md') return;
        
        const relativePath = file.replace(basePath + path.sep, "").replace(/\\/g, "/");
        const fileContent = fs.readFileSync(file, 'utf-8');
        const { metadata } = parseMetadata(fileContent);
        const displayName = metadata.title || path.basename(file);
        const category = path.dirname(relativePath).split("/").slice(2).join("/");
        
        if (!docCategories.has(category)) {
          docCategories.set(category, []);
        }
        docCategories.get(category).push({ 
          displayName, 
          relativePath,
          description: metadata.description || ''
        });
      });

      for (const [category, files] of docCategories) {
        if (category === '') continue;
        console.log(chalk.gray(`Processing category: ${category}`));
        content += `## ${category}\n`;
        files.forEach(({ displayName, relativePath, description }) => {
          content += `### ${displayName}\n`;
          if (description) content += `${description}\n\n`;
          content += `[View Documentation](mdc:${relativePath})\n\n`;
        });
      }
    }
  }

  try {
    fs.writeFileSync(globalMdcPath, content);
    logSuccess(globalMdcPath);
  } catch (error) {
    console.error(chalk.red("\n❌ Error writing global.mdc:"), error.message);
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
    │   └── button.md or button.mdc
    └── api/
        └── endpoints.md or endpoints.mdc`);

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
