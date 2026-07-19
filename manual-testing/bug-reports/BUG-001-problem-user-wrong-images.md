# BUG-001 — problem_user sees the same incorrect product image for every item

| Field | Details |
|---|---|
| **ID** | BUG-001 |
| **Title** | All products display the same incorrect image on the inventory page when logged in as `problem_user` |
| **Severity** | Medium |
| **Priority** | High |
| **Environment** | https://www.saucedemo.com, current evergreen desktop browser, account `problem_user` |
| **Preconditions** | Valid `problem_user` account credentials available (`secret_sauce`); no active session |
| **Steps to Reproduce** | 1. Navigate to https://www.saucedemo.com. 2. Log in with Username `problem_user` and Password `secret_sauce`. 3. Observe the product thumbnails on the Products (inventory) page for all six listed items. |
| **Expected Result** | Each product displays its own distinct, correct product image, matching the product name and description (consistent with the images shown for `standard_user`). |
| **Actual Result** | Every product on the inventory page displays the identical image of a dog, regardless of the actual product name or description. The image does not correspond to any of the products being sold. |
| **Evidence** | Screenshot of the Products page while logged in as `problem_user`, showing six distinct product names/prices all rendered with the same dog image (compare against a `standard_user` screenshot of the same page for contrast). |
| **Workaround** | Log in with `standard_user` (or another account without this defect) to view correct product images; no workaround exists within the `problem_user` account itself. |
| **Notes** | Observed during Exploratory Charter 1 ("Account Behavior Differences," see `exploratory/charters.md`). The defect appears specific to the `problem_user` account and was not observed for `standard_user` or `performance_glitch_user`. Not yet confirmed whether the same wrong image also appears on the product detail page or cart thumbnails for this account — flagged as a follow-up exploratory charter. Classified as Medium severity because it does not block any functional flow (add to cart, checkout, and purchase all still work correctly), but High priority because incorrect product imagery directly undermines buyer trust and product identification on an e-commerce storefront. |
