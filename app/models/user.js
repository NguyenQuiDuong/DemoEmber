import DS from 'ember-data';


var user =  DS.Model.extend({
  name: DS.attr('string'),
  age: DS.attr('number'),
  password: DS.attr('string')
});

user.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Trek', age: 2, password: 'Glowacki' },
    { id: 2, name: 'Tom' , age: 5, password: 'Dale'}
  ]
});


export default user;
