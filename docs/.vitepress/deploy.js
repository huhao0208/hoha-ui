// const shell = require("shelljs"); // 执行shell命令
import shell from "shelljs"
import path from "path"
import chalk from "chalk"
import { fileURLToPath } from 'url'




const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)


const defaultLog = log => console.log(chalk.blue(`${log}\n`));
const errorLog = log => console.log(chalk.red(`${log}\n `));
const successLog = log => console.log(chalk.green(`${log}\n `));

shell.cd(path.resolve(__dirnameNew, 'dist'));
shell.exec('git init')
shell.exec("git add -A");
shell.exec(`git commit -m "deploy"`);
shell.exec("git push -f https://github.com/huhao0208/huhao0208.github.io.git master");

successLog('文档部署成功,点击下方地址即可查看')
defaultLog('https://huhao0208.github.io')
