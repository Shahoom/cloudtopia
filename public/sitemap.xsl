<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>

    <xsl:template match="/">
        <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <title>CloudTopia Sitemap</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <style>
                    :root {
                        --bg: #f8fafc;
                        --surface: #ffffff;
                        --text: #0f172a;
                        --muted: #64748b;
                        --border: #e2e8f0;
                        --accent: #0ea5e9;
                        --accent-2: #6366f1;
                    }
                    * { box-sizing: border-box; }
                    body {
                        margin: 0;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background: var(--bg);
                        color: var(--text);
                        line-height: 1.6;
                    }
                    .container { max-width: 1280px; margin: 0 auto; padding: 40px 24px; }
                    header {
                        background: linear-gradient(135deg, var(--accent), var(--accent-2));
                        color: white;
                        padding: 40px 24px;
                        margin-bottom: 32px;
                        border-radius: 16px;
                        box-shadow: 0 4px 24px rgba(14, 165, 233, 0.15);
                    }
                    h1 { margin: 0 0 8px; font-size: 28px; font-weight: 800; letter-spacing: -0.02em; }
                    header p { margin: 0; opacity: 0.9; font-size: 15px; }
                    .stats {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 12px;
                        margin: 24px 0;
                    }
                    .stat {
                        background: var(--surface);
                        border: 1px solid var(--border);
                        border-radius: 12px;
                        padding: 16px;
                    }
                    .stat-label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
                    .stat-value { font-size: 24px; font-weight: 800; color: var(--text); margin-top: 4px; }
                    table {
                        width: 100%;
                        background: var(--surface);
                        border: 1px solid var(--border);
                        border-radius: 12px;
                        border-collapse: separate;
                        border-spacing: 0;
                        overflow: hidden;
                        font-size: 14px;
                    }
                    th {
                        text-align: left;
                        padding: 12px 16px;
                        background: #f1f5f9;
                        font-weight: 700;
                        font-size: 12px;
                        text-transform: uppercase;
                        color: var(--muted);
                        letter-spacing: 0.06em;
                        border-bottom: 1px solid var(--border);
                    }
                    td {
                        padding: 12px 16px;
                        border-bottom: 1px solid var(--border);
                        vertical-align: top;
                    }
                    tr:last-child td { border-bottom: none; }
                    tr:hover td { background: #f8fafc; }
                    a { color: var(--accent); text-decoration: none; word-break: break-all; }
                    a:hover { text-decoration: underline; }
                    .priority { font-variant-numeric: tabular-nums; color: var(--muted); font-size: 13px; }
                    .lastmod { color: var(--muted); font-size: 13px; font-variant-numeric: tabular-nums; white-space: nowrap; }
                    .img-count { display: inline-block; padding: 2px 8px; background: #e0f2fe; color: #0369a1; border-radius: 999px; font-size: 11px; font-weight: 600; }
                    footer { margin-top: 32px; color: var(--muted); font-size: 13px; text-align: center; }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>CloudTopia Sitemap</h1>
                        <p>This is the XML sitemap consumed by search engines. Stylesheet for human readability — search engines ignore the styling.</p>
                    </header>

                    <div class="stats">
                        <div class="stat">
                            <div class="stat-label">Total URLs</div>
                            <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">URLs with images</div>
                            <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[image:image])"/></div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">URLs with hreflang</div>
                            <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[xhtml:link])"/></div>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Last modified</th>
                                <th>Priority</th>
                                <th>Images</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="sitemap:urlset/sitemap:url">
                                <tr>
                                    <td>
                                        <a>
                                            <xsl:attribute name="href"><xsl:value-of select="sitemap:loc"/></xsl:attribute>
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                    </td>
                                    <td class="lastmod">
                                        <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                                    </td>
                                    <td class="priority">
                                        <xsl:value-of select="sitemap:priority"/>
                                    </td>
                                    <td>
                                        <xsl:if test="image:image">
                                            <span class="img-count">
                                                <xsl:value-of select="count(image:image)"/>
                                                <xsl:text> img</xsl:text>
                                            </span>
                                        </xsl:if>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>

                    <footer>
                        Generated by Next.js · CloudTopia · <a href="/">cloudtopia.net</a>
                    </footer>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
