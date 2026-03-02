# Portfolio Website

## Setup

### Prerequisites
- Node.js installed
- Git installed
- Claude Code CLI installed

### Environment Setup

1. Copy `.env` and add your API tokens:
   - `VERCEL_API_TOKEN` - Get from https://vercel.com/account/tokens
   - `SUPABASE_API_KEY` - Get from https://app.supabase.com → Project → Settings → API
   - `GITHUB_TOKEN` - (Optional) Get from https://github.com/settings/tokens

2. Start Claude Code with environment variables:
   ```powershell
   .\start-claude.ps1
   ```

## MCP Servers Configured

- **GitHub** - GitHub integration via MCP
- **Vercel** - Deploy and manage Vercel projects
- **Supabase** - Database and backend services
- **Stitch** - Google's design-to-code platform
- **React Bits** - 135+ animated React components

## Verify MCP Servers

Inside Claude Code:
```
/mcp
```

## Project Structure

```
portfolio_website/
├── .claude/
│   └── settings.json      # Full access mode enabled
├── .mcp.json              # MCP server configurations
├── .env                   # API tokens (not committed)
├── .gitignore            # Protects sensitive files
├── start-claude.ps1      # Helper script to load env vars
└── README.md             # This file
```
