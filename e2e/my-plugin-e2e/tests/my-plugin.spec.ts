import {
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('my-plugin e2e', () => {
  const projectName = uniq('test');

  beforeAll(async () => {
    ensureNxProject('@project-config-bug/my-plugin', 'dist/packages/my-plugin');
    await runNxCommandAsync(
      `generate @nrwl/react:app ${projectName} --routing=false`
    );
  }, 600000);

  afterAll(() => {
    runNxCommandAsync('reset');
  });

  it('should keep existing targets', async () => {
    await runNxCommandAsync(
      `generate @project-config-bug/my-plugin:my-plugin ${projectName}`
    );

  }, 120000);
});
