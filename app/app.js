import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
});

loadInitializers(App, config.modulePrefix);


//App.LoginController = Ember.Controller.extend{(
//  login: function(){
//  var data = {
//    username: this.get('username'),
//    password: this.get('password')
//  };
//  Ember.$.post(''
//)};
export default App;
