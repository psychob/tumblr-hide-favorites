// ==UserScript==
// @description Script hides post you already favorited from your dashboard
// @grant none
// @include http://www.tumblr.com/dashboard*
// @include http://www.tumblr.com/tagged/*
// @name Tumblr Hide Favorites
// @namespace http://psychobpl.wordpress.com/
// @run-at document-end
// @version 2.0
// ==/UserScript==

//
// Changelog
// * 2.0
//  * Update script for new tumblr layout
//

var _hidden = 0;

jQuery(function(){
 // na samym początku zdefinujmy sobie pomocniczną funkcje która będzie odpowiadała
 // za ukrywanie postów
 function _innerHider( element )
 {
  if (jQuery(element).find(".like.liked").length !== 0 )
  {
   jQuery(element).css('display', 'none');
   //console.log( "Hidden: " + jQuery(element).attr('id') );

   _hidden++;

   jQuery(".-tumblr-hide-fave-counter").html(_hidden.toString());
  }
 }

 jQuery("body").append(jQuery("<div>").addClass("-tumblr-hide-fave-counter").css({
  position: 'fixed',
  bottom: '15px',
  left: '1px',
  width: '25px',
  height: '25px',
  backgroundColor: 'black',
  color: 'white',
  textAlign: 'center',
 }).html(_hidden.toString()));

 jQuery(".post").each(function(k,v){
  if ( k !== 0 )
   _innerHider(v);
 });

 // dodajemy obserwatora
 var moobserver = { };
 moobserver.childList = true;

 var mo = new MutationObserver( function ( arr, w ) {
  for ( var it in arr )
   for ( var jt = 0; jt < arr[it].addedNodes.length; ++jt )
    if ( arr[it].addedNodes[jt].nodeType === Node.ELEMENT_NODE )
    {
     _innerHider(arr[it].addedNodes[jt]);
    }
 });

 mo.observe ( window.document.getElementById("posts"), moobserver );
});
