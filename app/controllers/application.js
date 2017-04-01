import Ember from 'ember';

export default Ember.Controller.extend({
  selectedOrder: null,
  processingItems: 0,
  missingItems: 0,
  completeItems: 0,

  processingItemsObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("isProcessing")){
        controller.set("processingItems", controller.get("processingItems") + 1);
      }
    });
  }.observes("model"),

  missingItemsObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("isMissingItems")){
        controller.set("missingItems", controller.get("missingItems") + 1);
      }
    });
  }.observes("model"),

  completeItemsObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("isComplete")){
        controller.set("completeItems", controller.get("completeItems") + 1);
      }
    });
  }.observes("model"),

  actions: {
    select(order){
      this.set("selectedOrder", order);
    }
  }
});
