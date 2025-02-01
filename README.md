# Cursor Rules CLI

A command-line tool to automatically generate and manage Cursor rules documentation.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/cursor-rules.git
cd cursor-rules

# Install with pnpm (recommended)
pnpm install
pnpm install-cli

# Or with npm
npm install
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

## Options

- `--examples`: Show example usage patterns

## Example Directory Structure

```
.cursor/
└── docs/
    ├── components/
    │   └── button.md
    └── api/
        └── endpoints.md
```

## Development

```bash
# Just generate documentation index without installation
pnpm generate-rules

# Or with npm
npm run generate-rules
```

## Troubleshooting

If you get pnpm store errors:

```bash
# 1. Clean old installations
rm -rf ~/Library/pnpm/global/5/node_modules/cursor-rules-cli
rm -rf ~/.pnpm-store/v3/tmp/cursor-rules-cli

# 2. Update pnpm
npm install -g pnpm@latest

# 3. Install dependencies and CLI
pnpm install
pnpm install-cli
```

## Uninstalling

```bash
# Remove global package
rm -rf ~/Library/pnpm/global/5/node_modules/cursor-rules-cli

# Clean pnpm store (optional)
rm -rf ~/.pnpm-store/v3/tmp/cursor-rules-cli
```