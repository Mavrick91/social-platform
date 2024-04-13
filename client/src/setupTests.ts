import '@testing-library/jest-dom';

import * as storage from '@/lib/storage';

jest.mock(
  '@/assets/placeholder-avatar.png',
  () => '@/assets/placeholder-avatar.png'
);

const mockUser: any = {
  id: 1,
  username: 'testuser',
  firstName: 'Test',
  lastName: 'User',
  bio: 'This is a bio.',
  avatar: 'path/to/avatar.png',
};

beforeEach(() => {
  jest.spyOn(storage, 'getUser').mockImplementation(() => mockUser);
});

afterEach(() => {
  jest.restoreAllMocks();
});
