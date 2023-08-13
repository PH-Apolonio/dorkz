document.addEventListener("DOMContentLoaded", function() {
  const searchButton = document.getElementById("searchBtn");
  searchButton.addEventListener("click", redirectToSearch);

  const targetUrlInput = document.getElementById("targetUrl");
  const dorkTypeSelect = document.getElementById("dorkType");
  
  targetUrlInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      redirectToSearch();
    }
  });
  
  dorkTypeSelect.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      redirectToSearch();
    }
  });
});
  


function redirectToSearch() {
  const targetUrl = document.getElementById("targetUrl").value;
  const dorkType = document.getElementById("dorkType").value;

  let searchUrl = "";

  if (dorkType === "securityheaders") {
    searchUrl = "https://securityheaders.com/?q=" + encodeURIComponent(targetUrl);
  } else if (dorkType === "waybackurls") {
    searchUrl = `https://web.archive.org/cdx/search/cdx?url=*.${targetUrl}/*&output=text&fl=original&collapse=urlkey`;
  } else if (dorkType === "githubdork") {
    searchUrl = `https://github.com/search?q="%2A.${targetUrl}"`;
  } else if (dorkType === "subdomains") {
    searchUrl = `https://crt.sh/?q=${encodeURIComponent(targetUrl)}`;
  } else if (dorkType === "phpwayback") {
    searchUrl = `https://web.archive.org/cdx/search?url=${encodeURIComponent(targetUrl)}%2F&matchType=domain&collapse=urlkey&output=text&fl=original&filter=urlkey:.*php&limit=100000`;
  } else if (dorkType === "openbugbounty") {
    searchUrl = `https://www.openbugbounty.org/search/?search=${encodeURIComponent(targetUrl)}`;
  } else if (dorkType === "findsubdomains") {
    searchUrl = `https://www.google.com/search?q=site:%2A.${encodeURIComponent(targetUrl)} -site:www`;
  } else {
    const searchQuery = constructSearchQuery(targetUrl, dorkType);
    searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(searchQuery);
  } else if (dorkType === "web") {
    searchUrl = `https://w3techs.com/sites/info/${encodeURIComponent(targetUrl)}`;
  
  }
  

  window.open(searchUrl, "_blank");
  
}

function constructSearchQuery(targetUrl, dorkType) {
  const dorkQueries = {
    directory: "site:" + targetUrl + " intitle:index.of",
    config: "site:" + targetUrl + " ext:xml OR ext:conf OR ext:cnf OR ext:reg OR ext:inf OR ext:rdp OR ext:cfg OR ext:txt OR ext:ora OR ext:ini",
    database: "site:" + targetUrl + " ext:sql",
    wordpress: "site:" + targetUrl + " inurl:wp- OR inurl:wp-content OR inurl:plugins OR inurl:upload OR inurl:themes OR inurl:download",
    log: "site:" + targetUrl + " ext:log",
    backup: "site:" + targetUrl + " ext:bkf OR ext:bak OR ext:backup OR ext:old OR ext:backup OR ext:backup~ OR ext:bck",
    login: "site:" + targetUrl + " inurl:login",
    sqlerror: "site:" + targetUrl + " intext:'sql syntax near'",
    exposeddocs: "site:" + targetUrl + " ext:pdf OR ext:doc OR ext:docx OR ext:xls OR ext:xlsx OR ext:txt",
    phpinfo: "site:" + targetUrl + " ext:php intitle:phpinfo",
    openredirect: "site:" + targetUrl + " inurl:redir OR inurl:url OR inurl:redirect OR inurl:src=http OR inurl:r=http OR inurl:ret OR inurl:r2 OR inurl:page ",
    thirdparty: `site:http://ideone.com | site:http://codebeautify.org | site:http://codeshare.io | site:http://codepen.io | site:http://repl.it | site:http://justpaste.it | site:http://pastebin.com | site:http://jsfiddle.net | site:http://trello.com | site:*.atlassian.net | site:bitbucket.org "${targetUrl}"`,
    subdomains: `site:crt.sh "${targetUrl}"`,
    waybackurls: "site:web.archive.org " + targetUrl,
    phpwayback: `https://web.archive.org/cdx/search?url=${encodeURIComponent(targetUrl)}%2F&matchType=domain&collapse=urlkey&output=text&fl=original&filter=urlkey:.*php&limit=100000`,
    openbugbounty: `https://www.openbugbounty.org/search/?search=${encodeURIComponent(targetUrl)}`,
    findsubdomains: `https://www.google.com/search?q=site:%2A.${encodeURIComponent(targetUrl)}`,
    securityheaders: "site:" + targetUrl,
    xss: "site:" + targetUrl + " inurl:q OR inurl:s OR inurl:search OR inurl:id OR inurl:lang OR inurl:keyword OR inurl:query OR inurl:page OR inurl:view Or inurl:type OR inurl:url ",
    bxss: "site:" + targetUrl + " intitle:contact.php OR intitle:contact us OR intitle:contactus.php OR intitle:contactus.aspx OR intitle:contactus.asp OR intitle:contactus.html OR intitle:contact-us.html OR intitle:contact_us.html OR intitle:contact.html OR intitle:contactus.html OR inurl:feedback OR inurl:Send Us a Message OR intitle:Send Us a Message OR intitle:support OR intext:Please choose a request type below OR inurl:submit ",
    sqli: "site:" + targetUrl + " inurl:php?id= OR inurl:php ",
    web: `w3techs.com "${targetUrl}"`;
    
    // Add more dork types here
  };

  return dorkQueries[dorkType];
}


  
