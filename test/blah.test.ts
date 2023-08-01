function sum(x, y) {
  return x + y;
}

describe('Test the CI', () => {
  it('works', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});
