function dostuff() {
  var uri = location.href.split("#").slice(1).join("#");
  if (uri !== "") {
    var prefix = document.createTextNode("Attempting to open ");
    var uria = document.createElement("a");
    uria.href = uri;
    uria.appendChild(document.createTextNode(uri));
    var suffix = document.createTextNode("Feel free to hit your browser's \"back\" button once you're done.");

    var theBody = document.getElementsByTagName("body")[0];

    theBody.appendChild(prefix);
    theBody.appendChild(uria);
    theBody.appendChild(document.createElement("br"));
    theBody.appendChild(suffix);

    window.open(uri, "_self");
  }
}
