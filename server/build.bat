@echo off
pyinstaller main.spec -y --distpath ../dist
rmdir /S /Q build