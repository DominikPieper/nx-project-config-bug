import {
  formatFiles,
  joinPathFragments,
  ProjectConfiguration,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
  writeJson,
} from '@nrwl/devkit';
import { MyPluginGeneratorSchema } from './schema';

function addPackageJson(tree: Tree, projectConfig: ProjectConfiguration) {
  writeJson(tree, joinPathFragments(projectConfig.root, 'package.json'), {
    name: projectConfig.name,
    devDependencies: { '@capacitor/cli': '0.0.0' },
  });
}

export default async function (tree: Tree, options: MyPluginGeneratorSchema) {
  const projectConfig = readProjectConfiguration(tree, options.name);

  addPackageJson(tree, projectConfig);

  projectConfig.targets.foobar = {
    executor: '@project-config-bug/my-plugin:foobar',
  };
  updateProjectConfiguration(tree, options.name, projectConfig);

  await formatFiles(tree);
}
