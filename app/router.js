import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('user', function () {
    this.route('signin');
    this.route('signup');
    this.route('dashboard');
    this.route('myprofile');
    this.route('settings');
    this.route('billing');
    this.route('freecredits');
    this.route('testsession');
  });
  this.route('experts', function () {
    this.route('webprogram');
  });
  this.route('chatroom');
  this.route('experts\\webprogram\\ruby');

  this.route('user\\beydogan');
});

export default Router;
