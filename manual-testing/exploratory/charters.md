# Exploratory Testing Charters (Session-Based Test Management)

These charters follow the SBTM format:
**"Explore `<area>` with `<resources>` to discover `<information>`"**

Each session is timeboxed and produces session notes covering findings,
bugs, and open questions. Only Charter 1 includes a full example debrief;
the remaining charters are ready to run using the same structure.

---

## Charter 1 — Account Behavior Differences

**Mission:** Explore the login and inventory pages with the four
documented test accounts to discover behavioral or visual differences
between them that are not captured in functional test cases.

- **Timebox:** 45 minutes
- **Setup:** Fresh browser session (private/incognito) for each account;
  https://www.saucedemo.com; credentials for `standard_user`,
  `locked_out_user`, `problem_user`, `performance_glitch_user`
  (password `secret_sauce` for all).
- **Areas of interest:**
  - Differences in page load timing between accounts.
  - Visual/rendering differences on the inventory page per account.
  - Any account-specific console errors or broken interactions.
  - Whether error states are consistent across accounts.

### Example Session Notes / Debrief

**Tester:** QA practitioner (self-run session)
**Date of session:** exercise run, current testing cycle
**Duration:** 40 minutes (5 minutes under timebox)

**Charter followed as planned:** Yes, with a brief detour into checking
product detail pages for `problem_user` after an anomaly was spotted on
the inventory grid.

**Findings:**
- `standard_user` and `performance_glitch_user` behave identically in
  the UI once loaded; `performance_glitch_user` has a clearly noticeable
  delay between login submission and the Products page rendering.
- `locked_out_user` never reaches the inventory page — confirmed
  consistent with expected lockout behavior.
- `problem_user` reached the inventory page normally, but all product
  thumbnail images rendered as the same image regardless of product
  (logged separately as BUG-001).
- No console errors were observed in the browser dev tools for any
  account during login or initial inventory load.

**Bugs found:**
- BUG-001: `problem_user` product images all display the same
  incorrect image instead of each product's actual image
  (see `bug-reports/BUG-001-problem-user-wrong-images.md`).

**Questions raised:**
- Is the identical-image behavior for `problem_user` limited to the
  inventory grid, or does it also affect the product detail page and
  cart thumbnails? (Needs follow-up session.)
- Is there a fifth account or hidden flag that produces other
  intentionally "broken" behavior worth cataloguing?

**Follow-up charters suggested:**
- Explore `problem_user` specifically across cart and checkout to
  confirm whether the image defect is isolated to inventory, or
  whether other fields (e.g. price, description) are also affected.

---

## Charter 2 — Sorting and Data Consistency

**Mission:** Explore the product inventory sorting controls with all
four sort options (Name A–Z, Name Z–A, Price low–high, Price high–low)
to discover any inconsistencies in ordering, duplicate entries, or data
that doesn't match the expected sort criteria.

- **Timebox:** 30 minutes
- **Setup:** Logged in as `standard_user`; Products page loaded; a
  spreadsheet or notes file to record observed product order per sort
  option.
- **Areas of interest:**
  - Whether ties (equal prices or names) are ordered consistently and
    deterministically across repeated selections.
  - Whether the sort selection persists across navigation (e.g. to cart
    and back).
  - Whether sort state survives a page reload.
  - Any mismatch between displayed price and the price carried into the
    cart/checkout for the same item.

---

## Charter 3 — Cart and Checkout Resilience

**Mission:** Explore the cart and checkout flow with unusual navigation
patterns (browser back/forward, direct URL entry, multiple tabs) to
discover state-management defects that a linear scripted test would not
catch.

- **Timebox:** 45 minutes
- **Setup:** Logged in as `standard_user`; at least 2 products available
  to add/remove; browser back/forward enabled; ability to open a second
  tab against the same session.
- **Areas of interest:**
  - Using browser Back after reaching the completion page and attempting
    to re-submit.
  - Navigating directly to the checkout-complete URL without completing
    prior steps.
  - Adding/removing items in one tab while checkout is in progress in
    another tab of the same session.
  - Whether the cart badge count ever desyncs from the actual cart
    contents.

---

## Charter 4 — Usability and Accessibility Signals

**Mission:** Explore the login, inventory, and checkout pages with
keyboard-only navigation and browser zoom to discover usability or
accessibility friction points that would affect real users, not just
functional correctness.

- **Timebox:** 30 minutes
- **Setup:** Logged in as `standard_user`; keyboard only (Tab, Shift+Tab,
  Enter, Space); browser zoom set to a larger level (e.g. 150%–200%).
- **Areas of interest:**
  - Whether all interactive elements (login fields, sort dropdown, add
    to cart, checkout buttons) are reachable and operable via keyboard
    alone.
  - Whether focus order is logical and focus indicators are visible.
  - Whether layout breaks, overlaps, or clips content at higher zoom
    levels.
  - Whether error messages are announced/visible clearly enough for a
    user who is not looking directly at the field that failed
    validation.
