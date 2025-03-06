# Cursor Rules CLI

A command-line tool to automatically generate and manage Cursor rules documentation.

<img src="https://github.com/user-attachments/assets/d30f0b7b-95c4-4396-9cfc-c6c2ffc52331" alt="Cursor folder tagging feature"  width="700" />

## Cursor Rules CLI - Result
<img src="https://github.com/user-attachments/assets/0ffa29f5-febb-4ab0-9304-306a371f772c" alt="Cursor Rules CLI" width="700" />

## Components

### 1. Cursor Rules CLI
The main tool for generating and managing Cursor documentation.

### 2. Firecrawl to Cursor Documentation Converter
A lightweight service that converts Firecrawl API scraped content into formatted documentation files (.mdc) for Cursor.

You can use the Firecrawl API response directly with this service to automatically create properly formatted documentation files in the `./docs` directory. This simplifies the process of importing external documentation into your Cursor rules.

```bash
# Navigate to the converter directory
cd firecrawl-to-doc-files-cursor

# Install dependencies
npm install

# Start the service
npm start
```

The converter service runs on port 3000 by default and provides an API endpoint to transform Firecrawl scraped documentation into properly formatted MDC files with frontmatter. For more details, see the [Firecrawl Converter README](firecrawl-to-doc-files-cursor/README.md).

## Quick Start

```bash
# Clone and setup
git clone https://github.com/yourusername/cursor-rules.git
cd cursor-rules
pnpm install-cli

# Or with npm
npm run install-cli
```

That's it! The CLI is now installed globally on your system.

## Usage

```bash
# Generate documentation index
cursor-rules

# Show examples
cursor-rules --examples
```

## Documentation Structure

Create a `.cursor/docs/@content.md` file to organize your documentation:

```markdown
# Framework Documentation

## React Guidelines
{{@react}}

## API Documentation
{{@api}}

## Examples
{{@examples}}
```

## Import Syntax

Use the `@` prefix to import documentation from `.cursor/docs/`:

```markdown
# Import all .md files from a directory
{{@react}}              -> .cursor/docs/react/**/*.md
{{@api}}               -> .cursor/docs/api/**/*.md

# Import from subdirectories
{{@react/components}}  -> .cursor/docs/react/components/**/*.md
```

## Directory Structure

```
.cursor/
├── docs/
│   ├── @content.md          # Main documentation file
│   ├── react/              # React documentation
│   │   ├── components.md
│   │   └── hooks.md
│   └── api/               # API documentation
│       └── endpoints.md
└── rules/
    └── global.mdc        # Auto-generated index
```

## Documentation Tagging System

Each documentation file should include a YAML frontmatter with tags to help organize and categorize the content. This helps in automatically generating the documentation index and makes it easier to find relevant documentation.

### Tag Structure

```yaml
---
description: A brief description of what this documentation covers
globs: List of file patterns this documentation applies to (e.g., *.ts, *.tsx)
---
```

### Example

```yaml
---
description: Establishes best practices for build automation, dependency management, and deployment workflows.
globs: *.ts, *.tsx, *.js, *.jsx, *.py, *.java, *.json, Dockerfile, docker-compose.yml, Makefile
---
```

### Benefits of Tagging
- **Automatic Categorization**: Files are automatically organized based on their tags
- **Easy Discovery**: Quickly find documentation relevant to specific file types or topics
- **Clear Scope**: Each document clearly states what types of files or processes it covers
- **Better Organization**: Helps maintain a structured documentation system

## Development

```bash
# Just generate documentation index without installation
pnpm generate-rules

# Or with npm
npm run generate-rules
```

## Uninstalling

```bash
# Remove global package
rm -rf ~/Library/pnpm/global/5/node_modules/cursor-rules-cli

# Clean pnpm store (optional)
rm -rf ~/.pnpm-store/v3/tmp/cursor-rules-cli
```
