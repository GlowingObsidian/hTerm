const terminal = {
  object: document.getElementById("terminal"),
  availableCommands: [],
  issuedCommands: 0,
  promptEnabled: false,
  name: "hTerm",
  symbol: "$",
  version: "3.1",
  author: "Shreyan Dey",
  copyright: "2023",
};

const setTerminalName = (name) => (terminal.name = name);

const getLines = () => {
  lines = terminal.object.innerHTML
    .replaceAll("<span>", "")
    .replaceAll("<br>", "")
    .split("</span>");
  lines.pop();
  return lines;
};

const makeLine = (line) => {
  return line ? `<span>${line}</span><br>` : null;
};

const updateState = (newState = "") => {
  terminal.object.innerHTML = removePrompt() + newState;
  if (terminal.promptEnabled) {
    prompt();
  }
};

const log = (line) => {
  updateState(makeLine(line));
};

const clear = () => {
  terminal.object.innerHTML = "";
  updateState();
};

const setPrompt = (value) => {
  terminal.promptEnabled = value;
  updateState();
  if (terminal.promptEnabled) {
    terminal.object.addEventListener("click", () => {
      document.getElementById("command").focus();
    });
  }
};

const setPromptSymbol = (symbol = "") => {
  if (terminal.promptEnabled && symbol != "") {
    terminal.object.innerHTML = removePrompt();
    terminal.symbol = symbol;
    prompt();
  }
};

const removePrompt = () => {
  promptMarkup = `<br><span>${terminal.symbol} <input type="text" id="command" autocomplete="off"></span><br>`;

  return terminal.object.innerHTML.replace(promptMarkup, "");
};

const commandList = {
  idx: -1,
  cmds: [],
  lastCmdInProgress: "",
};

const iscommandListEmpty = () => (commandList.idx === -1 ? true : false);

const prompt = () => {
  if (!terminal.promptEnabled) {
    return;
  }
  terminal.object.innerHTML += `<br><span>${terminal.symbol} <input type="text" id="command" autocomplete="off" /></span><br>`;
  const input = document.getElementById("command");

  input.focus();

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      command = event.target.value;
      if (command.length !== 0 && command !== " ") {
        event.preventDefault();
        commandList.cmds.push(command);
        commandList.idx = commandList.cmds.length;
        commandList.lastCmdInProgress = "";
        log(`<br>${terminal.symbol} ${command}`);
        parseCommand(command);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!iscommandListEmpty()) {
        if (commandList.idx != 0) {
          commandList.idx -= 1;
        }
        input.value = commandList.cmds[commandList.idx];
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!iscommandListEmpty()) {
        if (commandList.idx < commandList.cmds.length) {
          commandList.idx += 1;
          if (commandList.idx === commandList.cmds.length) {
            input.value = commandList.lastCmdInProgress;
          } else {
            input.value = commandList.cmds[commandList.idx];
          }
        }
      }
    }
  });

  input.addEventListener("keyup", (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
      commandList.lastCmdInProgress = event.target.value;
    }
  });
};

commands = {};

const addCommand = (command, resolution) => {
  commands[command] = resolution;
  terminal.availableCommands.push(command);
};

const parseCommand = (command) => {
  command = command.split(" ");
  try {
    commands[command[0]](command.slice(1));
    terminal.issuedCommands += 1;
  } catch (err) {
    console.log(err);
    if (err.name === "TypeError") {
      log(
        `${terminal.name === "" ? "hTerm" : terminal.name}: '${
          command[0]
        }' not recognized as a valid command.`
      );
    } else {
      log(`JS Exception { ${err} }`);
    }
  }
};
