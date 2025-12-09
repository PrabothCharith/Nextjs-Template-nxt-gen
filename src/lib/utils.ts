import { execa } from 'execa';
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';

export const runCommand = async (command: string, args: string[], cwd: string) => {
  const spinner = ora(`Running: ${command} ${args.join(' ')}`).start();
  try {
    spinner.stop(); 
    await execa(command, args, { cwd, stdio: 'inherit' });
    spinner.succeed();
  } catch (error) {
    spinner.fail(`Failed to execute ${command}`);
    throw error;
  }
};

export const copyTemplate = async (templateName: string, targetPath: string) => {
  const templatePath = path.join(__dirname, '../../templates', templateName);
  await fs.copy(templatePath, targetPath);
};
