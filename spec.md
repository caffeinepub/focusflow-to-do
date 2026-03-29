# FocusFlow To-Do

## Current State
New project. Empty backend and frontend scaffolding.

## Requested Changes (Diff)

### Add
- Full-stack To-Do List app with Neo-noir dark mode aesthetic
- Smart task input: text + priority selector (High/Medium/Low) + due date
- Category tabs: Personal, Work, Academic
- Task list with checkbox (complete), delete button, edit icon per task
- Progress bar showing % of today's tasks completed
- Pomodoro timer (25min focus / 5min break) integrated in the UI
- Daily motivational "Millionaire Mindset" quotes (random, changes each day)
- Search/filter bar to find tasks
- Due date alerts: tasks due today highlighted in red
- Fade-in animation on task add, strikethrough animation on task complete
- Mobile-responsive layout
- Persistent storage via backend (ICP canister)

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: store tasks with fields (id, title, category, priority, dueDate, completed, createdAt), CRUD operations
2. Backend: store daily quote index per day
3. Frontend: dark theme with electric blue / emerald green accents via CSS tokens
4. Frontend: category tabs (Personal/Work/Academic)
5. Frontend: smart input bar with title, priority, due date
6. Frontend: task list with checkbox, edit, delete
7. Frontend: progress bar component
8. Frontend: Pomodoro timer component (25/5 cycle, sound or visual alert)
9. Frontend: motivational quotes section (daily random from hardcoded list)
10. Frontend: search filter input
11. Frontend: due-today highlighting (red)
12. Frontend: fade-in + strikethrough CSS animations
13. Frontend: mobile responsive layout
