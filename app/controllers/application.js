import Ember from 'ember';

export default Ember.Controller.extend({
  selectedOrder: null,
  aConfirmation: 0,
  aMaterials: 0,
  aProduction: 0,
  inProduction: 0,
  complete: 0,
  ready: 0,
  itemType: "All Item Types",
  statusSort: "All Status",
  customerSort: "All Customers",
  chartData: null,
  customers: [],
  sortedList: [],
  selectedCustomer: null,
  selectedItem: null,
  showingSortedList: false,

  updateChartData: function(){
    var data = [this.get("aConfirmation"), this.get("aMaterials"), this.get("aProduction"), this.get("inProduction"), this.get("complete"), this.get("ready")];
    var chartData = {
      labels: ["Awaiting Confirmation", "Awaiting Materials", "Awaiting Production", "In Production", "Complete (Awaiting Inspection)", "Ready To Dispatch"],
      datasets: [
        {
          label: "Orders",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(48, 56, 74, 1)",
          borderColor: "rgba(48, 56, 74, 1)",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(48, 56, 74, 1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(48, 56, 74, 1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data,
          spanGaps: false,
        }
      ]
    };
    this.set("chartData", chartData);
  }.observes("aConfirmation", "aProductions", "aMaterials", "aProduction", "inProduction", "complete", "ready"),

  aConfirmationObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("status") ===  "Awaiting Confirmation"){
        controller.set("aConfirmation", controller.get("aConfirmation") + 1);
      }
    });
  }.observes("model"),

  aMaterialsObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("status") ===  "Awaiting Materials"){
        controller.set("aMaterials", controller.get("aMaterials") + 1);
      }
    });
  }.observes("model"),

  aProductionObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("status") ===  "Awaiting Production"){
        controller.set("aProduction", controller.get("aProduction") + 1);
      }
    });
  }.observes("model"),

  inProductionObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("status") ===  "In Production"){
        controller.set("inProduction", controller.get("inProduction") + 1);
      }
    });
  }.observes("model"),

  completeObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("status") ===  "Complete"){
        controller.set("complete", controller.get("complete") + 1);
      }
    });
  }.observes("model"),

  readyObserver: function(){
    let controller = this;

    this.get("model").forEach(function(item){
      if(item.get("status") ===  "Ready To Dispatch"){
        controller.set("ready", controller.get("ready") + 1);
      }
    });
  }.observes("model"),

  update: function(){
    this.sort(this.get("statusSort"));
  }.observes("model"),

  sort: function(status){
    let controller = this;
    this.set("selectedOrder", null);
    this.set("sortedList", []);
    this.set("showingSortedList", true);

    this.get("model").forEach(function(item){
      if(controller.get("selectedItem")){
        if(controller.get("selectedCustomer")){
          if(status === "All Status" && item.get("customer.id") === controller.get("selectedCustomer.id")) {
            item.get("manifest.parts").forEach(function (line) {
              if (line.get("part") === controller.get("selectedItem.name")) {
                controller.get("sortedList").pushObject(item);
              }
            });
          }else if(item.get("status") === status && item.get("customer.id") === controller.get("selectedCustomer.id")){
            item.get("manifest.parts").forEach(function(line){
              if(line.get("part") === controller.get("selectedItem.name")){
                controller.get("sortedList").pushObject(item);
              }
            });
          }
        }else{
          if(status === "All Status"){
            if(controller.get("selectedItem")) {
              item.get("manifest.parts").forEach(function(line){
                if(line.get("part") === controller.get("selectedItem.name")){
                  controller.get("sortedList").pushObject(item);
                }
              });
            }else{
              controller.get("sortedList").pushObject(item);
            }
          } else if(item.get("status") === status){
            item.get("manifest.parts").forEach(function(line){
              if(line.get("part") === controller.get("selectedItem.name")){
                controller.get("sortedList").pushObject(item);
              }
            });
          }
        }
      } else if(controller.get("selectedCustomer")){
        if(status === "All Status"){
          if(item.get("customer.id") === controller.get("selectedCustomer.id")){
            controller.get("sortedList").pushObject(item);
          }
        }else{
          if(item.get("status") === status && item.get("customer.id") === controller.get("selectedCustomer.id")){
            controller.get("sortedList").pushObject(item);
          }
        }
      }else{
        if(status === "All Status"){
          controller.get("sortedList").pushObject(item);
        }else if(item.get("status") === status){
          controller.get("sortedList").pushObject(item);
        }
      }
    });
  },

  actions: {
    selectItem(item){
      if(item === "all"){
        this.set("itemType", "All Item Types");
        this.set("selectedItem", null);
      }else{
        this.set("itemType", item.get("name"));
        this.set("selectedItem", item);
      }
      this.sort(this.get("statusSort"));
    },

    sortStatus(status){
      if (status === "all") {
        this.set("statusSort", "All Status");
        this.sort("All Status");
      }else{
        this.set("statusSort", status);
        this.sort(status);
      }
    },

    selectCustomer(customer){
      if(customer === "all"){
        this.set("customerSort", "All Customers");
        this.set("selectedCustomer", null);
      }else{
        this.set("customerSort", customer.get("fullName"));
        this.set("selectedCustomer", customer);
      }
      this.sort(this.get("statusSort"));
    },

    select(order){
      this.set("selectedOrder", order);
    }
  }
});
