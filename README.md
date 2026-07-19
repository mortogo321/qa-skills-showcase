# QA Skills Showcase

[![CI](https://github.com/mortogo321/qa-skills-showcase/actions/workflows/ci.yml/badge.svg)](https://github.com/mortogo321/qa-skills-showcase/actions/workflows/ci.yml)

A proof-of-concept portfolio demonstrating **manual** and **automated** software-testing skills, deliberately built around the skills that appear most often in current QA job postings.

Everything here tests two public practice targets, so the whole repo is runnable by anyone:

- **UI**: [SauceDemo](https://www.saucedemo.com) — a demo e-commerce app (login → inventory → cart → checkout)
- **API**: [Restful-Booker](https://restful-booker.herokuapp.com) — a demo REST API with auth + CRUD

## Skills demonstrated

| Skill | Where |
|---|---|
| **UI test automation (Playwright + TypeScript)** | UI suite with Page Object Model and custom fixtures |
| **API testing** | Full auth + CRUD chain against a live REST API, including negative checks |
| **CI/CD integration (GitHub Actions)** | Workflow running typecheck + full suite on every push/PR, with HTML report artifacts |
| **Performance testing (k6)** | Smoke script with thresholds, plus documented smoke vs. load/stress/soak distinctions |
| **Manual / structured testing** | Risk-based test plan, 28 written test cases, SBTM exploratory charters, a real bug report, and a traceability matrix |
| **Test strategy & traceability** | Requirements → manual cases → automated specs linked end-to-end in the traceability matrix |

## Repository layout

```
manual-testing/
  test-plan.md                 Risk-based test plan (lean IEEE-829 style)
  test-cases/                  Login + checkout cases (positive/negative/boundary)
  exploratory/charters.md      Session-based (SBTM) charters + example debrief
  bug-reports/                 Template + a real filled-in defect (problem_user images)
  traceability-matrix.md       REQ → manual case → automated spec → status
src/
  pages/                       Page Object Model (data-test locators)
  fixtures/pom.fixture.ts      Custom Playwright fixtures injecting page objects
  data/users.ts                Typed test users and expected messages
tests/
  ui/                          Login, inventory sorting, cart/checkout specs
  api/                         Restful-Booker auth + CRUD chain (serial)
performance/
  k6-smoke.js                  k6 smoke test with pass/fail thresholds
.github/workflows/ci.yml      CI: typecheck + Playwright on push/PR; k6 on manual dispatch
```

## Running it

```bash
bun install
bunx playwright install chromium

bun run test        # full suite (UI + API) — note: `bun run test`, not `bun test`
bun run test:ui     # UI project only
bun run test:api    # API project only
bun run test:smoke  # @smoke-tagged tests only
bun run report      # open the HTML report
bun run typecheck   # TypeScript, no emit
```

Performance smoke — either with a local [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/) install or via Docker (no install needed):

```bash
k6 run performance/k6-smoke.js

# or, without installing k6:
docker run --rm -i grafana/k6 run - <performance/k6-smoke.js
```

It also runs in CI as the manually-dispatched `perf-smoke` job.

## Design notes

- **Assertions live in specs, not page objects** — page objects expose state; tests decide what correct means.
- **Numeric assertions, not screenshots-of-numbers** — sorting and order-total checks parse real prices and verify the math (subtotal + tax = total).
- **Tagging** — `@smoke` marks the fast confidence subset; CI retries are enabled only in CI to keep local failures honest.
- **Traceability** — every automated spec traces back to a written requirement and manual test case, the habit that separates test *strategy* from test *scripts*.
- **Etiquette** — the k6 script is a smoke test by design; never point real load profiles at third-party demo services.
