import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from "path";
import * as fs from "fs";

// 定义路径和文件
const IGNORE_FILE = ".svnignore";
const CONFIG = path.join(process.env.HOME || "", ".subversion/config");
// 创建输出面板
const outputChannel = vscode.window.createOutputChannel("SVN Ignore Manager");
// Helper function to execute shell commands
const runCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // 获取当前工作区目录
    const workspaceFolder = vscode.workspace.workspaceFolders
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : "";

    if (!workspaceFolder) {
      vscode.window.showErrorMessage("没有打开任何工作区。");
      return;
    }
    exec(command, { cwd: workspaceFolder }, (error, stdout, stderr) => {
      if (error) {
        vscode.window.showErrorMessage(`执行命令失败: ${stderr} ${error}`);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

// 添加时间戳和格式化日志消息
const logMessage = (message: string, type?: "info" | "error") => {
  const timestamp = new Date().toLocaleTimeString();
  const formattedMessage = `[${timestamp}] ${message}`;
  outputChannel.appendLine(formattedMessage);
  if (type === "info") {
    vscode.window.showInformationMessage(formattedMessage);
  } else if (type === "error") {
    vscode.window.showErrorMessage(formattedMessage);
  }
};

// 检查并创建忽略文件
const checkIgnoreFile = async () => {
  logMessage("检查并创建忽略文件");
  if (!fs.existsSync(IGNORE_FILE)) {
    logMessage(`创建忽略文件：${IGNORE_FILE}`);
    fs.writeFileSync(IGNORE_FILE, "");
  } else {
    logMessage(`忽略文件已存在：${IGNORE_FILE}`);
  }
};

// 清除现有的全局忽略配置
const clearGlobalIgnores = async () => {
  logMessage("------ 清除现有的全局忽略配置");
  try {
    const res = await runCommand(`sed -i '/\\[miscellany\\]/,/^$/d' ${CONFIG}`);
    logMessage(`已清除现有的全局忽略配置: ${res}`);
  } catch (error) {
    logMessage(`清除现有的全局忽略配置失败: ${error}`, "error");
  }
};

// 设置全局忽略配置
const setGlobalIgnores = async () => {
  logMessage("------ 设置全局忽略配置");
  try {
    const res1 = await runCommand(`echo "[miscellany]" >> ${CONFIG}`);
    const res2 = await runCommand(`echo "global-ignores=" >> ${CONFIG}`);
    logMessage(`已设置全局忽略配置: ${res1}, ${res2}`);
  } catch (error) {
    logMessage(`设置全局忽略配置失败: ${error}`, "error");
  }
};

// 从忽略文件中导入忽略规则
const importIgnoreRules = async () => {
  logMessage("------ 从忽略文件中导入忽略规则");
  try {
    const res = await runCommand(
      `svn propset svn:global-ignores --file ${IGNORE_FILE} .`
    );
    logMessage(`已导入忽略规则:\n${res}`);
  } catch (error) {
    logMessage(`导入忽略规则失败: ${error}`, "error");
  }
};

// 显示当前的忽略规则
const displayIgnoreRules = async () => {
  logMessage("------ 显示当前的忽略规则");
  try {
    const res = await runCommand("svn propget svn:global-ignores .");
    logMessage(`当前的忽略规则:\n${res}`);
  } catch (error) {
    logMessage(`显示当前的忽略规则失败: ${error}`, "error");
  }
};

// 检查被忽略的文件和目录
const checkIgnoredFiles = async () => {
  logMessage("------ 检查被忽略的文件和目录");
  try {
    const res = await runCommand("svn status --no-ignore | grep ^I");
    logMessage(`检查被忽略的文件和目录完成:\n${res}`);
  } catch (error) {
    logMessage(`检查被忽略的文件和目录失败: ${error}`, "error");
  }
};

// 从版本控制中移除文件或目录，但保留本地副本
const removeFromVersionControl = async () => {
  logMessage("------ 从版本控制中移除文件或目录，但保留本地副本");
  try {
    const ignoreFileContent = fs.readFileSync(IGNORE_FILE, "utf-8");
    const filesToRemove = ignoreFileContent
      .split("\n")
      .filter((line: string) => line.trim() !== "");
    let res = "";
    for (const item of filesToRemove) {
      res += await runCommand(`svn rm --keep-local ${item}`);
    }
    logMessage(`从版本控制中移除文件或目录完成:\n${res}`);
  } catch (error) {
    logMessage(`从版本控制中移除文件或目录失败: ${error}`, "error");
  }
};

// 提交更改
const commitChanges = async () => {
  logMessage("------ 提交更改");
  try {
    const res = await runCommand(
      'svn commit -m "从版本控制中移除忽略的项目，但保留本地副本"'
    );
    logMessage(`提交更改完成:\n${res}`);
  } catch (error) {
    logMessage(`提交更改失败: ${error}`, "error");
  }
};

// 主函数
const main = async () => {
  logMessage("------ 开始执行 SVN 操作");
  const config = vscode.workspace.getConfiguration("svnIgnoreManager");
  try {
    if (config.get("runChecks")) {
      await checkIgnoreFile();
    }
    if (config.get("clearGlobalIgnores")) {
      await clearGlobalIgnores();
    }
    if (config.get("setGlobalIgnores")) {
      await setGlobalIgnores();
    }
    if (config.get("importIgnoreRules")) {
      await importIgnoreRules();
    }
    if (config.get("displayIgnoreRules")) {
      await displayIgnoreRules();
    }
    if (config.get("checkIgnoredFiles")) {
      await checkIgnoredFiles();
    }
    if (config.get("removeFromVersionControl")) {
      await removeFromVersionControl();
    }
    if (config.get("commitChanges")) {
      await commitChanges();
    }
  } catch (error) {
    logMessage(`插件执行失败: ${error}`, "error");
  }
  logMessage("------ SVN 操作完成");
};

// 添加到 .svnignore 文件的函数
const addToSvnIgnore = async (filePaths: string[]) => {
  const ignoreFilePath = path.join(
    vscode.workspace.rootPath || "",
    IGNORE_FILE
  );

  if (!fs.existsSync(ignoreFilePath)) {
    fs.writeFileSync(ignoreFilePath, "");
  }

  const ignoreFileContent = fs.readFileSync(ignoreFilePath, "utf-8");
  const relativePaths = filePaths.map((filePath) =>
    path.relative(vscode.workspace.rootPath || "", filePath)
  );

  for (const relativePath of relativePaths) {
    if (!ignoreFileContent.includes(relativePath)) {
      fs.appendFileSync(ignoreFilePath, `\n${relativePath}`);
      logMessage(`文件/文件夹 ${relativePath} 已添加到 .svnignore 文件中`);
    } else {
      logMessage(`文件/文件夹 ${relativePath} 已经存在于 .svnignore 文件中`);
    }
  }
};

// 插件激活时执行
export function activate(context: vscode.ExtensionContext) {
  console.log('VSCode 插件 "svn-ignore-manager" 已激活');
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "extension.ignore",
      async (uri: vscode.Uri) => {
        try {
          let answer = await vscode.window.showInformationMessage(
            "确定要忽略提交这个文件/文件夹吗 ?",
            "确定",
            "取消"
          );
          if (answer === "取消") {
            vscode.window.showInformationMessage("sorry to hear it");
          } else {
            if (uri) {
              await addToSvnIgnore([uri.fsPath]);
              await main();
              // 显示输出面板
              outputChannel.show();
              // 同时展示重要的通知消息
              vscode.window.showInformationMessage(
                "重要消息：请检查输出面板以获取详细信息"
              );
            }
          }
        } catch (error) {
          vscode.window.showErrorMessage(`插件执行失败: ${error}`);
        }
      }
    )
  );

  let disposable = vscode.commands.registerCommand(
    "extension.runSVNScript",
    async (uri: vscode.Uri) => {
      try {
        await main();
      } catch (error) {
        vscode.window.showErrorMessage(`插件执行失败: ${error}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// 插件停用时执行
export function deactivate() {}
