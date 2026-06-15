---
name: get-pricing
description: Retrieve CloudTopia's pricing model and the machine-readable pricing documents.
---

# Get CloudTopia Pricing

CloudTopia uses **fixed-scope, transparent pricing**: scope and price are agreed
in a written proposal *before* any build begins, so buyers can compare clearly.
Services are modular — you pay only for what you choose, with no forced bundles.

## Machine-readable pricing documents
- English: https://cloudtopia.net/pricing.md
- Arabic:  https://cloudtopia.net/pricing.ar.md

## Via the MCP server
Call tool `get_pricing` at https://cloudtopia.net/api/mcp — it returns the
pricing document content plus the canonical URLs.

## Getting a precise quote
Pricing depends on scope. To get a tailored quote, use the `contact-cloudtopia`
skill (WhatsApp, email, or `POST /api/contact`).
