Calendary.Views.CalendarsAgenda = Backbone.View.extend({

  template: JST['calendars/agenda'],

  events: {
  	"click #deleteCalendar": "deleteCalendar",
  	"click #editCalendar": "editCalendar"
  },

  render: function() {
  	var content = this.template({calendar: this.model });
  	this.$el.html(content);
  	return this;
  },

  deleteCalendar: function (event) {
  	$(event.currentTarget).attr("disabled", "disabled");
  	var that = this;
  	this.model.destroy({success: function() {
  		that.remove();
  		Backbone.history.navigate("calendar/new", {trigger: true});
  	}, wait: true});
  },

  editCalendar: function  () {
  	Backbone.history.navigate("calendar/" + this.model.id + "/edit", {trigger: true})
  }

});
