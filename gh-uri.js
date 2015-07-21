var uri = location.href.split("#").slice(1).join("#");
if (uri !== "") {
  document.getElementsByTagName("body")[0].innerHTML = "Attempting to open " + uri + "<br />"
    + "Feel free to hit your browser's \"back\" button once you're done.";
  window.open(uri, "_self");
}
