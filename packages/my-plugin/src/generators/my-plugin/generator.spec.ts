import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration, addProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { MyPluginGeneratorSchema } from './schema';

describe('my-plugin generator', () => {
  let appTree: Tree;
  const options: MyPluginGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(appTree, options.name, {
      root: 'apps/testapp',
      targets: {
        test: {
          executor: '@nrwl/jest:jest',
        },
      },
    });
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
    expect(config.targets.test).toBeDefined();
    expect(config.targets.foobar).toBeDefined();
  });
});
