import '@testing-library/jest-dom';
import { server } from './mocks/server.js';// setupTests.js ou setupTests.ts
import '@testing-library/jest-dom/extend-expect';


// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());