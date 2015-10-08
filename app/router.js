import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('experts\\webprogram\\ruby');


  this.route('user\\beydogan');
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
  this.route('user\\dashboard');
  this.route('user\\index');
  this.route('user', function() {
    this.route('signin');
    this.route('signout');
    this.route('view',{path: '/view/:id'});
    this.route('dashboard');
  });

  this.route('experts', function() {
    this.route('webprogram');
  });
  this.route('user\\signin');
  this.route('admin', function() {
    this.route('experts', function() {
      this.route('subjects', function() {
        this.route('categories');
      });
    });
  });
});

export default Router;
