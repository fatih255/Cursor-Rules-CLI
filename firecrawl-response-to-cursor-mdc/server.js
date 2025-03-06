const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const prettier = require("prettier");

// Increase JSON payload limit to 50MB
const app = express();
app.use(express.json({ limit: "50mb" }));
// Increase URL-encoded payload limit as well
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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

app.post("/api/docs", async (req, res) => {
  try {
    const { data: documents } = req.body;

    if (!Array.isArray(documents)) {
      return res.status(400).json({
        success: false,
        error: "Documents must be an array",
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

    // Create docs directory if it doesn't exist
    await fs.mkdir(path.join(__dirname, "../docs"), { recursive: true });

    const results = await Promise.all(
      documents.map(async (doc) => {
        const { markdown, metadata } = doc;

        // Sanitize title for filename
        const title = metadata.title
          ? metadata.title.replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase()
          : `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Beautify markdown content
        const beautifiedMarkdown = await beautifyMarkdown(markdown);

        // Create MDC content
        const mdcContent = `---
title: ${metadata.title || ""}
description: ${metadata.description || ""}
globs: backend/src
---

${beautifiedMarkdown}`;

        // Write to file
        const filePath = path.join(__dirname, "../docs", `${title}.mdc`);
        await fs.writeFile(filePath, mdcContent, "utf8");

        return {
          title,
          filePath: `docs/${title}.mdc`,
        };
      })
    );

    res.json({
      success: true,
      processedDocuments: results,
    });
  } catch (error) {
    console.error("Error saving documents:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
