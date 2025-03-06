# Firecrawl to Cursor Documentation Converter

## Example 1: Single URL

```bash
curl --location 'http://localhost:3000/api/generate-mdc-docs' \
--header 'Content-Type: application/json' \
--data '{
  "firecrawlRequest": {
    "url": "https://api.firecrawl.dev/v1/scrape",
    "apiKey": "YOUR_FIRECRAWL_API_KEY",
    "body": {
      "url": "https://www.cursor.com/en/blog/cpc"
    }
  },
  "mdcOptions": {
    "globs": "src/**/*.rs"
  }
}'
```

## Example 2: Multiple URL

```bash
curl --location 'http://localhost:3000/api/generate-mdc-docs' \
--header 'Content-Type: application/json' \
--data '{
    "firecrawlRequest": {
        "url": "https://api.firecrawl.dev/v1/batch/scrape",
        "apiKey": "YOUR_FIRECRAWL_API_KEY",
        "body": {
            "urls": [
                "https://www.cursor.com/blog/cpc",
                "https://www.cursor.com/blog/series-b"
            ]
        }
    },
    "mdcOptions": {
        "globs": "src/**/*.rs"
    }
}'
```

## Example 3: Multiple URL with asterix(*)

```bash
curl --location 'http://localhost:3000/api/generate-mdc-docs' \
--header 'Content-Type: application/json' \
--data '{
    "firecrawlRequest": {
        "url": "https://api.firecrawl.dev/v1/crawl",
        "apiKey": "YOUR_FIRECRAWL_API_KEY",
        "body": {
            "url": "https://nextjs.org/",
            "includePaths": [
                "docs/app/*"
            ],
            "maxDepth": 5,
            "limit": 10
        }
    },
    "mdcOptions": {
        "globs": "src/**/*.rs"
    }
}'
```