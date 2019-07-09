export const repositoryMockFactory = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  create: jest.fn(entity => entity),
  find: jest.fn(entity => entity),
}));
