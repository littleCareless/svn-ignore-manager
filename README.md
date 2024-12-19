# SVN Ignore Manager

**SVN Ignore Manager** 是一个用于管理 SVN 忽略规则的 VS Code 插件。它帮助你创建和维护 `.svnignore` 文件，并将忽略规则应用到 SVN 配置中。此插件提供了一些实用的命令来简化 SVN 忽略规则的管理。

## 功能

- **创建或检查 `.svnignore` 文件**：确保 `.svnignore` 文件存在并初始化。
- **清除和设置全局忽略配置**：管理 SVN 的全局忽略配置。
- **从 `.svnignore` 文件中导入忽略规则**：将忽略规则应用到 SVN 配置中。
- **显示当前的忽略规则**：查看当前 SVN 忽略规则。
- **检查被忽略的文件和目录**：检查哪些文件和目录被忽略。
- **从版本控制中移除文件或目录，但保留本地副本**：从版本控制中删除忽略的项目，但保留本地副本。
- **提交更改**：提交对版本控制的更改。

## 安装

1. **从 VS Code 市场安装**：

   - 打开 VS Code。
   - 转到扩展视图（侧边栏的四个方块图标）。
   - 搜索 **SVN Ignore Manager**。
   - 点击“安装”按钮。

2. **从源代码安装**：

   - 克隆这个仓库：

     ```bash
     git clone https://github.com/littleCareless/svn-ignore-manager.git
     ```

   - 进入插件目录：

     ```bash
     cd svn-ignore-manager
     ```

   - 安装依赖：

     ```bash
     npm install
     ```

   - 打包插件：

     ```bash
     vsce package
     ```

   - 从 VS Code 中安装生成的 `.vsix` 文件。

## 使用

在 VS Code 中安装并启用插件后，你可以通过以下命令来操作插件：

1. **添加文件到 `.svnignore`**：

   右键点击文件或文件夹，选择 `Ignore` 命令将其添加到 `.svnignore` 文件中。

2. **运行 SVN 脚本**：

   - 打开命令面板（`Ctrl+Shift+P` 或 `Cmd+Shift+P`）。
   - 输入 `Run SVN Script` 并选择该命令。
   - 插件会自动执行 SVN 操作，并显示输出面板。

## 配置

在 VS Code 的设置中，你可以配置插件的行为。打开设置（`Ctrl+,` 或 `Cmd+,`），并查找 `svnIgnoreManager`。以下是可配置的选项：

- **runChecks**: 是否检查 `.svnignore` 文件。
- **clearGlobalIgnores**: 是否清除全局忽略配置。
- **setGlobalIgnores**: 是否设置全局忽略配置。
- **importIgnoreRules**: 是否从 `.svnignore` 文件中导入忽略规则。
- **displayIgnoreRules**: 是否显示当前的忽略规则。
- **checkIgnoredFiles**: 是否检查被忽略的文件和目录。
- **removeFromVersionControl**: 是否从版本控制中移除忽略的文件或目录。
- **commitChanges**: 是否提交更改。

## 常见问题解答

### 问题 1

**问：** 插件在我的环境中不起作用，怎么办？

**答：** 确保你已按照 [安装说明](#安装) 正确安装插件。如果问题仍然存在，请查看 [问题跟踪](https://github.com/littleCareless/svn-ignore-manager/issues) 或者联系支持团队。

### 问题 2

**问：** 如何卸载插件？

**答：** 在 VS Code 的扩展视图中，找到插件，点击“卸载”按钮。

## 贡献

欢迎你为插件做出贡献！请参阅 [贡献指南](CONTRIBUTING.md) 了解如何参与项目。

## 许可证

插件遵循 [MIT 许可证](LICENSE) 开源许可协议。请参阅 [许可证文件](LICENSE) 了解更多信息。

## 联系信息

如果你有任何问题或建议，请通过以下方式联系我：

- **电子邮件**：your-email@example.com
- **GitHub Issues**： [插件问题跟踪](https://github.com/littleCareless/svn-ignore-manager/issues)
