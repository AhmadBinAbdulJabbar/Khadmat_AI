# Provider AI Chat

## Feature Overview
The Provider AI Chat is a natural language interface for service providers to manage their jobs, check their earnings, control their schedule, and accept/decline new requests. It uses Khadmat AI's backend to process commands and automatically trigger the appropriate API calls.

## Components
- **AI Header**: Contextual header showing AI status.
- **Shortcuts**: Pre-defined prompt buttons for quick queries (New requests, Today earnings, Tomorrow schedule, Go offline, Accept all).
- **Messages Area**: Standard chat interface with AI replies potentially embedding rich UI elements like inline job cards or earnings summaries.
- **Input Area**: Text input with send button for chatting.

## Database
- Depends on `provider_settings`, `jobs`, `users`.

## API Endpoints
- `POST /api/provider/ai-chat`: Processes user messages and returns AI response.
- Uses existing job acceptance/schedule/earnings APIs implicitly via AI function calling.
