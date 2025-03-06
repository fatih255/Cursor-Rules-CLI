const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const prettier = require("prettier");
const axios = require("axios");

// Increase JSON payload limit to 50MB
const app = express();
app.use(express.json({ limit: "50mb" }));
// Increase URL-encoded payload limit as well
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Default timeout for API requests (30 seconds)
const API_TIMEOUT = 30000;
// Default polling interval (2 seconds)
const POLLING_INTERVAL = 2000;

// Markdown beautifier function
async function beautifyMarkdown(markdown) {
  if (!markdown) return "";

  try {
    // Use prettier to format markdown
    const formattedMarkdown = await prettier.format(markdown, {
      parser: "markdown",
      proseWrap: "always",
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      singleQuote: false,
    });

    return formattedMarkdown;
  } catch (error) {
    console.error("Error formatting markdown:", error);
    // Fallback to original markdown if prettier fails
    return markdown;
  }
}

// Process Firecrawl response data and create .mdc files
async function processFirecrawlData(documents, options = {}) {
  // Set default options
  const { globs = "backend/src" } = options;

  if (!Array.isArray(documents)) {
    throw new Error("Documents must be an array");
  }

  // Create docs directory if it doesn't exist
  await fs.mkdir(path.join(__dirname, "../docs"), { recursive: true });

  return Promise.all(
    documents.map(async (doc) => {
      const { markdown, metadata } = doc;

      // Sanitize title for filename
      const title = metadata.title
        ? metadata.title.replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase()
        : `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Beautify markdown content
      const beautifiedMarkdown = (await beautifyMarkdown(markdown)).replace(
        /@.*\n/g,
        ""
      );

      // Get the content URL from metadata
      const contentUrl = metadata.url || metadata.contentUrl || '';

      // Create MDC content with source URL in frontmatter
      const mdcContent = `---
title: ${metadata.title || ""}
description: ${metadata.description || ""}
globs: ${globs}
---

from: ${contentUrl}

${beautifiedMarkdown}`;

      // Write to file
      const filePath = path.join(__dirname, "docs", `${title}.mdc`);
      await fs.writeFile(filePath, mdcContent, "utf8");

      return {
        title,
        filePath: `/firecrawl-response-to-cursor-mdc/docs/${title}.mdc`,
      };
    })
  );
}

// Function to poll job status until completion
async function pollJobStatus(jobId, apiKey, operationType) {
 
  // Updated URL format based on Firecrawl API documentation
  let statusUrl;
  if (operationType === "batch/scrape") {
    statusUrl = `https://api.firecrawl.dev/v1/batch/scrape/${jobId}`;
  } else {
    statusUrl = `https://api.firecrawl.dev/v1/${operationType === "crawl" ? "crawl" : "scrape"}/${jobId}`;
  }
  console.log(`Polling status for job ${jobId} at ${statusUrl}`);

  let completed = false;
  let statusResponse;
  let attempts = 0;

  while (!completed && attempts < 60) {
    // Limit to 60 attempts (2 minutes with 2s interval)
    attempts++;
    try {
      console.log(`Polling attempt ${attempts} for job ${jobId}...`);
      statusResponse = await axios.get(statusUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: API_TIMEOUT,
      });

      if (statusResponse.data.status === "completed") {
        console.log(`Job ${jobId} completed successfully!`);
        completed = true;
      } else if (statusResponse.data.status === "failed") {
        throw new Error(
          `Job failed: ${statusResponse.data.error || "Unknown error"}`
        );
      } else {
        console.log(
          `Job ${jobId} status: ${statusResponse.data.status}. Waiting...`
        );
        // Wait before polling again
        await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
      }
    } catch (error) {
      console.error(`Error polling job status: ${error.message}`);
      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
    }
  }

  if (!completed) {
    throw new Error(
      `Job ${jobId} did not complete after maximum polling attempts`
    );
  }

  return statusResponse.data;
}

// MDC generation endpoint
app.post("/api/generate-mdc-docs", async (req, res) => {
  try {
    const { firecrawlRequest, mdcOptions = {} } = req.body;

    if (!firecrawlRequest) {
      return res.status(400).json({
        success: false,
        error: "firecrawlResponse object is required",
      });
    }

    const { url, apiKey, body } = firecrawlRequest;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: "firecrawlResponse.url is required",
      });
    }

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: "firecrawlResponse.apiKey is required",
      });
    }

    if (!body) {
      return res.status(400).json({
        success: false,
        error: "firecrawlResponse.body is required",
      });
    }

    // Add request size validation
    const requestSize = JSON.stringify(req.body).length;
    if (requestSize > 50 * 1024 * 1024) {
      // 50MB in bytes
      return res.status(413).json({
        success: false,
        error: "Request payload too large. Maximum size is 50MB.",
      });
    }

    // Determine operation type
    let operationType;
    if (url.includes("/batch/scrape")) {
      operationType = "batch/scrape";
      console.log(`Sending batch scrape request to Firecrawl API for ${body.urls?.length || 0} URLs`);
    } else if (url.includes("/crawl")) {
      operationType = "crawl";
      console.log(`Sending crawl request to Firecrawl API for ${body.url}`);
    } else if (url.includes("/scrape")) {
      operationType = "scrape";
      console.log(`Sending scrape request to Firecrawl API for ${body.urls?.length || 0} URLs`);
    } else {
      operationType = "unknown";
      console.log(`Sending request to Firecrawl API: ${url}`);
    }

    const scrapeOptions = {
      formats: ["markdown"],
      excludeTags: ["img", "a", "button"],
      onlyMainContent: true,
      waitFor: 2000,
    };

    const apiResponse = await axios.post(
      url,
      {
        ...body,
        ...(operationType === "scrape" ? { ...scrapeOptions } : {}),
        ...(operationType === "crawl" ? { scrapeOptions } : {}),
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: API_TIMEOUT,
      }
    );

    if (!apiResponse.data.success) {
      return res.status(400).json({
        success: false,
        error: `Firecrawl API ${operationType} request failed`,
        firecrawlResponse: apiResponse.data,
      });
    }

    // Get the job ID
    const jobId = apiResponse.data.id;
    if (!jobId) {
      // Handle direct content response (non-async case)
      console.log("No job ID returned. Processing direct content response.");

      // Check if we have direct markdown content
      if (
        apiResponse.data &&
        apiResponse.data.data &&
        apiResponse.data.data.markdown
      ) {
        // Extract a proper title from metadata or markdown content
        let title = "untitled-document";
        const metadata = apiResponse.data.data.metadata || {};

        // Try to extract title from metadata (check common title fields)
        if (metadata.title) {
          title = metadata.title.split("|")[0].trim(); // Get the first part before any pipe symbol
        } else if (metadata.ogTitle) {
          title = metadata.ogTitle.split("|")[0].trim();
        } else if (metadata["twitter:title"]) {
          title = metadata["twitter:title"].split("|")[0].trim();
        } else if (metadata["og:title"]) {
          title = metadata["og:title"].split("|")[0].trim();
        } else {
          // Try to extract title from markdown content by looking for headings
          const markdown = apiResponse.data.data.markdown;
          const headingMatch =
            markdown.match(/^\s*#\s+(.+)$/m) || // Look for # Heading
            markdown.match(/^\s*(.+)\s*\n\s*={2,}\s*$/m) || // Look for Heading\n====
            markdown.match(/^\s*(.+)\s*\n\s*-{2,}\s*$/m); // Look for Heading\n----

          if (headingMatch) {
            title = headingMatch[1].trim();
          } else {
            // Try to find the first non-link substantial line as potential title
            const lines = markdown
              .split("\n")
              .filter((line) => line.trim().length > 0);
            for (const line of lines) {
              const trimmedLine = line.trim();
              // Skip lines that are just links or formatting
              if (
                !trimmedLine.startsWith("[") &&
                !trimmedLine.startsWith("!") &&
                trimmedLine.length > 10
              ) {
                title = trimmedLine;
                break;
              }
            }
          }
        }

        // Create a document structure similar to what's expected by processFirecrawlData
        const documents = [
          {
            markdown: apiResponse.data.data.markdown,
            metadata: {
              title: title,
              description:
                metadata.description ||
                metadata.ogDescription ||
                metadata["twitter:description"] ||
                "",
              // Add the URL from metadata to be used as the content source
              url: metadata.url || metadata.ogUrl || metadata["og:url"] || body.url || "",
            },
          },
        ];

        try {
          // Process the documents directly
          const results = await processFirecrawlData(documents, mdcOptions);

          return res.json({
            success: true,
            processedDocuments: results,
            operationType,
            originalResponse: apiResponse.data,
          });
        } catch (error) {
          console.error("Error processing direct content:", error);
          return res.status(500).json({
            success: false,
            error: error.message,
            details: "Error processing direct content response",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          error: "No job ID or direct markdown content found in API response",
          firecrawlResponse: apiResponse.data,
        });
      }
    }

    console.log(`Job submitted successfully. Job ID: ${jobId}`);

    try {
      // Poll until job is complete
      const jobResult = await pollJobStatus(jobId, apiKey, operationType);
      console.log(
        "jobResultMetadata",
        jobResult.data.map((doc) => doc.metadata)
      );
      // Process the documents
      const documents = jobResult.data;

      if (!Array.isArray(documents)) {
        return res.status(400).json({
          success: false,
          error: "Retrieved data is not an array of documents",
          details: jobResult,
        });
      }

      const results = await processFirecrawlData(documents, mdcOptions);

      res.json({
        success: true,
        jobId: jobId,
        processedDocuments: results,
        operationType,
        originalResponse: {
          success: jobResult.success,
          status: jobResult.status,
          completed: jobResult.completed,
          total: jobResult.total,
          creditsUsed: jobResult.creditsUsed,
          expiresAt: jobResult.expiresAt,
        },
      });
    } catch (error) {
      console.error("Error polling job status:", error);
      res.status(500).json({
        success: false,
        error: error.message,
        details: "Error while polling for job completion",
      });
    }
  } catch (error) {
    console.error("Error in Firecrawl API request:", error);
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.message,
      details: error.response?.data || "Unknown error",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `API endpoint available at: http://localhost:${PORT}/api/generate-mdc-docs`
  );
  console.log(
    `This endpoint forwards requests to Firecrawl API and converts responses to MDC files`
  );
});
