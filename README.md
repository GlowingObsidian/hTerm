# hTerm
**Snippet for a terminal in html usable instantly in your current code.**

Using this terminal is as easy as it could possibly be.

Useable functions: 

`init()` : Initializes the termnial

`log(data)` : Prints the data to terminal in a new line

`clear()` : clears the termninal

To add a new termninal move the `terminal.js` and `terminal_style.css` files to the work folder then follow the steps.

Step 1:  Add a console div in your `index.html` file. Example: `<div class="console" id="console"></div>`

Step 2:  Add the stylesheet at the html head as `<link rel="stylesheet" href="terminal_style.css">`

Step 3:  Add the script link below body before your `main.js` as `<script src="terminal.js"></script>`

Step 4:  In your main.js file add `var term = new terminal("console")` , you are free to name it anything you want.

Step 5:  In the main.js also add `term.init()`

As of now , it will work perfectly as an output-only termninal 

To use it as an input-output termninal a predefined `parseCommand()` function has to be added to the `main.js`

The follow example shows a simple parsing function, it can be modified however required.

```
function parseCommand() {
  command = document.getElementById("command").value;
  con.log("$ " + command);
  command = command.split(" ");
  if (command[0] === "hello") {
    term.log("Hello, World");
  } 
  else if (command[0] === "echo") {
    term.log(command[1])
  }
  else if(command[0] === "clear") {
    term.clear()
  }
  else
  {
    term.log("'"+command[0]+"' is not a valid command.<br>")
  }
}
```

**NOTE THAT THE FUNCTION NAME HAS TO BE parseCommand()**

![image](https://user-images.githubusercontent.com/36966603/194103481-5e517394-cb29-4a0a-ade9-8ee05a6a333d.png)
