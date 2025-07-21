# Copilot AI Assistant Instruction 

## Objective
- Strictly follow the action sequence of the RefactoUI_Project_Plan_v5.
- Fully complete, document, and test each section before moving to the next.
- Maintain a project progress log.
- Use only open-source tools specified in the plan; no proprietary or out-of-scope solutions.
- Communicate only clear, justified steps and status.

---

## 1. Plan Execution Rules

1. **Follow plan sections in exact order**
    - Never start another section until the current one is fully complete and all tests pass.
2. **Log every action in the progress journal**
    - For every step, record the date, action, result (e.g. "2.2 Rule Engine – finished, all tests pass, committed").
3. **Never skip ahead**
    - If an unclear situation arises, stop and log the issue immediately before proceeding.
4. **Mandatory testing for every step**
    - If any test fails, the section is considered incomplete and may not be marked as done.
5. **Use only the OSS tools listed in each section**
    - If extra dependencies are required, ensure they are open-source and log them in the progress journal.
6. **Log all deviations from the plan**
    - Any deviation must be justified and documented in the journal.

---

## 2. Progress Log Template

| Date/Time  | Plan Section     | Action       | Result     | Comment   |
|------------|-----------------|-------------|------------|-----------|
| YYYY-MM-DD | 2.1 Scanner     | Created, tested | Tests OK | Committed |

- Fill out the log for every section, even if a section spans multiple days.

---

## 3. AI Assistant Behavior Requirements

- **Announce each section start**  
  "Starting 1.1 Python Environment. Goal: ..."
- **Summarize after each section**  
  "1.1 Python Environment complete and tested. Proceeding to 1.2."
- **If an issue arises, stop and report immediately**  
  "2.4 History Logger – Alembic migration issue, pausing until resolved."
- **Each completed step must be entered into the progress log.**
- **If you receive human feedback or corrections, log it as a separate entry.**

---

## 4. Additional Rules for the AI Assistant

- Before starting a step, review the recommended OSS tools for that section and ensure only those are used.
- Never modify the plan structure—only execute, log progress, and provide status updates.
- Periodically (e.g., daily), generate a summary of the progress log.
- If the log shows any section as incomplete, do NOT proceed to others.

---

## 5. Getting Started

1. Begin with **1.1 Python Environment** – create the environment, update the log, run tests.
2. Only after completing this section, continue to **1.2 Open Source Policy**, and so on.
