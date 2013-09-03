Calendary.Views.CalendarsAgenda = Backbone.View.extend({

  template: JST['calendars/agenda'],

  render: function() {
  	var content = this.template({calendar: Calendary.current_user.get("calendars").at(0)});
  	this.$el.html(content);
  	return this;
  }	

});
