# hTerm

### Custom component for a fully functional terminal in HTML.

#### How to use:

1. Add `<link rel="stylesheet" href="terminal_style.css">` in `<head>`.
2. Add `<script src="terminal.js"></script>` at the bottom of `<body>`.

**To make sure the terminal works as intended any scripts must by added after the script for the terminal is imported.**

#### Available functions:

1. `getTerminal()` : Returns a terminal element object.
2. `log(text)` : Prints `text` to the terminal.
3. `setTerminalName(name)`: Sets the terminal name to `name` that get displayed when an error occurs.
4. `clear()`: Clears the terminal.
5. `setPrompt(value)`: Enables/disables the prompt based on `value` (`true` or `false`).
6. `setPromptSymbol(symbol)`: Sets the symbol for the prompt to `symbol`.
7. `addCommand(commandName, callback)`: Adds a new executable command for the terminal.

#### Add a new command.

- Callback function:

  - ```
    function print(args){
      args = args.join(' ');
      log(args);
    }
    ```

- New command:
  `addCommand('print', print)`

### Updates in v3.1:

- Fix `setPromptSymbol()` to change the symbol on the go without cleaning the entire window.
- Add terminal object with the following keys:
  - `object` : Store the DOM terminal object.
  - `availableCommands` : Array of currently executable commands.
  - `issuedCommands` : Number of valid commands executed so far.
  - `promptEnabled` : Stores whether prompt is enabled.
  - `name` : Stores the name of Terminal.
  - `symbol` : Stores the prompt symbol.
  - `version` : Current hTerm version.
  - `author` : Stores the author name.
  - `copyright` : Stores the year.
- bug fixes.

### Updates in v3.0:

- API completely updated.
- Terminal object can be easily accessed to apply all the DOM attributes.
- New commands can be added without the need for declaring a `parseCommand()` function.
- Custom commands can have command arguments as well.
- Terminal will be autofocus on a new prompt line as well as when the terminal window is clicked.
- Enable or disable the prompt with ease.
- Multi character prompt symbol allowed.
- Previously executed command surfing possible with Up and Down arrow keys.
- Currenly typed input in the prompt get saved when previous commands are surfed.
