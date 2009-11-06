// This is an example plugin.  It does not use any kind of build directives
// though this does require a Buildfile to tell Abbot which packages this 
// plugin depends on.

// system has a standard logger in it.
var system = require('system:package');
var console = system.console;
var SC = require('sproutcore/runtime:package').SC;

var Contact = SC.Object.extend({
  
  firstName: null,
  
  lastName: null,
  
  fullName: function() {
    return this.getEach('firstName', 'lastName').join(' ');
  }.property('firstName', 'lastName').cacheable(),
  
  fullNameDidChange: function() {
    system.console.log('did change to: %@'.fmt(this.get('fullName')));
  }.observes('fullName')

});


var contact ;

// our plugin API calls setup() when the plugin is loaded
exports.setup = function() {
  console.log("setup!");
  contact = Contact.create({ firstName: "John", lastName: "Doe" });
};

exports.ping = function(firstName) {
  contact.set('firstName', firstName);
};

exports.teardown = function() {
  console.log("teardown!");
  contact.destroy();
  contact = null;
};
