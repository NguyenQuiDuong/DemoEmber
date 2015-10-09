/**
 * Created by Ace on 06-Oct-15.
 */
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

// app/routes/application.js
export default Ember.Route.extend(ApplicationRouteMixin,{
  //beforeModel() {
  //  if (this.session.isAuthenticated) {
  //    return this._populateCurrentUser();
  //  }
  //},
  model: function() {

    return {
      title: "Rails is omakase"
    };
  },
  actions: {
    sessionInvalidationSucceeded:function() {
      console.log('là dây');
    },
    invalidateSession1: function() {
      console.log(this.get('session'));
      this.transitionTo('index');
      this.get('session').invalidate();
    }
  },

  _populateCurrentUser() {
    console.log( this.get('session.secure'));
  //  return this.store.find(user_type, user_id)
  //    .then(user => this.get('currentUser').set('content', user) && user);
  }
});
