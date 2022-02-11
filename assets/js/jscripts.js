/* When the user scrolls down, hide the navbar. 
When the user scrolls up, show the navbar */

var prevScrollpos = window.pageYOffset;

window.onscroll = function() 
{
    var x = document.getElementById("navbar");
    x.className = "navbar";

    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) 
    {
        document.getElementById("navbar").style.top = "0";
    } 
    else 
    {
        document.getElementById("navbar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}

/* Toggle between adding and removing the "responsive" 
class to topnav when the user clicks on the icon */

function naviFunction() 
{
    var x = document.getElementById("navbar");

    if (x.className === "navbar") 
    {
      x.className += " responsive";
    } 
    else
    {
      x.className = "navbar";
    }
}

function createCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}
