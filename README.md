//test PR updates

# Practice Playwright Project

This repository contains a comprehensive set of Playwright tests and practice scripts for web automation. The project is designed to help you learn, experiment, and master Playwright features, including selectors, page object models, custom test methods, and more.

## Project Structure

- `tests/` — Main folder for Playwright test scripts and supporting files.
  - `ArrayMethodsPractice.ts` — Practice with array methods in TypeScript.
  - `coffee-order.spec.ts`, `conduit.test.ts`, `example.spec.ts`, `qa_tools.test.ts` — Example test files for different scenarios.
  - `CoffeeTestsWithCssSelectors/`, `ConduitTestsWithCssSelectors/` — Organized tests using CSS selectors.
  - `TestsWithVariables/` — Tests demonstrating variable usage.
  - `TestWithMethods/` — Tests using custom methods and page objects.
    - `BasicPage.ts`, `CreateArticlePage.ts`, `LogInPage.ts`, `SignUpPage.ts` — Page object files.
    - `conduitWithMethods.spec.ts` — Spec file using methods and page objects.
- `tests-examples/` — Additional example tests for demonstration purposes.
- `playwright.config.ts` — Playwright configuration file.
- `playwright-report/` — Generated test reports (after running tests).
- `test-results/` — Output from test runs.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run tests:**
   ```bash
   npx playwright test
   ```
3. **View reports:**
   Open `playwright-report/index.html` after running tests to see detailed results.

## Features
- Practice Playwright automation with real-world scenarios
- Experiment with selectors, page objects, and custom methods
- Organized test suites for different approaches and techniques
- Easily extensible for new tests and learning modules

## Purpose
- Learn and master Playwright for web automation
- Explore best practices in test organization and structure
- Provide a playground for experimenting with advanced Playwright features

## Contributing
Feel free to add new tests, page objects, or folders as you expand your practice. Contributions and suggestions are welcome!

## License
This project is for educational and practice purposes. Please check the repository for license details if you plan to use it in production.
