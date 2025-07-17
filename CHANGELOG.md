# Changelog

## [3.0.3](https://github.com/justintaddei/v-wave/compare/v3.0.2...v3.0.3) (2025-07-17)


### Bug Fixes

* remove `bridge` option from Nuxt module's compatibility meta ([#876](https://github.com/justintaddei/v-wave/issues/876)) ([21d94a5](https://github.com/justintaddei/v-wave/commit/21d94a57fe9ea07cddbebbe138c555f0e2a9a34a))

## [3.0.2](https://github.com/justintaddei/v-wave/compare/v3.0.1...v3.0.2) (2024-09-11)


### Bug Fixes

* incorrect mapping of mjs files in nuxt3 ([#790](https://github.com/justintaddei/v-wave/issues/790)) ([7a918d1](https://github.com/justintaddei/v-wave/commit/7a918d1fed124142e931cd35bcc6203c59fab0b2))
* typescript errors in nuxt3 module ([#792](https://github.com/justintaddei/v-wave/issues/792)) ([02543de](https://github.com/justintaddei/v-wave/commit/02543de646c53b643f7a9a2280a6313f96d358cc))

## [3.0.1](https://github.com/justintaddei/v-wave/compare/v3.0.0...v3.0.1) (2024-09-11)


### Miscellaneous Chores

* release 3.0.1 ([9116a00](https://github.com/justintaddei/v-wave/commit/9116a00ca2fe94821a02a53cd76f3f02a10e4391))

## 3.0.0 (2024-09-11)


### ⚠ BREAKING CHANGES

* the wave effect will be disabled if `prefers-reduced-motion:` set to `reduce` unless `respectPrefersReducedMotion` is `false`.
* the disabled attr now disables the wave effect on the element and removed the ability to disable the wave effect by passing `false` to the directive
* Nuxt 2 module entry moved from `v-wave/nuxt` to `v-wave/nuxt/v2`

### Features

* active wave on synthetic clicks ([#783](https://github.com/justintaddei/v-wave/issues/783)) ([cb0f1dc](https://github.com/justintaddei/v-wave/commit/cb0f1dc1e3baebf8020fdd18e09652074c6915ac))
* add disabled and respectDisabledAttribute options ([3a1fc6a](https://github.com/justintaddei/v-wave/commit/3a1fc6a00929057e283256eb198723b307701393)), closes [#543](https://github.com/justintaddei/v-wave/issues/543)
* add support Nuxt 3 ([c3b8576](https://github.com/justintaddei/v-wave/commit/c3b857633daf5b5a912562d711e4a50c1ab7388d))
* added waitForRelease (to let waves dissolve immediately) ([#746](https://github.com/justintaddei/v-wave/issues/746)) ([3efecb3](https://github.com/justintaddei/v-wave/commit/3efecb357c0ca1e8578b4b937a29f3cc2eaa1381)), closes [#604](https://github.com/justintaddei/v-wave/issues/604)
* option to stop propagation of waves to parent elements ([e2a3dd9](https://github.com/justintaddei/v-wave/commit/e2a3dd9adc0fef441290f30359bfdf0db5c3871b)), closes [#544](https://github.com/justintaddei/v-wave/issues/544)
* respectPrefersReducedMotion ([#745](https://github.com/justintaddei/v-wave/issues/745)) ([5edc0a5](https://github.com/justintaddei/v-wave/commit/5edc0a54d12c094497cf24cf21655c6cce73666c)), closes [#740](https://github.com/justintaddei/v-wave/issues/740)


### Bug Fixes

* **deps:** bump @nuxt/kit from 3.10.0 to 3.10.1 ([a3cddb0](https://github.com/justintaddei/v-wave/commit/a3cddb0769751f7354954d174958ef96bddc6bbc))
* **deps:** bump @nuxt/kit from 3.10.1 to 3.10.2 ([f5ab3f0](https://github.com/justintaddei/v-wave/commit/f5ab3f0effb7863dac9016e75f35bf1de1cfe2fe))
* **deps:** bump @nuxt/kit from 3.10.2 to 3.10.3 ([384cec7](https://github.com/justintaddei/v-wave/commit/384cec7246fbfdbad404921c501759628979fda6))
* **deps:** bump @nuxt/kit from 3.10.3 to 3.11.0 ([6491b64](https://github.com/justintaddei/v-wave/commit/6491b64ae3a62814b2884107744405593e2bf74d))
* **deps:** bump @nuxt/kit from 3.11.0 to 3.11.1 ([8c36a57](https://github.com/justintaddei/v-wave/commit/8c36a57c47569b3f2fbabc9aca9438d05da30967))
* **deps:** bump @nuxt/kit from 3.11.1 to 3.11.2 ([de7b11d](https://github.com/justintaddei/v-wave/commit/de7b11d9fb3f9c952dc8d7d9699cc317fc2641b6))
* **deps:** bump @nuxt/kit from 3.11.2 to 3.12.1 ([a2c7602](https://github.com/justintaddei/v-wave/commit/a2c7602af65b7b53f51cfc9fce99d6e88b643fb3))
* **deps:** bump @nuxt/kit from 3.12.1 to 3.12.2 ([e61e144](https://github.com/justintaddei/v-wave/commit/e61e14485b3ea36e19581916b957adaf765bf085))
* **deps:** bump @nuxt/kit from 3.8.2 to 3.9.0 ([0892877](https://github.com/justintaddei/v-wave/commit/0892877f06b26b299141b516ddf8763592de99cd))
* **deps:** bump @nuxt/kit from 3.9.0 to 3.9.1 ([3d5c566](https://github.com/justintaddei/v-wave/commit/3d5c5662386bd0982163ff9dcfcdf121bcd840d3))
* **deps:** bump @nuxt/kit from 3.9.1 to 3.9.2 ([8dab91f](https://github.com/justintaddei/v-wave/commit/8dab91faaeb31e26f16fe59335d886c529920be4))
* **deps:** bump @nuxt/kit from 3.9.2 to 3.9.3 ([88c4ecf](https://github.com/justintaddei/v-wave/commit/88c4ecf8f18c34a5ce35e8cfc7d5709f849f9bd2))
* **deps:** bump @nuxt/kit from 3.9.3 to 3.10.0 ([a2ddcce](https://github.com/justintaddei/v-wave/commit/a2ddcce607c2c765c5e8e89962ca8feb8ebb1211))
* **deps:** bump actions/cache from 3 to 4 ([eef04f1](https://github.com/justintaddei/v-wave/commit/eef04f123e519afa56e0e9fb942e66f2aade4fb8))
* **deps:** bump actions/checkout from 3 to 4 ([41753a0](https://github.com/justintaddei/v-wave/commit/41753a08281fe1d7577f50af099aba6bd378484d))
* **deps:** bump actions/setup-node from 3.8.0 to 3.8.1 ([06b684f](https://github.com/justintaddei/v-wave/commit/06b684fb9a4b7ee943abdc412c60835a1ba14e4e))
* **deps:** bump actions/setup-node from 3.8.1 to 4.0.0 ([5d1fca2](https://github.com/justintaddei/v-wave/commit/5d1fca28b3289aea937ff879c3d682443e9261ad))
* **deps:** bump actions/setup-node from 4.0.0 to 4.0.1 ([f0f55aa](https://github.com/justintaddei/v-wave/commit/f0f55aa32b071edefac39ed92e7f10afc89ee59d))
* **deps:** bump actions/setup-node from 4.0.1 to 4.0.2 ([c6c7dc3](https://github.com/justintaddei/v-wave/commit/c6c7dc3cb292a9e979a3433bf8d106b3a088091c))
* **deps:** bump braces from 3.0.2 to 3.0.3 ([6d0cf8c](https://github.com/justintaddei/v-wave/commit/6d0cf8c39164037e12e5afdef39b2b864bb22c1f))
* **deps:** bump dependabot/fetch-metadata from 1 to 2 ([4bea55f](https://github.com/justintaddei/v-wave/commit/4bea55fcbc9c42f080d3e1a4452e5112976e590f))
* **deps:** bump dependabot/fetch-metadata from 1.6.0 to 2.0.0 ([4dce01e](https://github.com/justintaddei/v-wave/commit/4dce01eeb707e4bcab842cf43999451374a9d4af))
* **deps:** bump dependabot/fetch-metadata from 2.0.0 to 2.1.0 ([e42ad21](https://github.com/justintaddei/v-wave/commit/e42ad217d9b7a9fd12dcf52fbf159cbf1daf1da2))
* **deps:** bump pnpm/action-setup from 2 to 4 ([461d3a2](https://github.com/justintaddei/v-wave/commit/461d3a2c446601e0c731a96770031ba48e61489a))
* **deps:** bump tar from 6.2.0 to 6.2.1 ([c06fa35](https://github.com/justintaddei/v-wave/commit/c06fa35416232ae84942702d2fd5de7b1bc1ae94))
* error in projects without both deps and devDeps ([f0e8d17](https://github.com/justintaddei/v-wave/commit/f0e8d1718c2176e62de1bb019a6ea7fbe9944524))
* nuxt3 typescript support in nuxt.config.ts ([9aa28ec](https://github.com/justintaddei/v-wave/commit/9aa28ec583cd2842e12b84dabb14d7a35f510f6b))
* wave container not being reused ([24c56d8](https://github.com/justintaddei/v-wave/commit/24c56d89f92d747b73acd7aad9ddc8db8410fb98))


### Miscellaneous Chores

* release 3.0.0 ([e154243](https://github.com/justintaddei/v-wave/commit/e154243123498299122f98ad631c0a38bd2a33fd))

## [2.0.0](https://github.com/justintaddei/v-wave/compare/v1.5.1...v2.0.0) (2023-12-07)

### ⚠ BREAKING CHANGES

- Nuxt 2 module entry moved from `v-wave/nuxt` to `v-wave/nuxt/v2`

### Features

- add support Nuxt 3 ([c3b8576](https://github.com/justintaddei/v-wave/commits/c3b857633daf5b5a912562d711e4a50c1ab7388d))

### Bug Fixes

- **deps:** bump actions/setup-node from 3.6.0 to 3.7.0 ([ad71e13](https://github.com/justintaddei/v-wave/commits/ad71e133ca626ed52f0bb011cc5f62de88f625f8))
- **deps:** bump actions/setup-node from 3.7.0 to 3.8.0 ([5d0418e](https://github.com/justintaddei/v-wave/commits/5d0418eff59606c869592f6a287afd8a51386295))
- **deps:** bump actions/setup-node from 3.8.0 to 3.8.1 ([06b684f](https://github.com/justintaddei/v-wave/commits/06b684fb9a4b7ee943abdc412c60835a1ba14e4e))
- **deps:** bump actions/setup-node from 3.8.1 to 4.0.0 ([5d1fca2](https://github.com/justintaddei/v-wave/commits/5d1fca28b3289aea937ff879c3d682443e9261ad))
- **deps:** bump dependabot/fetch-metadata from 1.4.0 to 1.5.0 ([8652b17](https://github.com/justintaddei/v-wave/commits/8652b177d6f95352f1b6ad015a5033a046864e29))
- **deps:** bump dependabot/fetch-metadata from 1.5.0 to 1.5.1 ([d1f3c6d](https://github.com/justintaddei/v-wave/commits/d1f3c6d32aa0f3c2cd9c71d1390bdb2e9b5c6513))
- **deps:** bump dependabot/fetch-metadata from 1.5.1 to 1.6.0 ([5b91361](https://github.com/justintaddei/v-wave/commits/5b91361a07399c9143bc133335f94d23c33f1dad))
- **deps:** bump tough-cookie from 4.1.2 to 4.1.3 ([17d64c2](https://github.com/justintaddei/v-wave/commits/17d64c22b5fef5ca66b0d341d61b9f85a835c6cd))
- error in projects without both deps and devDeps ([f0e8d17](https://github.com/justintaddei/v-wave/commits/f0e8d1718c2176e62de1bb019a6ea7fbe9944524))

## [1.6.0-beta.3](https://github.com/justintaddei/v-wave/compare/v1.6.0-beta.1...v1.6.0-beta.3) (2023-12-05)

### Features

- add support for Nuxt 3 ([182bd51](https://github.com/justintaddei/v-wave/commits/182bd51d1b76728956d4bdfcabd4fbaa9450f9f6))

## [1.6.0-beta.2](https://github.com/justintaddei/v-wave/compare/v1.6.0-beta.1...v1.6.0-beta.2) (2023-12-05)

### Features

- add support for Nuxt 3 ([ee3ea2a](https://github.com/justintaddei/v-wave/commits/ee3ea2a522e09cf668c9284c0b159f9a4b8d779b))

## [1.6.0-beta.1](https://github.com/justintaddei/v-wave/compare/v1.6.0-beta.0...v1.6.0-beta.1) (2023-11-07)

### Bug Fixes

- error in projects without both deps and devDeps ([6071008](https://github.com/justintaddei/v-wave/commits/60710088cac620900990e90b5cb4b000aea068bd))

## [1.6.0-beta.0](https://github.com/justintaddei/v-wave/compare/v1.5.1...v1.6.0-beta.0) (2023-11-07)

### Features

- add support for nuxt3 via postinstall script ([352cf03](https://github.com/justintaddei/v-wave/commits/352cf035e5c41c2c73d840733e8230568bc4886d))

### Bug Fixes

- **deps:** bump actions/setup-node from 3.6.0 to 3.7.0 ([ad71e13](https://github.com/justintaddei/v-wave/commits/ad71e133ca626ed52f0bb011cc5f62de88f625f8))
- **deps:** bump actions/setup-node from 3.7.0 to 3.8.0 ([5d0418e](https://github.com/justintaddei/v-wave/commits/5d0418eff59606c869592f6a287afd8a51386295))
- **deps:** bump actions/setup-node from 3.8.0 to 3.8.1 ([06b684f](https://github.com/justintaddei/v-wave/commits/06b684fb9a4b7ee943abdc412c60835a1ba14e4e))
- **deps:** bump actions/setup-node from 3.8.1 to 4.0.0 ([5d1fca2](https://github.com/justintaddei/v-wave/commits/5d1fca28b3289aea937ff879c3d682443e9261ad))
- **deps:** bump dependabot/fetch-metadata from 1.4.0 to 1.5.0 ([8652b17](https://github.com/justintaddei/v-wave/commits/8652b177d6f95352f1b6ad015a5033a046864e29))
- **deps:** bump dependabot/fetch-metadata from 1.5.0 to 1.5.1 ([d1f3c6d](https://github.com/justintaddei/v-wave/commits/d1f3c6d32aa0f3c2cd9c71d1390bdb2e9b5c6513))
- **deps:** bump dependabot/fetch-metadata from 1.5.1 to 1.6.0 ([5b91361](https://github.com/justintaddei/v-wave/commits/5b91361a07399c9143bc133335f94d23c33f1dad))
- **deps:** bump tough-cookie from 4.1.2 to 4.1.3 ([17d64c2](https://github.com/justintaddei/v-wave/commits/17d64c22b5fef5ca66b0d341d61b9f85a835c6cd))

### [1.5.1](https://github.com/justintaddei/v-wave/compare/v1.5.0...v1.5.1) (2023-05-09)

### Bug Fixes

- **deps:** bump actions/setup-node from 3.2.0 to 3.3.0 ([cc02afc](https://github.com/justintaddei/v-wave/commits/cc02afca2e0796af9ce0883ba9a7fccaec32b2cf))
- **deps:** bump actions/setup-node from 3.3.0 to 3.4.1 ([e0b70f9](https://github.com/justintaddei/v-wave/commits/e0b70f9837ce4458aa1b8bfbd2fbb305583437d4))
- **deps:** bump actions/setup-node from 3.4.1 to 3.5.0 ([2c384ba](https://github.com/justintaddei/v-wave/commits/2c384ba1c2f39db8a554cc044aac1ba204f75707))
- **deps:** bump actions/setup-node from 3.5.0 to 3.5.1 ([9299027](https://github.com/justintaddei/v-wave/commits/9299027a12a1e7c591b75787e365b30bc4873ca2))
- **deps:** bump actions/setup-node from 3.5.1 to 3.6.0 ([173f4a8](https://github.com/justintaddei/v-wave/commits/173f4a8a00bce54822596113edb13ae886e6d732))
- **deps:** bump dependabot/fetch-metadata from 1.3.1 to 1.3.2 ([08741fc](https://github.com/justintaddei/v-wave/commits/08741fc835402fa7d2ae2e70ab90d85974ed2b6c))
- **deps:** bump dependabot/fetch-metadata from 1.3.2 to 1.3.3 ([12c635c](https://github.com/justintaddei/v-wave/commits/12c635ca0526fbe4ffc5f5a37d2936cd451e6f86))
- **deps:** bump dependabot/fetch-metadata from 1.3.3 to 1.3.4 ([4615575](https://github.com/justintaddei/v-wave/commits/461557594912f8a9f0ed2e4129cb005e1ad9433f))
- **deps:** bump dependabot/fetch-metadata from 1.3.4 to 1.3.5 ([e8cb451](https://github.com/justintaddei/v-wave/commits/e8cb451f0ef8190c70b9cc4e039d853232a97e2d))
- **deps:** bump dependabot/fetch-metadata from 1.3.5 to 1.3.6 ([98d02e2](https://github.com/justintaddei/v-wave/commits/98d02e214effe29a5aaca18fbff5ff39ea4e794a))
- **deps:** bump dependabot/fetch-metadata from 1.3.6 to 1.4.0 ([c3ef927](https://github.com/justintaddei/v-wave/commits/c3ef9270ff9b000a2761e3d79a6780c03e87086d))
- **deps:** bump json5 from 2.1.3 to 2.2.3 ([2613566](https://github.com/justintaddei/v-wave/commits/261356632c7e30a35e7a8cfeecc4415ef77098a8))
- **deps:** bump minimatch from 3.0.4 to 3.1.2 ([8fd4f1e](https://github.com/justintaddei/v-wave/commits/8fd4f1e89097998e275a3933389294f51ea6d6fd))

## [1.5.0](https://github.com/justintaddei/v-wave/compare/v1.4.0...v1.5.0) (2022-05-21)

### Features

- support local directives ([d021ec9](https://github.com/justintaddei/v-wave/commits/d021ec9b700eded869867c60c1df017fddc78d75)), closes [#312](https://github.com/justintaddei/v-wave/issues/312)

### Bug Fixes

- **deps:** bump actions/cache from 2.1.7 to 3 ([829168c](https://github.com/justintaddei/v-wave/commits/829168c408f3c30aad2dca741d70d7da8a6e737a))
- **deps:** bump actions/setup-node from 3.0.0 to 3.1.0 ([7b91f02](https://github.com/justintaddei/v-wave/commits/7b91f0287c83f3b364b8d47fc9e58ac46c79728e))
- **deps:** bump actions/setup-node from 3.1.0 to 3.1.1 ([7e27a90](https://github.com/justintaddei/v-wave/commits/7e27a9043d3b2a9f28bdd4c42a85ab01548d0276))
- **deps:** bump actions/setup-node from 3.1.1 to 3.2.0 ([3456701](https://github.com/justintaddei/v-wave/commits/345670135bd6cc944ede54286a97aecde76a6b4d))
- **deps:** bump dependabot/fetch-metadata from 1.3.0 to 1.3.1 ([1177cec](https://github.com/justintaddei/v-wave/commits/1177cec8959aeb61a947765b08e2e56cebb8d56d))
- **deps:** bump minimist from 1.2.5 to 1.2.6 ([872e763](https://github.com/justintaddei/v-wave/commits/872e7634b44ac1959c0d540faf33ed36da7d2c09))

## [1.4.0](https://github.com/justintaddei/v-wave/compare/v1.3.3...v1.4.0) (2022-03-21)

### Features

- dissolveDuration ([290c3ef](https://github.com/justintaddei/v-wave/commits/290c3efca9b4cbd03d549eb68eadd90295fc1555))
- tagName ([ac810b7](https://github.com/justintaddei/v-wave/commits/ac810b7859040854f9c3aa4cab9e006b6a69c093))
- wave triggers ([d90e5d8](https://github.com/justintaddei/v-wave/commits/d90e5d8adb0d73d962e73e28e8ce99aa7826fa11))

### Bug Fixes

- **deps:** bump actions/cache from 2.1.6 to 2.1.7 ([dc4b9a7](https://github.com/justintaddei/v-wave/commits/dc4b9a7ae0745ef473e910a884f11c81f8c59e76))
- **deps:** bump actions/setup-node from 2.4.1 to 2.5.0 ([50e10d9](https://github.com/justintaddei/v-wave/commits/50e10d9e646a16ebdc831f71708f8849e22eb42f))
- **deps:** bump actions/setup-node from 2.5.0 to 2.5.1 ([91a45f7](https://github.com/justintaddei/v-wave/commits/91a45f704b08434314dbba711d9c73171bc9e5ca))
- **deps:** bump actions/setup-node from 2.5.1 to 3.0.0 ([0f3d3b1](https://github.com/justintaddei/v-wave/commits/0f3d3b19821e07018c0bde66bd119e4717cce77b))
- **deps:** bump dependabot/fetch-metadata from 1.1.0 to 1.1.1 ([1f02689](https://github.com/justintaddei/v-wave/commits/1f02689f7b47887542c95e1a7983c00541d0a1f6))
- **deps:** bump dependabot/fetch-metadata from 1.1.1 to 1.2.0 ([36d5088](https://github.com/justintaddei/v-wave/commits/36d508831866cd69999c5d450da1b2ba9429a40a))
- **deps:** bump dependabot/fetch-metadata from 1.2.0 to 1.2.1 ([6345896](https://github.com/justintaddei/v-wave/commits/634589607e8c20fb169cf78fcafed177a9b55748))
- **deps:** bump dependabot/fetch-metadata from 1.2.1 to 1.3.0 ([05996e7](https://github.com/justintaddei/v-wave/commits/05996e7fb176ce3d2477fa3b111ee83971e0fa76))

### [1.3.3](https://github.com/justintaddei/v-wave/compare/v1.3.2...v1.3.3) (2021-11-16)

### Bug Fixes

- remove baseUrl from tsconfig ([8f8b11e](https://github.com/justintaddei/v-wave/commits/8f8b11ee1593d5381e70acb91452bfa66a6ac8ca)), closes [#191](https://github.com/justintaddei/v-wave/issues/191)

### [1.3.2](https://github.com/justintaddei/v-wave/compare/v1.3.1...v1.3.2) (2021-11-09)

### Bug Fixes

- **deps:** bump actions/setup-node from 2.2.0 to 2.3.0 ([1cabf0f](https://github.com/justintaddei/v-wave/commits/1cabf0f7d9ba0008bf07203001a9d115167ac743))
- **deps:** bump actions/setup-node from 2.3.0 to 2.4.0 ([f737cdf](https://github.com/justintaddei/v-wave/commits/f737cdfa6ece0edf76160e683687224b6d00064f))
- **deps:** bump actions/setup-node from 2.4.0 to 2.4.1 ([1707ece](https://github.com/justintaddei/v-wave/commits/1707ece66712c7d0ef5a3a79a85ff5548d191ed9))
- **deps:** bump path-parse from 1.0.6 to 1.0.7 ([05713d3](https://github.com/justintaddei/v-wave/commits/05713d305547c29eadb0bd577038358ecde97985))
- ts error in Vue2 when `skipLibCheck: true` ([e5f4987](https://github.com/justintaddei/v-wave/commits/e5f4987f970320452736784e31843e9ea35bb20a)), closes [#191](https://github.com/justintaddei/v-wave/issues/191)

### [1.3.1](https://github.com/justintaddei/v-wave/compare/v1.3.0...v1.3.1) (2021-07-22)

### Bug Fixes

- rewrite vue3 check ([d4d25db](https://github.com/justintaddei/v-wave/commits/d4d25db3fdded738bb42b6137dd95e6f8cb877e6))

## [1.3.0](https://github.com/justintaddei/v-wave/compare/v1.2.8...v1.3.0) (2021-07-22)

### Features

- unbind directive ([1995d23](https://github.com/justintaddei/v-wave/commits/1995d2327c313ac16285d20d5a413884d42357a2)), closes [#69](https://github.com/justintaddei/v-wave/issues/69)

### Bug Fixes

- **deps:** bump actions/cache from 2.1.4 to 2.1.6 ([525fa02](https://github.com/justintaddei/v-wave/commits/525fa0224fcc659dc8cd2d69f53a0a6bf1ab000c))
- **deps:** bump actions/setup-node from 2.1.5 to 2.2.0 ([e8457b8](https://github.com/justintaddei/v-wave/commits/e8457b82a3c9d445c0d2856b84c4515924761a64))
- **deps:** bump actions/setup-node from v2.1.4 to v2.1.5 ([207d75c](https://github.com/justintaddei/v-wave/commits/207d75ca827faa35f347b1a7eb5881a7bee23b5b))
- **deps:** bump hosted-git-info from 2.8.8 to 2.8.9 ([1bee12a](https://github.com/justintaddei/v-wave/commits/1bee12a264949de430e6733a7d71677aeb1e0fee))
- **deps:** bump lodash from 4.17.20 to 4.17.21 ([d66e12a](https://github.com/justintaddei/v-wave/commits/d66e12a5185c494beae135eaebd34382d191c867))
- **deps:** bump ws from 7.4.1 to 7.4.6 ([d6a2b46](https://github.com/justintaddei/v-wave/commits/d6a2b46f5ed49eaa035d391e8fe41c4459a617b5))

### [1.2.8](https://github.com/justintaddei/v-wave/compare/v1.2.7...v1.2.8) (2021-02-14)

### [1.2.7](https://github.com/justintaddei/v-wave/compare/v1.2.6...v1.2.7) (2021-02-13)

### Bug Fixes

- **deps:** bump actions/cache from v2 to v2.1.4 ([9e5e74a](https://github.com/justintaddei/v-wave/commits/9e5e74a06b5afe4964228c4b314be39f01df3c15))
