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


//App.LoginController = Ember.Controller.extend
//{
//  (
//    login
//:
//  function () {
//    var self =this,data= this.getProperties('username', 'password');
//    Ember.$.post('', data).them(function (response) {
//      if (response.success) {
//        self.set('token', response.token);
//      }
//    });
//  }
//
//)
//}
;
export default App;
