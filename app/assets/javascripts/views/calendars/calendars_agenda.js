Calendary.Views.CalendarsAgenda = Backbone.View.extend({

  template: JST['calendars/agenda'],

  events: {
  	"click #deleteCalendar": "deleteCalendar",
  	"click #editCalendar": "editCalendar"
  },

  initialize: function() {
    this.listenTo(this.model.get("events"), "all", this.render);
  },

  render: function() {
    //this.model.get("events").sort();
  	var content = this.template({calendar: this.model });
  	this.$el.html(content);
    var that = this;
    this.model.get("events").each(function (event) {
      var agendaItem = new Calendary.Views.EventsAgendaShow({model: event});
      that.$("#agendaList").append(agendaItem.render().$el);
    });
  	return this;
  },

  deleteCalendar: function (event) {
    if (!confirm("Are you sure you want to delete this calendar?")){
      return false;
    }
  	$(event.currentTarget).attr("disabled", "disabled");
  	var that = this;
    console.log(this.model);
  	this.model.destroy({success: function() {
  		that.remove();
  		Backbone.history.navigate("calendar/new", {trigger: true});
  	}, wait: true});
  },

  editCalendar: function  () {
  	Backbone.history.navigate("calendar/" + this.model.id + "/edit", {trigger: true})
  }

});
