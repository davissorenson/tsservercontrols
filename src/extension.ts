// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { StatusBarAlignment } from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export const activate = () => {
  const restartTSServerButton = vscode.window.createStatusBarItem(
    StatusBarAlignment.Left,
    1_000_000
  );

  restartTSServerButton.command = "typescript.restartTsServer";
  restartTSServerButton.text = "$(refresh) Restart TS Server";
  restartTSServerButton.show();
};
