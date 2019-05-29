import { handler } from "../app";

describe('app.ts', () => {
  it('Should correctly get location pairs and calculate distances', async () => {
    const data = ['New York', 'Moscow', 'Philadelphia', 'Saint Petersburg', 'Nowhere'];
    // const expectedResult = 1;
    const result = await handler(data)
    expect(result).toMatchSnapshot();
  })
})
