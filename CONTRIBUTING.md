# Contributing to v-wave

Thank you for your interest contributing to v-wave! As this project is maintained by just one person, your help is greatly appreciated.

## Table of contents

- [Contributing to v-wave](#contributing-to-v-wave)
  - [Table of contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Development](#development)
    - [Testing](#testing)
    - [Linting and formatting](#linting-and-formatting)
    - [Building](#building)
  - [Raising a pull request](#raising-a-pull-request)

## Prerequisites

This project uses pnpm for package management. Installation instructions can be found [here](https://pnpm.io/installation).

## Setup

Run `pnpm install` to install dependencies and set up git commit hooks.  

**If you're using VSCode, I recommend installing the following extensions:**

- [biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) (for displaying linting/formatting errors)
- [vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) (for displaying vitest test results in the editor)


## Development

### Testing

This project uses [vitest](https://vitest.dev/) for testing.  
> If you're familiar with Jest, you should be able to write most tests using your existing knowledge, substituting `jest.*` functions for `vi.*`.

Run `pnpm test` or `pnpm test:watch` to run the test suite.  
Run `pnpm test:coverage` to run the test suite and generate a coverage report.

When writing tests, place them in the same directory as the file they are testing.  
Test files should follow this naming convention: `<name of source file>.test.ts`.

### Linting and formatting

Run `pnpm lint` to lint and format the project.  
Run `pnpm lint:no-write` to lint the project without writing any changes.

### Building

Run `pnpm build` to build the project for production.  
Run `pnpm dev` to build the project and watch for changes.


## Raising a pull request

When you're ready to raise a pull request, please follow these steps:

1. Ensure that commits follow [Conventional Commits](https://www.conventionalcommits.org/) and meaningful describe your changes. Your commit messages will be used to generate the changelog automatically.
2. When you commit your changes, hooks will run automatically to ensure your code follows the project's conventions. Please do not commit using `git commit --no-verify`. If you do, the CI will fail for PR and you'll need to fix any linting errors before it can be merged.
   > **Note:** if the CI fails because your commit message didn't comply with [Conventional Commits](https://www.conventionalcommits.org/), you will need to modify your commit message using `git commit --amend` or `git rebase -i`.
3. Please try to provide as much context as possible in the PR description as it will help me to review your changes more quickly.
