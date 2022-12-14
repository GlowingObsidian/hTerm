function terminal(id) {
  this.log = function (data) {
    current = document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = current.replace(
      '<br>$&nbsp;<input type="text" id="command">',
      ""
    );

    document.getElementById(id).innerHTML += "<br>" + data;
    document.getElementById(id).innerHTML +=
      '<br>$&nbsp;<input type="text" id="command">';
    document.getElementById(id).scrollTop =
      document.getElementById(id).scrollHeight;

    var enter = document.getElementById("command");
    enter.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        parseCommand();
      }
    });
    document.getElementById("command").value = "";
  };

  this.init = function () {
    document.getElementById(id).innerHTML =
      '<p style="text-align: center;">-: hTerm Console v2.2 :-</p>';
    document.getElementById(id).innerHTML +=
      '<br>$&nbsp;<input type="text" id="command">';

    var enter = document.getElementById("command");
    enter.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        parseCommand();
      }
    });
    document.getElementById("command").value = "";
  };

  this.clear = function () {
    this.init();
  };
}
