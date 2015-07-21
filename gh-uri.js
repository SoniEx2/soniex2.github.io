var uri = location.href.split("#").slice(1).join("#");
if (uri !== "") {
  window.open(uri, "_self");
}
