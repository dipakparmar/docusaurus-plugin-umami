# [3.0.0](https://github.com/dipakparmar/docusaurus-plugin-umami/compare/v2.4.0...v3.0.0) (2026-07-12)


* refactor!: make @docusaurus/* peer/dev deps instead of bundled ([#122](https://github.com/dipakparmar/docusaurus-plugin-umami/issues/122)) ([d920669](https://github.com/dipakparmar/docusaurus-plugin-umami/commit/d920669f321649665c11d2d7fdc442d03d804948))


### Features

* add enableRecorder option (session replays & heatmaps) ([#123](https://github.com/dipakparmar/docusaurus-plugin-umami/issues/123)) ([3333164](https://github.com/dipakparmar/docusaurus-plugin-umami/commit/33331644d09ee0d71ed4544f798cd1149f4730e1))
* custom event tracking, distinct IDs & anonymous auto-identify ([#124](https://github.com/dipakparmar/docusaurus-plugin-umami/issues/124)) ([fb9a939](https://github.com/dipakparmar/docusaurus-plugin-umami/commit/fb9a9392867ba769f967bb339cf91988f2253598))


### BREAKING CHANGES

* @docusaurus/utils-validation is now a peerDependency
(^3.0.0) rather than a bundled dependency, so the consumer site's own
Docusaurus install provides it — no duplicate copy in the tree.

- @docusaurus/utils-validation: dependency -> peerDependency ^3.0.0 + devDependency
- @docusaurus/types: dependency -> devDependency only (type-only, resolved
  transitively from the consumer's Docusaurus install)
- drop tslib + tsconfig importHelpers (inert at target ES2022, no helpers emitted)
