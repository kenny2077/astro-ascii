# Contributing

Keep a contribution focused on one artwork, rendering fix, or documentation change. Open an issue before introducing a framework or shared runtime.

## Add an artwork

1. Add a standalone page in `art/<name>/index.html`.
2. Describe its subject, rendering method, controls, and artistic approximations.
3. Include provenance and image-license evidence in `docs/credits.md`. Do not commit reference photographs without redistribution permission.
4. Respect reduced motion. Provide a still view and an intentional loop where possible.
5. Add the work to the README table and the automated checks.
6. Run `npm test`. Review the page on desktop and mobile; check contrast, loading, frame rate, and loop transitions.

## Commits and pull requests

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```text
feat(art): add a spiral galaxy study
fix(renderer): preserve star positions during animation
docs: explain photograph attribution
refactor(renderer): simplify palette lookup
test: verify loop closure
ci: check artwork sources on pull requests
```

Use `refactor:` only when behavior does not change. Use a breaking-change marker only for a real compatibility break. Prefer a small number of meaningful commits to artificial history.

Include the purpose, before/after captures when relevant, validation, and source rights in your pull request. Do not claim browser verification from source-only tests.
