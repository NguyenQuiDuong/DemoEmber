import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
import Cookie from 'simple-auth-cookie-store/stores/cookie';

export default Ember.Controller.extend(LoginControllerMixin,{
  init: function(){
    this.set('user',Ember.Object.create());
  },

  rememberMeChanged: function() {
    this.get('session.store').cookieExpirationTime = this.get('rememberMe') ? (14 * 24 * 60 * 60) : null;
    console.log('rememberme');
  }.observes('rememberMe'),
  actions: {
    authenticate: function() {
      var data = this.getProperties('user.email','user.password');
      //if(this.get('remember_me')){
      //  //console.log(this.get('ember_simple_auth:session'));
      //}
      this.get('session').authenticate('authenticator:custom', data).catch((message) => {
        this.set('errorMessage', message);
      });
      this.store.find('user',1).then(function(users){
        //users.forEach(function(user){
          console.log(users.get('username'));
          //if(user.get('password') == password){
          //  signController.get('session').authenticate('simple-auth-authenticator:custom', data).then(function(){
          //        location.reload();
          //        return {'messages': 'Đăng nhập roài'};
          //      });
          //}else{
          //  alert('loi roi');
          //    return {'messages':"Lại đê"};
          //}
        //});
      });


      //console.log(status);
      //if(status === true){
      //  this.get('session').authenticate('simple-auth-authenticator:custom', data).then(function(){
      //    alert('DDagn nhap');
      //    return {'messages': 'Đăng nhập roài'};
      //  });
      //
      //}
      //if(status === false){
      //  alert('loi roi');
      //  return {'messages':"Lại đê"};
      //}
      //user.then(function(json){
      //  console.log(json);
      //}, function (reason) {
      //  console.log(reason)
      //});

    }
  }
});
