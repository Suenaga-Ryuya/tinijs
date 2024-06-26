import {pathExistsSync} from 'fs-extra/esm';
import {
  TiniProject,
  getProjectDirs,
  type Builder,
  type CommonBuildOptions,
} from '@tinijs/project';

export interface BuildOptions extends CommonBuildOptions {
  sourcemap?: boolean;
}

export default function (options: BuildOptions, tiniProject: TiniProject) {
  return new ParcelBuilder(options, tiniProject);
}

export class ParcelBuilder implements Builder {
  private readonly DEFAULT_PARCEL_CONFIG_FILE =
    './node_modules/@tinijs/parcel-builder/.parcelrc';
  private readonly LOCAL_PARCEL_CONFIG_FILE = this.getLocalParcelConfigFile();

  constructor(
    public options: BuildOptions,
    private tiniProject: TiniProject
  ) {}

  get dev() {
    return {
      command: this.commands.devCommand,
      onServerStart: this.options.onDevServerStart,
    };
  }

  get watch() {
    return {
      command: this.commands.watchCommand,
    };
  }

  get build() {
    return {
      command: this.commands.buildCommand,
    };
  }

  private get commands() {
    const {entryDir, outDir} = getProjectDirs(this.tiniProject.config);
    const {
      configPath,
      devCommand,
      devHost,
      devPort,
      watchCommand,
      buildCommand,
      sourcemap,
    } = this.options;
    const entryFilePath = `${entryDir}/index.html`;
    const configArgs = [
      '--config',
      configPath ||
        this.LOCAL_PARCEL_CONFIG_FILE ||
        this.DEFAULT_PARCEL_CONFIG_FILE,
    ];
    const outDirArgs = ['--dist-dir', outDir];
    const hostArgs = !devHost ? [] : ['--host', devHost];
    const portArgs = ['--port', `${devPort || '3000'}`];
    const sourcemapArgs = sourcemap !== false ? [] : ['--no-source-maps'];
    return {
      devCommand:
        devCommand ||
        [
          'parcel',
          entryFilePath,
          ...configArgs,
          ...outDirArgs,
          ...hostArgs,
          ...portArgs,
        ].filter(Boolean),
      watchCommand:
        watchCommand ||
        [
          'parcel',
          'watch',
          entryFilePath,
          ...configArgs,
          ...outDirArgs,
          ...sourcemapArgs,
        ].filter(Boolean),
      buildCommand:
        buildCommand ||
        [
          'parcel',
          'build',
          entryFilePath,
          ...configArgs,
          ...outDirArgs,
          ...sourcemapArgs,
        ].filter(Boolean),
    };
  }

  private getLocalParcelConfigFile() {
    const rcPath = './.parcelrc';
    return !pathExistsSync(rcPath) ? null : rcPath;
  }
}
