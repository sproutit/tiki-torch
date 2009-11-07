// ==========================================================================
// Project:   Torch
// Copyright: ©2009 Apple Inc.
// ==========================================================================
/*globals Torch */

"import system core";
"export package main";

var didRun = false;

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Torch.main = function() {

  // bug: then is running twice for some reason.
  if (didRun) return;
  didRun = true;
  
  
  // load that plugin!
  require.loader.async('hello_world').then(function() {
    
    var plugin = require('hello_world:plugin');
    plugin.setup();

    SC.RunLoop.begin();
    
    // exercise the API with some delay so we can watch it happen
    (function() {
      console.log('FOO');
      plugin.ping('Jingleheimer');
      
      (function() {
        console.log('BAR');
        plugin.teardown();
      }).invokeLater(500);
      
    }).invokeLater(500);

    SC.RunLoop.end();
    
    
  });
  
} ;

main = function() { Torch.main(); }
