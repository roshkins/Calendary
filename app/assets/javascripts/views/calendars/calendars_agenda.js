Calendary.Views.CalendarsAgenda = Backbone.View.extend({

  template: JST['calendars/agenda'],

  render: function() {

  	var content = this.template({calendar: this.model });
  	this.$el.html(content);
  	return this;
  }	

});
