# Firecrawl to Cursor Documentation Converter

A lightweight service that converts Firecrawl API scraped content into formatted documentation files (.mdc) for Cursor.

## Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

## Usage

1. Start the server:
   ```bash
   npm start
   # or
   yarn start
   ```

2. The server runs on port 3000 by default (configurable via PORT environment variable)

## API

### POST /api/docs

Converts Firecrawl API results into properly formatted .mdc files with frontmatter.

#### Request Example

```bash
curl --location 'http://localhost:3000/api/docs' \
--header 'Content-Type: application/json' \
--data-raw '{
    "success": true,
    "status": "completed",
    "completed": 201,
    "total": 201,
    "creditsUsed": 201,
    "expiresAt": "2025-02-22T17:49:01.000Z",
    "data": [
        {
            "markdown":"sample markdown",
            "metadata": {
                "title": "ClientBuilder in milvus::client - Rust",
                "description": "API documentation for the Rust `ClientBuilder` struct in crate `milvus`.",
                "sourceURL": "https://docs.rs/milvus-sdk-rust/latest/milvus/client/struct.ClientBuilder.html",
                "url": "https://docs.rs/milvus-sdk-rust/latest/milvus/client/struct.ClientBuilder.html"
            }
        }
    ]
}'
```

#### Response Format

```json
{
  "success": true,
  "processedDocuments": [
    {
      "title": "clientbuilder-in-milvus-client-rust",
      "filePath": "docs/clientbuilder-in-milvus-client-rust.mdc"
    }
  ]
}
```

## Features

- Converts Firecrawl scraped content into .mdc files for Cursor
- Automatically formats markdown with Prettier
- Handles large payloads (up to 50MB)
- Creates sanitized filenames from document titles
- Adds standardized frontmatter for Cursor documentation
- Stores files in the `docs` directory

## Output Format

Each processed document creates an .mdc file with the structure:

```markdown
---
title: Original Document Title
description: Document Description
globs: backend/src
---

[Beautified markdown content]
```

## Technical Details

- Written in Node.js with Express
- Uses Prettier for markdown formatting
- Output files use Markdown with frontmatter format (.mdc)
- Generated filenames are sanitized versions of document titles