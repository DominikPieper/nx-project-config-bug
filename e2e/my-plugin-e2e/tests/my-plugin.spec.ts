import {
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('my-plugin e2e', () => {
  let projectName: string;

  beforeAll(async () => {
    projectName = uniq('react-test-app');
    ensureNxProject('@project-config-bug/my-plugin', 'dist/packages/my-plugin');
    await runNxCommandAsync(
      `generate @nrwl/react:app ${projectName} --routing=false`
    );
  }, 600000);

  afterAll(async () => {
    await runNxCommandAsync('reset');
  });

  it('should keep existing targets', async () => {
    await runNxCommandAsync(
      `generate @project-config-bug/my-plugin:my-plugin ${projectName}`
    );

    const foobarResult = await runNxCommandAsync(`run ${projectName}:foobar`);
    expect(foobarResult.stdout).toContain('Executor ran for Foobar');
  }, 120000);
});
