import { spawn, SpawnOptionsWithoutStdio } from 'child_process';
import chalk from 'chalk';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

type CommandResult = {
  code: number | null;
  output: string;
}

type Env = 'dev' | 'staging' | 'prod';

const envToConfig = {
  dev: 'development',
  staging: 'staging',
  prod: 'production',
};

function runCommand(command: string, args: string[], options: SpawnOptionsWithoutStdio = {}): Promise<CommandResult> {
  return new Promise<CommandResult>((resolve, reject) => {
    const proc = spawn(command, args, { stdio: 'pipe', ...options });
    let output = '';

    proc.stdout?.on('data', (data: Buffer) => {
      output += data.toString();
      process.stdout.write(data);
    });

    proc.stderr?.on('data', (data: Buffer) => {
      output += data.toString();
      process.stderr.write(data);
    });

    proc.on('close', (code: number | null) => {
      resolve({ code, output });
    });

    proc.on('error', (error: Error) => {
      reject(new Error(`Error executing ${command}: ${error.message}`));
    });
  });
}

async function buildApp(env: Env) {
  const { code, output } = await runCommand('ng', ['build', '--configuration', envToConfig[env]]);
  if (code !== 0) {
    throw new Error(`firebase use ${env} exited with code ${code}\n${output}`);
  }
}

async function checkFirebaseVersion() {
  const { code, output } = await runCommand('firebase', ['--version']);
  if (code !== 0) {
    throw new Error(`firebase --version exited with code ${code}\n${output}`);
  } else {
    console.log(chalk.black.bgGreen(`firebase version: ${output}`));
  }
}

async function switchFirebaseProject(env: Env) {
  const { code, output } = await runCommand('firebase', ['use', env]);
  if (code !== 0) {
    throw new Error(`firebase use ${env} exited with code ${code}\n${output}`);
  }
}

async function deployFirebase(env: Env) {
  const { code, output } = await runCommand('firebase', ['deploy', '--only', `hosting:community-appdet-${env}`]);
  if (code !== 0) {
    if (output.includes('Error: HTTP Error: 401')) {
      console.log(chalk.black.bgYellow('please try "firebase login --reauth"'));
    } else {
      throw new Error(`firebase deploy exited with code ${code}\n${output}`);
    }
  }
}

async function main() {
  const argv = await yargs(hideBin(process.argv)).option('env', {
    type: 'string',
    default: 'dev',
    choices: ['dev', 'staging', 'prod'],
    describe: 'The environment to deploy',
  }).argv;

  try {
    // Install packages
    const { code: installCode, output: installOutput } = await runCommand('npm', ['install']);
    if (installCode !== 0) {
      throw new Error(`npm install exited with code ${installCode}\n${installOutput}`);
    }
    await buildApp(argv.env as Env);
    await checkFirebaseVersion();
    await switchFirebaseProject(argv.env as Env);
    await deployFirebase(argv.env as Env);
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
}

main();
