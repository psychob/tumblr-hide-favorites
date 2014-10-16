// ==UserScript==
// @id tumblr-hide-fav@psychobpl.wordpress.com
// @name Tumblr Hide Fav
// @namespace http://psychobpl.wordpress.com/
// @author Andrzej "PsychoB" Budzanowski <psychob.pl@gmail.com> http://psychobpl.wordpress.com/
// @version 1.1
// @description Hide favorite post from dashboard
// @website http://psychobpl.wordpress.com/
// @include http://www.tumblr.com/dashboard*
// @include http://www.tumblr.com/tagged/*
// @run-at document-start
// ==/UserScript==

window.addEventListener("DOMContentLoaded", function ( ) { 
 // podłączamy się pod obserwatora
 var mo = new MutationObserver ( function (arr,w) {
  // iterujemy po każdym elemencie znajdującym się w arr
  for (var it in arr)
   for (var jt = 0; jt < arr[it].addedNodes.length; ++jt)
    if (arr[it].addedNodes[jt].nodeType == Node.ELEMENT_NODE)
     {
      // sprawdzamy czy dany obiekt jest już polubiony
      var id = arr[it].addedNodes[jt].id.match(/([0-9]+)$/);
      if (id != null)
      {
       var elpol = document.getElementById("like_button_" + id[0]);
       
       // sprawdzamy czy jest ok
       if (elpol.className.match(/already_like/)) // usuwamy
       {
        console.log ( "Element: " + id[0].toString() + " hided");
        arr[it].addedNodes[jt].style.display = "none";
       }
      }
     }
     
  //console.log ( arr );
  //console.log ( w );
 });
 
 var moo = { };
 moo.childList = true;
 
 mo.observe ( window.document.getElementById("posts"), moo );
 
 // usuwamy elementy pierwsze:
 var dc = document.getElementById("posts").children;
 for (var jt = 0; jt < dc.length; ++jt)
  if (dc[jt].nodeType == Node.ELEMENT_NODE)
   {
    // sprawdzamy czy dany obiekt jest już polubiony
    var id = dc[jt].id.match(/([0-9]+)$/);
    if (id != null)
    {
     var elpol = document.getElementById("like_button_" + id[0]);
     
     // sprawdzamy czy jest ok
     if (elpol.className.match(/already_like/)) // usuwamy
     {
      console.log ( "Element: " + id[0].toString() + " hided");
      dc[jt].style.display = "none";
     }
    }
 }
});
