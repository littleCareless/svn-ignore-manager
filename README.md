# SVN Ignore Manager

**SVN Ignore Manager** 是一个专门为 SVN 用户设计的 VS Code 插件，用于简化 SVN 忽略规则的管理。通过可视化界面和命令行操作，帮助你轻松管理需要忽略的文件和文件夹，无需手动编辑 SVN 配置文件。

## 主要特性

- 🚀 **可视化忽略文件管理**：右键点击文件或文件夹即可添加到忽略列表
- 📝 **自动创建和维护**：自动处理 `.svnignore` 文件的创建和更新
- 🔄 **批量操作支持**：可以同时处理多个文件和文件夹
- 🎯 **智能规则应用**：自动将忽略规则应用到 SVN 配置中
- 📊 **状态查看**：随时查看当前的忽略规则和被忽略的文件
- 🛠️ **配置灵活**：通过 VS Code 设置面板轻松调整插件行为

## 安装

1. **VS Code 市场安装**：

   - 打开 VS Code
   - 按下 `Ctrl+P` 或 `Cmd+P`
   - 输入 `ext install svn-ignore-manager`

2. **手动安装**：
   ```bash
   git clone https://github.com/your-username/svn-ignore-manager.git
   cd svn-ignore-manager
   npm install
   vsce package
   ```

## 使用方法

### 1. 通过右键菜单添加忽略

1. 在资源管理器中右键点击要忽略的文件或文件夹
2. 选择 "Ignore" 选项
3. 确认操作后，文件将被添加到忽略列表

### 2. 通过命令面板操作

1. 按下 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（macOS）
2. 输入 "Run SVN Script"
3. 选择相应的命令执行 SVN 忽略操作

## 设置选项

打开 VS Code 设置（`Ctrl+,`），搜索 "svnIgnoreManager"：

- `svnIgnoreManager.runChecks`: 启动时检查配置文件
- `svnIgnoreManager.clearGlobalIgnores`: 清理全局忽略规则
- `svnIgnoreManager.importIgnoreRules`: 自动导入规则
- `svnIgnoreManager.displayIgnoreRules`: 显示当前规则

## 常见问题

**Q: 为什么有些文件没有被正确忽略？**
A: 确保文件路径正确，并且已经执行了 "Run SVN Script" 命令应用更改。

**Q: 如何移除已添加的忽略规则？**
A: 直接编辑 `.svnignore` 文件，删除对应的规则，然后运行 "Run SVN Script" 更新。

## 贡献指南

欢迎提交 Pull Requests 和 Issues！请确保：

1. 遵循现有的代码风格
2. 添加适当的测试
3. 更新相关文档

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 支持与反馈

- 提交 Issue: [GitHub Issues](https://github.com/your-username/svn-ignore-manager/issues)
- 邮件联系: your-email@example.com

---

💡 提示：首次使用请确保您的系统已正确安装 SVN 命令行工具。
