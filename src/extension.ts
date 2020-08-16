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
  const newCheckAllTSFilesValue = !getCurrentCheckAllTSFilesValue(userConfig);

  userConfig.update(
    checkAllTSFilesConfigSection,
    newCheckAllTSFilesValue,
    vscode.ConfigurationTarget.Global
  );

  vscode.commands.executeCommand(
    showToggleCheckAllTSFilesButtonCommand,
    newCheckAllTSFilesValue
  );
};

const toggleCheckAllTSFilesButton = vscode.window.createStatusBarItem(
  StatusBarAlignment.Left,
  99
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
    100
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

  // as we are editing the global config, redraw the button in all windows every
  // 10 seconds. this way it will match the global state most of the time.
  setInterval(
    () =>
      vscode.commands.executeCommand(showToggleCheckAllTSFilesButtonCommand),
    10_000
  );
};
