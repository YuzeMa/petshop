# Documentation Index

> **Context tier:** L1 | **Load when:** Before any non-trivial task

## Progressive Loading Protocol

| Tier   | Name            | When to load                                  |
| ------ | --------------- | --------------------------------------------- |
| **L0** | Bootstrap       | Every session — `AGENTS.md`, `.cursor/rules/` |
| **L1** | Index & Route   | Before any task — this file                   |
| **L2** | Working context | When a specific doc is needed for the task    |
| **L3** | Deep context    | Architecture, ambiguity, onboarding           |

1. Start at L0 (auto-loaded via rules)
2. Open this file (L1) to find the right doc
3. Load only the doc(s) relevant to your task
4. Escalate to L3 only when needed

**Canonical requirements:** [`Requirement.md`](../Requirement.md) — do not duplicate elsewhere.

---

## Document Registry

| Path                                             | Tier  | Purpose                            | Update when                  |
| ------------------------------------------------ | ----- | ---------------------------------- | ---------------------------- |
| [`../AGENTS.md`](../AGENTS.md)                   | L0    | AI bootstrap and loading protocol  | AI workflow changes          |
| [`INDEX.md`](./INDEX.md)                         | L1    | Central routing map (this file)    | Docs added or removed        |
| [`README.md`](./README.md)                       | L1    | Human-friendly docs overview       | Docs added or removed        |
| [`business-logic.md`](./business-logic.md)       | L2    | Domain rules and behavioral specs  | Rules are decided            |
| [`backlog.md`](./backlog.md)                     | L2    | Prioritized work items             | Work is planned or completed |
| [`roadmap.md`](./roadmap.md)                     | L2    | Phases and milestones              | Phases are defined           |
| [`coding-principles.md`](./coding-principles.md) | L2    | Architecture and quality standards | Standards are decided        |
| [`glossary.md`](./glossary.md)                   | L2    | Domain vocabulary                  | Terms are introduced         |
| [`../Requirement.md`](../Requirement.md)         | L2/L3 | Canonical requirements spec        | Requirements change          |
| [`context.md`](./context.md)                     | L3    | Project background and constraints | Context is clarified         |
| [`decisions/README.md`](./decisions/README.md)   | L3    | ADR index and template             | Decisions are made           |

---

## Maintenance Triggers

| Event                | Update                  |
| -------------------- | ----------------------- |
| New requirement      | `Requirement.md`        |
| New domain rule      | `business-logic.md`     |
| Architectural choice | New ADR in `decisions/` |
| New task             | `backlog.md`            |
| New phase            | `roadmap.md`            |
| New term             | `glossary.md`           |
| New standard         | `coding-principles.md`  |
| New doc              | This registry           |
