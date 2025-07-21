# Custom File Order (VS Code Extension)

A Visual Studio Code extension that allows you to manually reorder files in a custom tree view, using drag-and-drop. The order is saved to `.vscode/fileOrder.json`.

## ✨ Features

- **Custom File Ordering**: Manually arrange files in your preferred order, not alphabetically
- **Drag & Drop Interface**: Intuitive drag-and-drop reordering in a dedicated tree view
- **Persistent Storage**: File order is saved to `.vscode/fileOrder.json` and persists across sessions
- **Quick Activation**: Activate with `Ctrl+Alt+O` (or `Cmd+Alt+O` on Mac)
- **Save/Discard Prompts**: Choose whether to save or discard changes after reordering
- **Workspace Integration**: Seamlessly integrates with VS Code's Explorer panel

## 🚀 How to Use

1. **Activate the Extension**: Press `Ctrl+Alt+O` (or `Cmd+Alt+O` on Mac) in VS Code
2. **View Custom Order Panel**: The "Custom File Order" panel will appear in the Explorer sidebar
3. **Reorder Files**: Drag and drop files in the tree view to your desired order
4. **Save Changes**: After dropping, a prompt will appear asking if you want to save or discard the new order
5. **Access Files**: Click on any file in the custom order view to open it

## 🎯 Key Features

### Drag and Drop Support
- Select one or multiple files and drag them to new positions
- Visual feedback during drag operations
- Smooth reordering experience

### Smart File Detection
- Automatically discovers all files in your workspace
- Excludes hidden files and `node_modules` by default
- Only includes actual files, not folders (as per current limitations)

### Configuration Management
- Creates `.vscode/fileOrder.json` automatically
- Stores file paths and modification timestamps
- Gracefully handles missing or moved files

## 📁 Configuration File

The extension creates a `.vscode/fileOrder.json` file in your workspace root:

```json
{
  "files": [
    "/path/to/your/first/file.js",
    "/path/to/your/second/file.ts",
    "/path/to/your/third/file.html"
  ],
  "lastModified": 1234567890123
}
```

This file:
- Contains the ordered list of file paths
- Includes a timestamp of the last modification
- Is automatically created when you first save a custom order
- Can be committed to version control to share file ordering with your team

## 📦 Build and Installation

### Development Setup

1. **Clone and Install Dependencies**:
   ```bash
   git clone <your-repo-url>
   cd custom-file-order
   npm install
   ```

2. **Compile TypeScript**:
   ```bash
   npm run compile
   ```

3. **Run in Extension Development Host**:
   - Press `F5` in VS Code to launch a new Extension Development Host window
   - Or use the "Run Extension" debug configuration

4. **Development Workflow**:
   ```bash
   npm run watch  # For continuous compilation during development
   ```

### Building for Distribution

```bash
npm run vscode:prepublish
```

### Installing the Extension

1. Package the extension:
   ```bash
   vsce package
   ```

2. Install the `.vsix` file in VS Code:
   - Open VS Code
   - Go to Extensions view (`Ctrl+Shift+X`)
   - Click "..." menu and select "Install from VSIX..."
   - Choose your generated `.vsix` file

## 🛠️ Known Limitations

- **Files Only**: Currently supports only files, not folders or directory structures
- **Single Workspace**: Works with one workspace root at a time
- **No Nested Organization**: Files are displayed in a flat list structure
- **Manual Refresh**: May require manual refresh if files are added/removed outside of the extension

## 🔮 Future Enhancements

- Support for folder reordering
- Multi-workspace support
- File filtering and search capabilities
- Import/export of file order configurations
- Custom grouping and categorization
- Integration with VS Code's built-in file explorer

## 🐛 Troubleshooting

### Extension Not Activating
- Ensure you have a workspace open (not just loose files)
- Check that VS Code version is 1.74.0 or higher
- Try reloading VS Code window (`Ctrl+Shift+P` → "Developer: Reload Window")

### Files Not Appearing
- Use the refresh button in the Custom File Order panel
- Check if files exist and are accessible
- Verify workspace permissions

### Drag and Drop Not Working
- Ensure you're dragging within the Custom File Order panel
- Try selecting files first, then dragging
- Check VS Code's drag and drop settings

## 📝 Commands

The extension provides the following commands:

- `customFileOrder.activate` - Activate Custom File Order (`Ctrl+Alt+O`)
- `customFileOrder.refresh` - Refresh the file list
- `customFileOrder.save` - Save current order
- `customFileOrder.discard` - Discard unsaved changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📌 License

MIT License - see LICENSE file for details

---

**Enjoy organizing your files your way! 🎉**