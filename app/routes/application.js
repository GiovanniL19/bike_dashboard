import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.query("transaction", {order: true}).then(function(transactions){
      return transactions;
    });
  },
  setupController: function(controller, model){
    controller.set("model", model);

    controller.set("selectedOrder", model.get("firstObject"));

    controller.store.findAll("customer").then(function(customers){
      controller.set("customers", customers);
    });

    controller.store.findAll("item").then(function(materials){
      controller.set("items", materials);
    });

  }
});
