# Cursor Rules CLI

A command-line tool to automatically generate and manage Cursor rules documentation.

## Quick Start

```bash
# Clone and setup
git clone https://github.com/yourusername/cursor-rules.git
cd cursor-rules
pnpm install-cli

# Or with npm
npm run setup
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
{{@import @react}}

## API Documentation
{{@import @api}}

## Examples
{{@import @examples}}
```

## Import Syntax

Use the `@` prefix to import documentation from `.cursor/docs/`:

```markdown
# Import all .md files from a directory
{{@import @react}}              -> .cursor/docs/react/**/*.md
{{@import @api}}               -> .cursor/docs/api/**/*.md

# Import from subdirectories
{{@import @react/components}}  -> .cursor/docs/react/components/**/*.md
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
pnpm generate

# Or with npm
npm run generate
```

## Uninstalling

```bash
# Remove global package
rm -rf ~/Library/pnpm/global/5/node_modules/cursor-rules-cli

# Clean pnpm store (optional)
rm -rf ~/.pnpm-store/v3/tmp/cursor-rules-cli
```