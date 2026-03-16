@echo off
setlocal

REM 使用方法：双击运行，或在命令行执行 build_exe.bat
REM 产物：dist\demo-app.exe

python -m pip install --upgrade pip
python -m pip install pyinstaller

pyinstaller --noconfirm --onefile --windowed --name demo-app main.py

echo.
echo 打包完成，输出文件：dist\demo-app.exe
endlocal
