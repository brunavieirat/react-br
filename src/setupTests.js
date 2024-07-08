import { server } from './mocks/server';
import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'jest';

beforeAll(() => server.listen({ onUnhandledRequest: "error"}));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
