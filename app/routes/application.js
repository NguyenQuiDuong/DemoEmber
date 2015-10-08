/**
 * Created by Ace on 06-Oct-15.
 */
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

// app/routes/application.js
export default Ember.Route.extend(ApplicationRouteMixin,{
  beforeModel() {
    if (this.session.isAuthenticated) {
      return this._populateCurrentUser();
    }
  },

  actions: {
    sessionAuthenticationSucceeded() {
      this._populateCurrentUser().then(user => this.transitionTo('dashboard'));
      console.log(this.get('session'));
    },
    invalidateSession: function() {
      console.log(this.get('session'));
      this.get('session').invalidate();
    }
  },

  _populateCurrentUser() {
    const { user_id, user_type } = this.get('session.secure');
    return this.store.find(user_type, user_id)
      .then(user => this.get('currentUser').set('content', user) && user);
  }
});
