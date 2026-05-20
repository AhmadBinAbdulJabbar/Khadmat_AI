# Antigravity Usage Video Script

Target length: 2-3 minutes.

## 0:00-0:25 - Open Project

Show the repository in Google Antigravity / the Antigravity coding environment.

Say:

> We used Google Antigravity as the central development and orchestration environment for the agent workflow.

## 0:25-1:10 - Show Agent Pipeline

Open:

- `lib/agentic.ts`
- `backend/agents/orchestrator.py`

Say:

> The system is built around an Antigravity-style orchestration pipeline: Planner, Intent, Discovery, Decision, Booking, and Follow-up agents.

Highlight:

- `runServiceOrchestration`
- `process_service_request`
- provider ranking
- trace step generation

## 1:10-1:50 - Show Trace Artifacts

Open:

- `antigravity-traces/implementation-plan.md`
- `antigravity-traces/task-list.md`
- `antigravity-traces/walkthrough.md`
- `antigravity-traces/sample-agent-trace.json`

Say:

> These trace artifacts include the implementation plan, task list, walkthrough, and sample execution log generated for the challenge submission.

## 1:50-2:35 - Show App Output

Open `/mobile` or the Expo mobile app.

Say:

> The runtime output exposes the same Antigravity workflow to users through visible agent trace logs and simulated tool calls.

Show trace items:

- `antigravity.plan_workflow()`
- `parse_multilingual_intent()`
- `mock_places_search()`
- `rank_by_distance_availability_rating()`
- `create_mock_booking_record()`
- `schedule_reminder_and_completion_check()`

## 2:35-3:00 - Close

Say:

> This proves the system has planning, decision-making, tool usage, action execution, and follow-up automation.
