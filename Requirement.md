# Pet E-Commerce Shopping Cart — Requirements

## Overview

Build a working shopping cart for a pet e-commerce store.

## Quality Expectations

- Working functionality that meets the spec
- Clean separation of concerns
- High quality standard — clean, validated, tested, and defensible, matching production standards
- Code quality and architecture are important
- Use whatever libraries and frameworks
- Tests: at a minimum, unit tests should be added; additional tests (integration, edge cases, etc.) are welcome if they add value
- Include the tests you would want in a real codebase; coverage choices and rationale matter
- Spare time is better spent on tests and code quality than extra features

## Domain Model

### Product

A Product has:

- `id`
- `name`
- `price`
- `category` — one of: `dry-food`, `wet-food`, `treats`, `toys`, `healthcare`

### Cart

- A Cart contains zero or more CartItems
- Each CartItem references a Product and has a quantity

### Seed Data

- 6 to 10 products
- At least three categories represented
- Hard-coded data is fine

## Backend APIs

- **Fetch product list** — return the full product list
- **Get current cart** — return the current cart with line items, per-line subtotal, and grand total
- **Add to cart** — add a product; if it already exists in the cart, increment the quantity rather than creating a duplicate line
- **Remove from cart** — remove a line item from the cart entirely

## Frontend

### Product List Page

- Show all products
- Each product has an "Add to cart" button

### Cart View

- Show line items, quantities, line subtotals, and grand total
- Cart updates when items are added or removed

## Validation and Errors

- Reject unknown product IDs with a 4xx and a structured error message
- Reject non-positive quantities
- Frontend must surface these errors meaningfully — no silent failures

## Out of Scope

- Authentication
- Payments
- Inventory
- Other complex e-commerce logic beyond what is described above

Some of the above may come up in a live discussion session but are not required for this build.
