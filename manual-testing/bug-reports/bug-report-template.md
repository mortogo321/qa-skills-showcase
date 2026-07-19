# Bug Report Template

| Field | Description |
|---|---|
| **ID** | Unique identifier, e.g. `BUG-001`. |
| **Title** | Short, specific summary of the defect (symptom + location). |
| **Severity** | Impact on the system if unfixed: Critical / High / Medium / Low. |
| **Priority** | Urgency of fixing relative to other work: Critical / High / Medium / Low. |
| **Environment** | Application URL/version, browser, OS, account used. |
| **Preconditions** | State required before reproduction steps (login state, cart contents, etc.). |
| **Steps to Reproduce** | Numbered, minimal steps that reliably reproduce the issue. |
| **Expected Result** | What should happen if the application behaved correctly. |
| **Actual Result** | What actually happens, described precisely and objectively. |
| **Evidence** | Screenshots, screen recordings, console logs, or HAR files supporting the report. |
| **Workaround** | Any known way to avoid or mitigate the issue, if one exists. |
| **Notes** | Additional context: related bugs, frequency, first observed, follow-up questions. |

---

## Usage Notes

- **Severity** measures technical/business impact (does it corrupt data,
  block a core flow, or is it cosmetic).
- **Priority** measures how soon it should be addressed relative to other
  work, independent of severity (e.g. a low-severity issue on a demo page
  seen by every visitor may still be high priority).
- Keep Steps to Reproduce minimal — remove any action that isn't
  necessary to trigger the defect.
- Actual Result should describe observed behavior only, without
  speculating on root cause.
