# HRMS Automation Framework

Modern Playwright test automation framework for HRMS application with Page Object Model pattern.

## Project Structure

```
HRMS Automation/
├── tests/
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.ts    # Base class with common methods
│   │   ├── LoginPage.ts   # Login functionality
│   │   ├── DashboardPage.ts
│   │   └── TaskSearchPage.ts
│   ├── fixtures/           # Test fixtures and setup
│   │   └── auth.fixture.ts # Authentication fixture
│   ├── helpers/            # Utilities and configuration
│   │   ├── config.ts      # Configuration and test data
│   │   └── logger.ts      # Logging utility
│   └── specs/             # Test specifications
│       ├── Login/
│       ├── Employee/
│       └── ...
├── playwright.config.js    # Playwright configuration
├── .env                    # Environment variables
└── README.md
```

## Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
BASE_URL=https://test.groniva.net
SHREE_URL=https://shree.groniva.net
TEST_EMAIL=chetank@girdmail.com
TEST_PASSWORD=1
SHREE_EMAIL=ckoranne89@gmail.com
SHREE_PASSWORD=Shree@123
```

## Running Tests

### Run all tests
```bash
npm run test
```

### Run specific test file
```bash
npm run test -- tests/specs/Login/login.spec.ts
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run tests with UI
```bash
npm run test:ui
```

### Generate and open HTML report
```bash
npm run test:report
```

## Test Scripts (package.json)

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:report": "playwright show-report"
  }
}
```

## Framework Features

### Page Object Model
- Centralized element selectors
- Reusable methods for common actions
- BasePage class with utility methods

### Best Practices
- ✅ Explicit waits instead of hardcoded delays
- ✅ Role-based selectors for reliability
- ✅ Environment variables for configuration
- ✅ Logging for debugging
- ✅ Test fixtures for setup/teardown
- ✅ Comprehensive error handling

### Key Classes

#### BasePage
Base class with common methods:
- `navigateTo()` - Navigate to URL
- `click()` - Click element with wait
- `fillText()` - Fill form field
- `getText()` - Get element text
- `isVisible()` - Check visibility
- `takeScreenshot()` - Capture screenshot

#### LoginPage
Handle authentication:
- `login()` - Perform login with credentials
- `verifyLoginPageLoaded()` - Verify login page elements

#### DashboardPage
Dashboard operations:
- `verifyWelcomeMessage()` - Verify user greeting
- `verifyDashboardLoaded()` - Check dashboard load

#### TaskSearchPage
Employee search functionality:
- `searchTask()` - Search by ID
- `selectTask()` - Select from results
- `searchAndselectTask()` - Combined operation

## Authentication Fixture

Use the auth fixture to automatically log in before tests:

```typescript
import { test } from '../../fixtures/auth.fixture';

test('should display user profile', async ({ dashboardPage }) => {
  // Already logged in via fixture
  await dashboardPage.verifyWelcomeMessage('John');
});
```

## Debugging

### Run single test in debug mode
```bash
npx playwright test tests/specs/Login/login.spec.ts --debug
```

### Enable trace recording
Set in `playwright.config.js`:
```javascript
trace: 'on',  // Always record trace
```

### View trace
```bash
npx playwright show-trace trace.zip
```

## Best Practices

1. **Use Page Objects** - Never use selectors directly in tests
2. **Meaningful Assertions** - Test business logic, not UI details
3. **Parallel Execution** - Tests run in parallel by default
4. **Avoid Sleep** - Use explicit waits instead of `waitForTimeout()`
5. **Environment Variables** - Never hardcode credentials
6. **Clear Test Names** - Describe what is being tested
7. **Fixtures** - Use for setup/teardown logic
8. **Logging** - Use Logger class for debugging

## Troubleshooting

### Tests failing with selector not found
- Use Playwright Inspector: `--debug` flag
- Verify selectors match current UI
- Use role-based selectors for stability

### Tests running slowly
- Check for `waitForTimeout()` calls
- Verify test environment is responsive
- Run tests in headless mode for speed

### Flaky tests
- Add explicit waits with `waitFor()`
- Use proper locators from getByRole, getByLabel, etc.
- Avoid index-based selection (`.nth()`) when possible

## CI/CD Integration

Update your CI pipeline to run tests:

```yaml
- name: Run tests
  run: npm run test
  
- name: Upload report
  if: always()
  uses: actions/upload-artifact@v2
  with:
    name: playwright-report
    path: playwright-report/
```

## Contributing

1. Follow existing code structure
2. Use Page Object Model pattern
3. Add meaningful test descriptions
4. Update .env for new credentials
5. Ensure tests are independent

## License

ISC
