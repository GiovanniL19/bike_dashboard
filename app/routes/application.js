import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.findAll("transaction").then(function(transactions){
      return transactions;
    });
  },
  setupController: function(controller, model){
    controller.set("model", model);
    controller.set("selectedOrder", model.get("firstObject"));
  }
});
