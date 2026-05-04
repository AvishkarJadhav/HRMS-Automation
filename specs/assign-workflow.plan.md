# Assign Workflow Management Test Plan

## Application Overview

Comprehensive test coverage for the Assign Workflow Management page. This page displays a list of workflow assignments with filtering, searching, and pagination capabilities. Users can search for specific workflows, navigate through pages, and view details of each workflow task assignment. The page contains a data table with 186 total entries showing workflow tasks, types, sub-types, policy groups, and effective dates.

## Test Scenarios

### 1. Page Load and Layout Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Assign Workflow page loads successfully

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Navigate to the Assign Workflow management page
    - expect: Page loads without errors
    - expect: Title 'Assign Workflow' is visible
    - expect: Table with workflow records is displayed
  2. Wait for page to fully load with all elements visible
    - expect: Page status is ready
    - expect: User greeting 'Welcome [Username]' is visible
    - expect: Search Menu is accessible
  3. Verify table headers are present and readable
    - expect: All column headers are visible: Sr No, Id, Assign Workflow Task, Assign Workflow Type Data, Assign Workflow Sub Type Data, Policy Group, Effective From
    - expect: Column headers are properly aligned
    - expect: Table body contains at least 1 record

#### 1.2. Verify page displays correct number of records

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Load the Assign Workflow page
    - expect: Page displays successfully
    - expect: Status shows 'Showing 1 to 10 records of 186 entries'
  2. Count visible rows in the table
    - expect: Exactly 10 rows are visible on the first page
    - expect: Each row contains all required data columns
    - expect: No empty rows are displayed
  3. Verify record count matches pagination indicator
    - expect: Row count (10) matches the pagination statement
    - expect: Total entries (186) is correct
    - expect: Page shows records 1-10

#### 1.3. Verify page layout and responsive design

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Load the page and check all UI components
    - expect: Search bar is visible and accessible at the top
    - expect: Table is fully visible without horizontal scrolling where possible
    - expect: Pagination controls are visible at the bottom
    - expect: Filter/settings icon is accessible on the right
  2. Verify all columns are visible and properly formatted
    - expect: No column text is cut off or truncated
    - expect: Column widths are appropriate for content
    - expect: Dates are displayed in consistent format

### 2. Search Functionality Tests

**Seed:** `tests/seed.spec.ts`

#### 2.1. Search for workflow by ID

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Click on the Search Menu input field
    - expect: Search field is focused
    - expect: Cursor is visible in the search field
    - expect: Placeholder text is displayed
  2. Type a valid workflow ID (e.g., '1004') in the search field
    - expect: Text appears in search field as typed
    - expect: No search results are displayed yet
  3. Press Enter or wait for auto-search to trigger
    - expect: Search executes
    - expect: Table updates with filtered results
    - expect: Only records matching the search criteria are displayed
    - expect: If no results, 'No records found' message appears
  4. Verify the search result contains the correct workflow ID
    - expect: Returned record shows ID '1004'
    - expect: Record details are accurate
    - expect: Record contains all expected columns

#### 2.2. Search for workflow by Task name

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Click on the Search Menu field
    - expect: Search field is focused and ready for input
  2. Type a workflow task name (e.g., 'Apply work from home')
    - expect: Search text is entered correctly
  3. Press Enter or trigger search
    - expect: Table filters to show matching workflows
    - expect: At least one record with the task name appears
    - expect: No unrelated records are displayed
  4. Verify search results are accurate
    - expect: All displayed tasks contain the search term
    - expect: Search is case-insensitive or handles variations properly

#### 2.3. Search with empty or invalid input

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Click Search Menu and clear any existing text
    - expect: Search field is empty
  2. Press Enter without entering any search term
    - expect: Page displays all records (resets to default view)
    - expect: Shows 'Showing 1 to 10 records of 186 entries'
  3. Enter a search term that doesn't exist (e.g., 'XYZ123')
    - expect: Search executes
    - expect: No records are displayed
    - expect: Message indicates 'No records found' or similar
  4. Clear the search and verify all records reappear
    - expect: All records are restored
    - expect: Page returns to original state showing 1-10 of 186

#### 2.4. Search persistence across pagination

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Search for a specific workflow (e.g., ID '1004')
    - expect: Single record or filtered results appear
  2. Navigate to another page using pagination if applicable
    - expect: Search filter remains active
    - expect: Only filtered results are shown across pages
  3. Clear the search filter
    - expect: All records are displayed again
    - expect: Page resets to show 1-10 of 186

### 3. Pagination Tests

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify default pagination displays first 10 records

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Load the Assign Workflow page
    - expect: First 10 records are displayed
    - expect: Page indicator shows '1' is selected
    - expect: Status shows 'Showing 1 to 10 records of 186 entries'
  2. Count visible rows
    - expect: Exactly 10 rows are visible
    - expect: All rows contain complete data

#### 3.2. Navigate to next page using pagination controls

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Click on page number '2' in pagination controls
    - expect: Page transitions smoothly
    - expect: Page 2 indicator is highlighted
    - expect: Table updates with records 11-20
  2. Verify records have changed from page 1
    - expect: Different records are displayed
    - expect: Record IDs are different from page 1
    - expect: Status shows 'Showing 11 to 20 records of 186 entries'
  3. Verify all records on page 2 are valid
    - expect: All 10 rows contain data
    - expect: No duplicate records from page 1
    - expect: All columns have values

#### 3.3. Navigate to last page

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Calculate last page number (186 records ÷ 10 per page = 18-19 pages)
    - expect: Math is correct
  2. Click on the last available page number
    - expect: Page transitions to last page
    - expect: Last page indicator is highlighted
  3. Verify remaining records are displayed
    - expect: Fewer than 10 records are shown (only remaining entries)
    - expect: Last page may show 6 records (if 186 total)
    - expect: No pagination links appear after the last page

#### 3.4. Navigate between multiple pages sequentially

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Start on page 1 and click page 2
    - expect: Records change appropriately
  2. From page 2, click page 3
    - expect: Records continue to update correctly
  3. From page 3, click page 1
    - expect: Records revert to page 1 correctly
  4. Verify record continuity across pages
    - expect: No records are duplicated
    - expect: No records are skipped
    - expect: Each page shows the correct record range

#### 3.5. Test pagination with edge cases

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Click on a page number near the end (e.g., page 19)
    - expect: Page loads with remaining records
  2. Attempt to navigate beyond the last page
    - expect: Navigation is prevented or last page remains active
    - expect: No error occurs
  3. Go back to page 1 from the last page
    - expect: Navigation succeeds
    - expect: Page 1 records are displayed correctly
  4. Verify page numbers in pagination are correct
    - expect: All page numbers are sequential
    - expect: Total pages matches 186 ÷ 10 calculation

### 4. Table Data and Column Tests

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify all table columns contain expected data

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Examine the first 3 rows of the table
    - expect: Sr No column shows numbers 1, 2, 3
    - expect: Id column contains numeric IDs (1004, 1005, 1009, etc.)
    - expect: Assign Workflow Task contains descriptive task names
    - expect: Assign Workflow Type Data shows type categories
  2. Check Assign Workflow Sub Type Data and Policy Group columns
    - expect: Sub Type Data column contains values like 'Na' or specific types
    - expect: Policy Group column contains group names like 'Staff', 'Bit99', 'Global compliance'
  3. Verify Effective From dates are present
    - expect: Dates are displayed in consistent format (YYYY-MM-DD)
    - expect: All visible dates are valid
    - expect: Dates are reasonable (not in past if current contracts)

#### 4.2. Verify data accuracy in table records

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Review record ID 1004 details
    - expect: Id: 1004
    - expect: Task: Apply work from home
    - expect: Type Data: Tata consultancy services
    - expect: Sub Type: Na
    - expect: Policy Group: Bit99
    - expect: Effective From: 2025-02-01
  2. Review record ID 1005 details
    - expect: Id: 1005
    - expect: Task: Apply missing punch
    - expect: Type Data: Tata consultancy services
    - expect: Sub Type: Na
    - expect: Policy Group: Staff
    - expect: Effective From: 2025-02-01
  3. Review record ID 1009 details
    - expect: Id: 1009
    - expect: Task: Algorithm
    - expect: Type Data: Enterprises
    - expect: Sub Type: Na
    - expect: Policy Group: Staff
    - expect: Effective From: 2024-01-01

#### 4.3. Verify no data truncation or overflow

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Look for any text that is cut off or overflowing in columns
    - expect: All text is fully visible
    - expect: No '...' truncation without hover expansion
  2. Check cells with longer text (Task names, Type Data)
    - expect: Text is fully readable
    - expect: Cell heights accommodate content
    - expect: No horizontal scrolling is required within cells

#### 4.4. Test sorting functionality if available

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Look for sort indicators (arrows) in column headers
    - expect: Column headers are identified
  2. If sortable, click on 'Id' column header
    - expect: Records are sorted by ID
    - expect: Sort indicator shows ascending or descending order
  3. Click sort arrow again
    - expect: Sort order reverses
    - expect: Records are reordered accordingly
  4. Verify sort works correctly on other columns like Task or Policy Group
    - expect: Sorting is applied correctly
    - expect: Records are in expected order
    - expect: No data is lost or duplicated during sort

### 5. Record Interaction Tests

**Seed:** `tests/seed.spec.ts`

#### 5.1. Click on a workflow record row

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Click on the first record row (ID 1004)
    - expect: Row is highlighted or selected (visual feedback)
    - expect: Page may navigate to a detail view or expand details
    - expect: Record details are displayed if detail view exists
  2. If detail view opens, verify all information is present
    - expect: All record columns are displayed with full data
    - expect: Additional details are shown if available
    - expect: Navigation back to list is possible

#### 5.2. Hover over table rows to check for interaction hints

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Hover over different rows in the table
    - expect: Row background changes color or shows hover effect
    - expect: Any action icons appear if hovering enables them
    - expect: Cursor changes to pointer on clickable elements
  2. Check if hover reveals additional actions or information
    - expect: Tooltips appear for truncated text if any
    - expect: Edit/Delete/View icons appear if available
    - expect: Hover state persists while hovering

#### 5.3. Test filter/settings functionality if available

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Click on the filter or settings icon (visible on page right)
    - expect: Filter panel or settings menu opens
    - expect: Options to filter by columns or criteria are presented
  2. If filters available, select a filter criterion
    - expect: Table updates to show filtered results
    - expect: Selected filter is highlighted or indicated
  3. Close filter panel
    - expect: Filter settings are saved or discarded as intended
    - expect: Page returns to normal view with or without filters applied

### 6. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 6.1. Handle network errors gracefully

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Simulate network delay by performing a search
    - expect: Loading indicator appears if network is slow
    - expect: Search completes successfully after delay
  2. Attempt to load page with poor network connection
    - expect: Appropriate timeout or retry message appears
    - expect: Page eventually loads or shows error message
    - expect: No blank/broken page is displayed

#### 6.2. Test page with maximum load scenario

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Navigate through all 19 pages sequentially
    - expect: Each page loads successfully
    - expect: No performance degradation
    - expect: Records remain consistent

#### 6.3. Verify handling of special characters in search

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`
 
**Steps:**
  1. Search for task with special characters if any exist (e.g., 'Esic')
    - expect: Search handles special characters correctly
    - expect: Correct results are returned
  2. Search with SQL injection-like strings to verify security
    - expect: Search treats input as literal text
    - expect: No database errors or exposures
  3. Search with very long strings
    - expect: Search handles long input gracefully
    - expect: Error message or truncation occurs appropriately

#### 6.4. Verify page behavior with invalid data scenarios

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Navigate to page numbers that don't exist (e.g., page 999)
    - expect: Page either redirects to last valid page or shows error
  2. Check table display when filtering returns no results
    - expect: 'No records found' message appears
    - expect: Table remains visible and structured
    - expect: User can clear filters to restore data
  3. Verify behavior when record count is exactly at page boundary
    - expect: Page breaks correctly with 10 records per page
    - expect: Last record of a page is handled properly

### 7. Performance and Load Tests

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify page load performance

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Measure page load time from navigation start to table display
    - expect: Page loads within 3-5 seconds
    - expect: All content is visible and interactive

#### 7.2. Test pagination performance

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Click through multiple pages rapidly
    - expect: Each page transition occurs smoothly
    - expect: No data loading delays between pages
    - expect: Page remains responsive

#### 7.3. Test search performance with large result sets

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Search for a common term that returns many results
    - expect: Results appear reasonably quickly
    - expect: Table is still responsive
    - expect: No hanging or frozen UI

### 8. User Session and State Management Tests

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify page state persists during user session

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Navigate to a specific page (e.g., page 3)
    - expect: Page 3 is displayed with correct records
  2. Navigate away from the page and return
    - expect: Page returns to the state it was left in or resets appropriately
    - expect: If session persists, page 3 is still shown
    - expect: If reset, page 1 is displayed

#### 8.2. Test user logout and re-login scenario

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Logout from the current session
    - expect: User is logged out successfully
  2. Log back in with the same credentials
    - expect: User is logged in successfully
    - expect: Assign Workflow page is accessible
  3. Navigate to Assign Workflow page
    - expect: Page loads with default state
    - expect: No cached or stale data from previous session

#### 8.3. Test session timeout handling

**File:** `tests/specs/workflow-management/assign-workflow.spec.ts`

**Steps:**
  1. Leave the page idle for an extended period if session timeout is configured
    - expect: User is notified of session expiration or redirected to login
  2. Attempt to interact with page after timeout
    - expect: Action triggers login redirect
    - expect: User can log in again and access the page
