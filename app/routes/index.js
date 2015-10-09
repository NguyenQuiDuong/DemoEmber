import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin,{
  //beforeModel() {
  //  if (this.session.isAuthenticated) {
  //    return this._populateCurrentUser();
  //  }
  //},

  actions: {
    sessionAuthenticationSucceeded() {
      //this._populateCurrentUser().then(user => this.transitionTo('dashboard'));
    },
  },

  //_populateCurrentUser() {
  //  console.log(this.get('session.secure'));
  //  const { user_id, user_type } = this.get('session.secure');
  //  return this.store.find(user_type, user_id)
  //    .then(user => this.get('currentUser').set('content', user) && user);
  //}
  //actions: {
  //  invalidateSession() {
  //    this.get('session').invalidate();
  //  }
  //}
});
