function dostuff() {
  var theBody = document.getElementsByTagName("body")[0];
  var uri = location.href.split("#").slice(1).join("#");

  if (uri !== "") {
    var prefix = document.createTextNode("Attempting to open ");
    var uria = document.createElement("a");
    uria.href = uri;
    uria.appendChild(document.createTextNode(uri));
    var suffix = document.createTextNode("Feel free to hit your browser's \"back\" button once you're done.");

    theBody.appendChild(prefix);
    theBody.appendChild(uria);
    theBody.appendChild(document.createElement("br"));
    theBody.appendChild(suffix);

    window.open(uri, "_self");
  } else {
    theBody.appendChild(document.createTextNode("Welcome to gh-uri.html! To use this, simply put \"https://soniex2.github.io/gh-uri.html#\" before the URI you want to link to. E.g. "));
    var donatea = document.createElement("a");
    donatea.href = "https://soniex2.github.io/gh-uri.html#bitcoin:16gPboftr3y1gabPkSb7PKNyzerhyfwZ3x?label=ghuri&message=GH-URI%20donation"
    donatea.appendChild(document.createTextNode("https://soniex2.github.io/gh-uri.html#bitcoin:16gPboftr3y1gabPkSb7PKNyzerhyfwZ3x?label=ghuri&message=GH-URI%20donation"));
    theBody.appendChild(donatea);
    theBody.appendChild(document.createElement("br"));
    theBody.appendChild(document.createTextNode("DISCLAIMER: I AM NOT TO BE HELD RESPONSIBLE IF YOU GET CAUGHT USING THIS TOOL. USE AT YOUR OWN RISK."));
  }
}
