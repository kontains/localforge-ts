# Changelog
All notable changes to **Localforge** will be documented in this file.  
This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) conventions and uses [Semantic Versioning](https://semver.org/).

## [1.0.14] – 2025-04-25
* Chat messages context now show system prompt
* Fixed bug with simultaneous tool call + content response
* Total refactor for CSS structure and support for multiple themes (introduced light/dark mode)
* Auto updating feature for npm case
* Added support for creating agent flavours for system prompt, model and tool overrides per chat
* Added Caramel Latte & Dark Coffee themes

---

## [1.0.11] – 2025-04-25
### Added
- **Prompt Editor** – edit prompts as drag-n-drop blocks (foundation for a future system-prompt library).
- **New LLM providers**: Anthropic (Claude), Google Gemini, Google Vertex AI, and **Ollama**.
- **Custom base-URL support** for all providers, bringing the roster to:  
  *OpenAI, Azure OpenAI, DeepSeek, Groq, Anyscale, Fireworks, Together, Mistral, Perplexity, OpenRouter, Gemini, Vertex AI, Claude, Ollama.*
- **Settings dialog 2.0**
    - Split “Web Fetch” options into its own tab.
    - Models tab now shows provider types.
    - Full CRUD for providers (create, edit, delete).
    - Three independent model-preset slots (aux, main, expert) – each can point to any provider.

### Changed
- **LLM middleware refactor** – nuked the spaghetti; now lean, readable, and provider-agnostic.

### Fixed
- First user message is no longer accidentally duplicated in LLM conversations.

### Removed
- Dead “shitcode” purged from middleware.
