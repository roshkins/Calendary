Calendary.Views.EventsAgendaShow = Backbone.View.extend({
	template: JST['events/agenda_show'],

	render: function () {
		var niceStart = this.niceTime(new Date(this.model.escape("start_time")));
		var niceEnd   = this.niceTime(new Date(this.model.escape("end_time")));
		var content = this.template({
			event: this.model, 
			niceStart: niceStart,
			niceEnd: niceEnd
		});
		this.$el.html(content);
		return this;
	},

	niceTime: function(dateObj) {
		return dateObj.toLocaleString();
	}
});