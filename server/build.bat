@echo off
pyinstaller main.spec -y --distpath ../client
rmdir /S /Q build