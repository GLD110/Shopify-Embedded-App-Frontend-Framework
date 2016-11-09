function toHtmlEntities(text) {
  var rgx1 = new RegExp('<','g');
  var rgx2 = new RegExp('>','g');
  var rgx3 = new RegExp('\r?\n','g');
  var rgx4 = new RegExp('  ','g');

  text = text.replace(rgx1, "&lt;");
  text = text.replace(rgx2, "&gt;");
  text = text.replace(rgx3, '<br />');
  text = text.replace(rgx4, '&nbsp;&nbsp;');

  return text;
}

function toCodeSnippet(text) {
  return "<code>" + toHtmlEntities(text) + "</code>";
}

function createAllSnippets() {
  $(".to-code").each(
    function()
    {
      // Step 1: Create Snippet
      $(this).wrap('</p>');
      var codeSnippet = toCodeSnippet($(this).html());
      $(this).unwrap();

      $(this).html(codeSnippet);

      // Step 2: Remove Extra spaces
      var nSpaces = $(this).find("code").html().search(new RegExp("&lt;")) / 6;
      var strRpl = "";
      for (var i=1; i<nSpaces; i++)
      {
        strRpl = strRpl + "&nbsp;";
      }
      strRpl = strRpl;

      $(this).find("code").html($(this).find("code").html().replace(new RegExp(strRpl + "&lt;", 'g'), "&lt;"));
      $(this).find("code").html($(this).find("code").html().replace(new RegExp(strRpl, 'g'), ""));
      $(this).find("code>br:first").remove();
      $(this).find("code>br:last").remove();
    }
  );
}