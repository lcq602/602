# 打包成 EXE（Windows）

这个仓库提供了一个最小可运行示例，并附带一键打包脚本。

## 文件说明

- `main.py`：示例 GUI 程序入口。
- `build_exe.bat`：Windows 下打包脚本（基于 PyInstaller）。

## 打包步骤

1. 在 **Windows** 安装 Python 3.10+。
2. 打开项目目录，运行：

   ```bat
   build_exe.bat
   ```

3. 打包完成后，产物在：

   ```text
   dist\demo-app.exe
   ```

## 说明

当前环境是 Linux，无法直接产出可在 Windows 上运行的 `.exe`。已提供可在 Windows 环境直接执行的打包脚本。
