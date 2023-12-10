function genBoard(n, fail) {
	var rem_attempts = 32-Math.clz32(n);
	var activate = document.createElement("button");
  activate.appendChild(document.createTextNode("Activate"));
  activate.addEventListener("click", function(e) {
  	e.preventDefault();
    if (rem_attempts > 0) {
    	rem_attempts--;
    } else {
      e.stopImmediatePropagation();
    }
  });
  var boom = document.createElement("button");
  boom.addEventListener("click", function(e) {
  	e.preventDefault();
  });
  boom.appendChild(document.createTextNode("Finish run"));
  var inputs = [];
  var outputs_and_guesses = [];
  for (i = 0; i < n; i++) {
  	(function() {
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      inputs[i] = checkbox;
      var output = document.createElement("input");
      output.type = "checkbox";
      output.disabled = true;
      var id_box = document.createElement("input");
      id_box.type = "number";
      id_box.dataset.expected = i;
      outputs_and_guesses[i] = {"output": output, "id_box": id_box};
      activate.addEventListener("click", function() {
        output.checked = checkbox.checked;
      });
      boom.addEventListener("click", function(e) {
        if (id_box.dataset.expected != id_box.value) {
        	fail();
          e.stopImmediatePropagation();
        }
      });
    })();
  }
  // from wikipedia https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  for (i = n - 1; i >= 1; i--) {
  	var j = Math.floor(Math.random()*(i+1));
    var tmp = outputs_and_guesses[i];
    outputs_and_guesses[i] = outputs_and_guesses[j];
    outputs_and_guesses[j] = tmp;
  }
  return {"activate": activate, "boom": boom, "inputs": inputs, "outputs_and_guesses": outputs_and_guesses, "attempts": 32-Math.clz32(n)};
}

addEventListener("DOMContentLoaded", function() {
// if you get bored, try 255!
var params = new URLSearchParams(document.location.search);
var amount = 15;
if (params.get("difficulty")) { amount = parseInt(params.get("difficulty"), 10); }
var board = genBoard(amount, function() {
	document.getElementById("output").appendChild(document.createTextNode("You lost!"));
});
board.boom.addEventListener("click", function() {
	document.getElementById("output").appendChild(document.createTextNode("You won!"));
});
document.body.appendChild(document.createTextNode("Can you solve the board in only " + board.attempts + " activations? Check the boxes on the left, click activate, and try to figure out which boxes on the left activate which boxes on the right! Click finish run to check your results and end the game! Activations remaining: "));
var remaining = board.attempts;
var remaining_element = document.createElement("span");
remaining_element.id = "remaining";
remaining_element.appendChild(document.createTextNode(remaining));
board.activate.addEventListener("click", function() {
	remaining--;
  remaining_element.firstChild.data = remaining;
});
document.body.appendChild(remaining_element);
var container = document.createElement("div");
container.appendChild(board.activate);
container.appendChild(board.boom);
document.body.appendChild(container);
var table = document.createElement("table");
for (i = 0; i < board.inputs.length; i++) {
	var row = document.createElement("tr");
  row.appendChild(document.createElement("td"));
  row.lastChild.appendChild(document.createTextNode(i));
  row.appendChild(document.createElement("td"));
  row.lastChild.appendChild(board.inputs[i]);
  row.appendChild(document.createElement("td"));
  row.lastChild.appendChild(board.outputs_and_guesses[i].output);
  row.appendChild(document.createElement("td"));
  row.lastChild.appendChild(board.outputs_and_guesses[i].id_box);
  table.appendChild(row);
}
document.body.appendChild(table);
var output = document.createElement("div");
output.id = "output";
document.body.appendChild(output);
document.body.appendChild(document.createElement("hr"));
document.body.appendChild(document.createTextNode("This software is made with love by a queer trans person."));
});
