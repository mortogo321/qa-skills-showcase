# Requirements Traceability Matrix

Maps requirements to manual test cases and their corresponding automated
specs. Coverage status reflects the state of this exercise repository.

| Requirement ID | Requirement Description | Manual Test Case(s) | Automated Spec | Coverage Status |
|---|---|---|---|---|
| REQ-AUTH-01 | Users can log in with valid credentials | TC-LOGIN-001, TC-LOGIN-003, TC-LOGIN-004, TC-LOGIN-005, TC-LOGIN-006, TC-LOGIN-007, TC-LOGIN-008, TC-LOGIN-013 | tests/ui/login.spec.ts | Covered |
| REQ-AUTH-02 | Locked-out accounts are prevented from logging in with a clear error | TC-LOGIN-002 | tests/ui/login.spec.ts | Covered |
| REQ-INV-01 | Product inventory listing displays correctly for valid accounts | TC-CHECKOUT-001, TC-CHECKOUT-002 | tests/ui/inventory.spec.ts | Covered |
| REQ-INV-02 | Product inventory can be sorted by name and price | (Exploratory Charter 2 — see `exploratory/charters.md`) | tests/ui/inventory.spec.ts | Partial (exploratory only, no scripted manual case yet) |
| REQ-CART-01 | Items can be added to and removed from the cart, with an accurate badge count | TC-CHECKOUT-001, TC-CHECKOUT-002, TC-CHECKOUT-003, TC-CHECKOUT-004, TC-CHECKOUT-005 | tests/ui/inventory.spec.ts | Covered |
| REQ-CHK-01 | Checkout information step validates required fields | TC-CHECKOUT-007, TC-CHECKOUT-008, TC-CHECKOUT-009 | tests/ui/checkout.spec.ts | Covered |
| REQ-CHK-02 | Order total is calculated correctly as items plus tax | TC-CHECKOUT-010, TC-CHECKOUT-011 | tests/ui/checkout.spec.ts | Covered |
| REQ-CHK-03 | Order can be completed, and cancel paths return the user without placing an order | TC-CHECKOUT-006, TC-CHECKOUT-012, TC-CHECKOUT-013, TC-CHECKOUT-014 | tests/ui/checkout.spec.ts | Covered |

## Legend

- **Covered** — at least one manual test case and one automated spec
  exercise this requirement.
- **Partial** — requirement is exercised only via exploratory testing or
  only at one test level; scripted coverage is incomplete.
- **Not Covered** — no manual or automated coverage currently exists
  (none in current scope).
