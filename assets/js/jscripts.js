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
