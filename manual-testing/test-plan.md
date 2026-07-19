# Test Plan — SauceDemo E-Commerce Application

## 1. Introduction

This document defines the manual testing approach for SauceDemo
(https://www.saucedemo.com), a sample e-commerce web application. It covers
authentication, product inventory browsing, cart management, and the
checkout flow. The plan is intentionally lean (IEEE 829-inspired) and scoped
for a portfolio-style QA exercise rather than a full commercial release.

## 2. Objectives

- Verify that core user journeys (login, browse, add to cart, checkout)
  work correctly for all documented test accounts.
- Identify functional, usability, and data-integrity defects before they
  would reach production.
- Produce test artifacts (cases, charters, bug reports, traceability
  matrix) that demonstrate a repeatable, risk-based QA process.

## 3. Scope

### In scope

- Login page: authentication, lockout behavior, error messaging.
- Product inventory page: listing, sorting, product detail navigation.
- Cart: add/remove items, badge count accuracy, persistence across pages.
- Checkout: 3-step flow (information, overview, completion), field
  validation, order total calculation, cancel paths.
- Cross-account behavior differences (`standard_user`, `locked_out_user`,
  `problem_user`, `performance_glitch_user`).

### Out of scope

- Backend/API testing (no public API is exposed).
- Payment gateway integration (checkout uses simulated payment data only).
- Load, stress, and security penetration testing.
- Cross-browser/device compatibility matrix (assumed single evergreen
  desktop browser for this exercise).
- Accessibility audit (noted as a risk/future improvement, not executed).

## 4. Test Approach

Testing is **risk-based**: areas with higher user impact or historical
defect likelihood (login, checkout totals) receive deeper coverage and
higher-priority test cases than lower-risk areas (e.g. sort labels).

### Test levels

- **System testing** — end-to-end user flows through the deployed site.
- **Exploratory testing** — session-based charters to surface issues
  scripted cases miss (see `exploratory/charters.md`).

### Test types

- Functional (positive/negative/boundary)
- UX / usability (error clarity, field masking, feedback)
- Data integrity (totals, tax calculation, cart state)
- Regression-oriented smoke pass for the critical path (login → cart →
  checkout → order confirmation)

### Prioritization

| Priority | Definition | Example area |
|---|---|---|
| Critical | Blocks core purchase journey | Login, checkout submission |
| High | Major functional defect, workaround exists | Cart badge mismatch |
| Medium | Noticeable but non-blocking | Sort order edge case |
| Low | Cosmetic / minor UX | Label wording |

## 5. Entry Criteria

- Application is reachable at https://www.saucedemo.com and returns the
  login page.
- All four documented test accounts are available and their passwords
  are valid.
- Test cases and charters have been reviewed and approved for execution.

## 6. Exit Criteria

- 100% of Critical and High priority test cases executed.
- No open Critical-severity defects without a documented workaround.
- All identified defects logged with reproduction steps and severity.
- Traceability matrix shows full mapping of requirements to test cases.

## 7. Test Environment

- **Application under test:** https://www.saucedemo.com (public demo
  instance, stateless between sessions).
- **Accounts:** `standard_user`, `locked_out_user`, `problem_user`,
  `performance_glitch_user` — password `secret_sauce` for all.
- **Browser:** current evergreen desktop browser, default zoom, default
  viewport.
- **Test data:** synthetic checkout information only (no real personal
  data entered).

## 8. Deliverables

- Test plan (this document)
- Test cases: `test-cases/login-test-cases.md`,
  `test-cases/checkout-test-cases.md`
- Exploratory charters and session notes: `exploratory/charters.md`
- Bug report template and sample report: `bug-reports/`
- Requirements-to-test traceability matrix: `traceability-matrix.md`

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Public demo app may change behavior without notice | Test cases go stale | Re-validate charter/case results before each run; date-stamp findings |
| Shared/public environment could be modified by other testers concurrently | Flaky or inconsistent results | Re-run failing cases once before logging a defect |
| No test-data reset mechanism (cart/session is client-side only) | State leaks between test cases | Start each test case from a fresh login/incognito session |
| `performance_glitch_user` introduces intentional delay | May be mistaken for a defect | Document expected slow-load behavior in test data notes |
| Limited scope (no API/security testing) | Coverage gaps outside stated scope | Explicitly call out as out-of-scope in this plan |

## 10. Roles

For this exercise, all roles (test design, execution, reporting) are
performed by a single QA practitioner acting as author of this repository.
