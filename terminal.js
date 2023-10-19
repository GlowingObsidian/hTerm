var promptEnabled = false;
var terminalName = "";
var promptSymbol = "$";

const getTerminal = () => {
  return document.getElementById("terminal");
};

const setTerminalName = (name) => (terminalName = name);

const getLines = () => {
  lines = getTerminal()
    .innerHTML.replaceAll("<span>", "")
    .replaceAll("<br>", "")
    .split("</span>");
  lines.pop();
  return lines;
};

const makeLine = (line) => {
  return line ? `<span>${line}</span><br>` : null;
};

const updateState = (newState = null) => {
  getTerminal().innerHTML = removePrompt() + (newState ? newState : "");
  if (promptEnabled) {
    prompt();
  }
};

const log = (line) => {
  updateState(makeLine(line));
};

const clear = () => {
  getTerminal().innerHTML = "";
  updateState();
};

const setPrompt = (value) => {
  promptEnabled = value;
  if (promptEnabled) {
    getTerminal().addEventListener("click", () => {
      document.getElementById("command").focus();
    });
  }
  updateState();
};

const setPromptSymbol = (symbol) => {
  promptSymbol = symbol;
  clear();
  updateState();
};

const removePrompt = () => {
  return getTerminal().innerHTML.replace(
    `<br><span>${promptSymbol} <input type="text" name="" id="command" autocomplete="off"></span><br>`,
    ""
  );
};

const commandList = {
  idx: -1,
  cmds: [],
  lastCmdInProgress: "",
};

const iscommandListEmpty = () => (commandList["idx"] === -1 ? true : false);

const prompt = () => {
  getTerminal().innerHTML += `<br><span>${promptSymbol} <input type="text" name="" id="command" autocomplete="off" /></span><br>`;
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
        log(`<br>${promptSymbol} ${command}`);
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
};

const parseCommand = (command) => {
  command = command.split(" ");
  try {
    commands[command[0]](command.slice(1));
  } catch (err) {
    console.log(err);
    if (err.name === "TypeError") {
      log(
        `${terminalName === "" ? "hTerm" : terminalName}: '${
          command[0]
        }' not recognized as a valid command.`
      );
    } else {
      log(`JS Exception { ${err} }`);
    }
  }
};
