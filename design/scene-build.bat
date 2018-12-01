FOR %%F IN (%~dp0scene\*.yml) DO (
  js-yaml %%F > %~dp0..\scene\%%~nF.json
)