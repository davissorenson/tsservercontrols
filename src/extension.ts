// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { StatusBarAlignment } from "vscode";

const checkAllTSFilesConfigSection =
  "typescript.tsserver.experimental.enableProjectDiagnostics";

const getCurrentCheckAllTSFilesValue = (
  userConfig: vscode.WorkspaceConfiguration
): boolean => {
  return !!userConfig.get(checkAllTSFilesConfigSection);
};

const toggleCheckAllTSFilesCommand = "tsservercontrols.toggleCheckAllTSFiles";

const toggleCheckAllTSFilesHandler = () => {
  const userConfig = vscode.workspace.getConfiguration();
  const currentCheckAllTSFilesValue = getCurrentCheckAllTSFilesValue(
    userConfig
  );

  userConfig.update(
    checkAllTSFilesConfigSection,
    !currentCheckAllTSFilesValue,
    vscode.ConfigurationTarget.Global
  );

  vscode.commands.executeCommand(
    showToggleCheckAllTSFilesButtonCommand,
    !currentCheckAllTSFilesValue
  );
};

const toggleCheckAllTSFilesButton = vscode.window.createStatusBarItem(
  StatusBarAlignment.Left,
  999_999
);

const showToggleCheckAllTSFilesButtonCommand =
  "tsservercontrols.showToggleCheckAllTSFilesButton";

const showToggleCheckAllTSFilesButtonHandler = (newValue?: boolean) => {
  const userConfig = vscode.workspace.getConfiguration();
  const currentCheckAllTSFilesValue =
    newValue ?? getCurrentCheckAllTSFilesValue(userConfig);

  toggleCheckAllTSFilesButton.command = toggleCheckAllTSFilesCommand;
  toggleCheckAllTSFilesButton.text = currentCheckAllTSFilesValue
    ? "$(debug-stop) Typechecking All"
    : "$(play) Typechecking Current File";
  toggleCheckAllTSFilesButton.show();
};

export const activate = (context: vscode.ExtensionContext) => {
  const restartTSServerButton = vscode.window.createStatusBarItem(
    StatusBarAlignment.Left,
    1_000_000
  );

  restartTSServerButton.command = "typescript.restartTsServer";
  restartTSServerButton.text = "$(refresh) Restart TS Server";
  restartTSServerButton.show();

  context.subscriptions.push(
    vscode.commands.registerCommand(
      toggleCheckAllTSFilesCommand,
      toggleCheckAllTSFilesHandler
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      showToggleCheckAllTSFilesButtonCommand,
      showToggleCheckAllTSFilesButtonHandler
    )
  );

  vscode.commands.executeCommand(showToggleCheckAllTSFilesButtonCommand);
};
