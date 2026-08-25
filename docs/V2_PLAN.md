# Sketchybook2 V2 Plan

## Direction

Sketchybook2 is a new game built on the proven V1 foundation. V1 remains preserved at the `v1.0.0` tag; major design and gameplay changes belong here.

## Stage structure

- Organize stages into themed chapters.
- Add interlude stages between chapters to ease difficulty changes.
- Target more than 50 stages, with chapter completion milestones.
- Keep stage data separate from rendering and physics logic.
- Derive selection and progress limits from the stage registry instead of hardcoding a total.

## Product surfaces

- Replace the start screen with a distinct V2 visual identity.
- Redesign stage selection around chapters and readable progress.
- Preserve the satisfying draw-and-simulate core while revisiting feedback, pacing, and mobile play.

## Delivery order

1. Establish the new shell and visual language.
2. Define the stage and chapter data model.
3. Build one complete chapter with representative interlude stages.
4. Validate navigation, persistence, and responsive play.
5. Expand the chapter set beyond 50 stages.

## Working rules

- Develop V2 on the `v2` branch.
- Keep `main` as the V2 integration branch.
- Use small, reviewable commits.
- Run tests and a production build before merging major slices.
