import {
  formatFiles,
  joinPathFragments,
  logger,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
  writeJson,
} from '@nrwl/devkit';
import { inspect } from 'util';
import { MyPluginGeneratorSchema } from './schema';

function addPackageJson(tree: Tree, name: string) {
  const projectConfig = readProjectConfiguration(tree, name);
  
  writeJson(tree, joinPathFragments(projectConfig.root, 'package.json'), {
    name: name,
    devDependencies: { '@capacitor/cli': '0.0.0' },
  });

}

export default async function (tree: Tree, options: MyPluginGeneratorSchema) {
  addPackageJson(tree, options.name);

  const projectConfig = readProjectConfiguration(tree, options.name);
  logger.info(inspect(projectConfig));
  projectConfig.targets.foobar = {
    executor: '@my-plugin/foobar:foobar'
  }
  updateProjectConfiguration(tree, options.name, projectConfig);

  await formatFiles(tree);
}
