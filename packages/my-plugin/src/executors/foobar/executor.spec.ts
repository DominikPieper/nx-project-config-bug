import { FoobarExecutorSchema } from './schema';
import executor from './executor';

const options: FoobarExecutorSchema = {};

describe('Foobar Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});