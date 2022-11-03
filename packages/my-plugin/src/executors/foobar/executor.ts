import { FoobarExecutorSchema } from './schema';

export default async function runExecutor(
  options: FoobarExecutorSchema,
) {
  console.log('Executor ran for Foobar', options);
  return {
    success: true
  };
}

