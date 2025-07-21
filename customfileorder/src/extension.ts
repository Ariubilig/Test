import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

interface FileOrderConfig {
  files: string[];
  lastModified: number;
}

class FileOrderItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly filePath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
    this.tooltip = filePath;
    this.resourceUri = vscode.Uri.file(filePath);
    this.iconPath = vscode.ThemeIcon.File;
    
    this.command = {
      command: 'vscode.open',
      title: 'Open File',
      arguments: [vscode.Uri.file(filePath)]
    };
  }
}

class CustomFileOrderProvider implements vscode.TreeDataProvider<FileOrderItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<FileOrderItem | undefined | null | void> = new vscode.EventEmitter<FileOrderItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<FileOrderItem | undefined | null | void> = this._onDidChangeTreeData.event;

  private files: string[] = [];
  private configPath: string = '';

  constructor() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      const workspaceRoot = workspaceFolders[0].uri.fsPath;
      this.configPath = path.join(workspaceRoot, '.vscode', 'fileOrder.json');
      this.loadConfiguration();
    }
  }

  private loadConfiguration(): void {
    try {
      if (fs.existsSync(this.configPath)) {
        const configData = fs.readFileSync(this.configPath, 'utf8');
        const config: FileOrderConfig = JSON.parse(configData);
        this.files = config.files.filter(file => fs.existsSync(file));
      } else {
        this.initializeWithWorkspaceFiles();
      }
    } catch (error) {
      console.error('Error loading configuration:', error);
      this.initializeWithWorkspaceFiles();
    }
  }

  private initializeWithWorkspaceFiles(): void {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      this.files = this.getAllFiles(workspaceFolders[0].uri.fsPath);
    }
  }

  private getAllFiles(dir: string, fileList: string[] = []): string[] {
    try {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        try {
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            this.getAllFiles(filePath, fileList);
          } else if (stat.isFile() && !file.startsWith('.')) {
            fileList.push(filePath);
          }
        } catch (err) {
          // Skip files we can't read
        }
      }
    } catch (error) {
      // Ignore errors for directories we can't read
    }
    
    return fileList;
  }

  private saveConfiguration(): void {
    try {
      const vscodePath = path.dirname(this.configPath);
      if (!fs.existsSync(vscodePath)) {
        fs.mkdirSync(vscodePath, { recursive: true });
      }

      const config: FileOrderConfig = {
        files: this.files,
        lastModified: Date.now()
      };

      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
      vscode.window.showInformationMessage('File order saved successfully!');
    } catch (error) {
      vscode.window.showErrorMessage(`Error saving file order: ${error}`);
    }
  }

  refresh(): void {
    this.loadConfiguration();
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: FileOrderItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: FileOrderItem): Thenable<FileOrderItem[]> {
    if (!element) {
      return Promise.resolve(
        this.files.map(filePath => new FileOrderItem(
          path.basename(filePath),
          filePath,
          vscode.TreeItemCollapsibleState.None
        ))
      );
    }
    return Promise.resolve([]);
  }

  saveOrder(): void {
    this.saveConfiguration();
  }

  moveUp(item: FileOrderItem): void {
    const index = this.files.indexOf(item.filePath);
    if (index > 0) {
      [this.files[index - 1], this.files[index]] = [this.files[index], this.files[index - 1]];
      this._onDidChangeTreeData.fire();
    }
  }

  moveDown(item: FileOrderItem): void {
    const index = this.files.indexOf(item.filePath);
    if (index < this.files.length - 1) {
      [this.files[index], this.files[index + 1]] = [this.files[index + 1], this.files[index]];
      this._onDidChangeTreeData.fire();
    }
  }
}

let fileOrderProvider: CustomFileOrderProvider | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log('Custom File Order extension is now active!');

  const activateCommand = vscode.commands.registerCommand('customFileOrder.activate', () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      vscode.window.showErrorMessage('Please open a workspace to use Custom File Order.');
      return;
    }

    try {
      vscode.commands.executeCommand('setContext', 'customFileOrder.active', true);
      
      if (!fileOrderProvider) {
        fileOrderProvider = new CustomFileOrderProvider();
        
        vscode.window.createTreeView('customFileOrder', {
          treeDataProvider: fileOrderProvider,
          canSelectMany: false
        });
      }

      fileOrderProvider.refresh();
      vscode.window.showInformationMessage('Custom File Order activated! Use the tree view to see files.');
      
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to activate Custom File Order: ${error}`);
      console.error('Extension error:', error);
    }
  });

  const refreshCommand = vscode.commands.registerCommand('customFileOrder.refresh', () => {
    if (fileOrderProvider) {
      fileOrderProvider.refresh();
    }
  });

  const saveCommand = vscode.commands.registerCommand('customFileOrder.save', () => {
    if (fileOrderProvider) {
      fileOrderProvider.saveOrder();
    } else {
      vscode.window.showInformationMessage('No file order to save. Activate the extension first.');
    }
  });

  context.subscriptions.push(activateCommand, refreshCommand, saveCommand);
  console.log('All commands registered successfully');
}

export function deactivate() {
  vscode.commands.executeCommand('setContext', 'customFileOrder.active', false);
}