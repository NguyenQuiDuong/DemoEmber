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
  this.route('experts\\webprogram\\ruby');


  this.route('user\\beydogan');
  this.route('expert');
  this.route('user\\dashboard-detail');
  this.route('user\\dashboard-detail\\monthly');
  this.route('user\\dashboard-detail\\confirmed-offline-helps');
  this.route('user\\dashboard-detail\\active-requests');
  this.route('user\\settings-detail\\edit');
  this.route('user\\settings-detail\\blocked-users');
  this.route('user\\settings-detail\\organization');
  this.route('user\\settings-detail\\buy-credit');
  this.route('user\\settings-detail\\referral');
  this.route('user\\settings-detail\\payment-setting');
  this.route('user\\settings-detail\\payments');
});

export default Router;
