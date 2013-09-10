Calendary.Views.EventsAgendaShow = Backbone.View.extend({
	template: JST['events/agenda_show'],

	render: function () {
		var niceStart = this.niceTime(new Date(this.model.escape("start_time")));
		var niceStartDate = this.niceDate(new Date(this.model.escape("start_date")));
		var niceEnd = this.niceTime(new Date(this.model.escape("end_time")));
		var niceEndDate = this.niceDate(new Date(this.model.escape("end_date")));
		var content = this.template({
			event: this.model, 
			niceStart: niceStart,
			niceStartDate: niceStartDate,
			niceEnd: niceEnd,
			niceEndDate: niceEndDate
		});
		this.$el.html(content);
		return this;
	},

	niceDate: function(dateObj){
		return dateObj.toLocaleDateString();
	},
	niceTime: function(timeObj) {
		return timeObj.toLocaleTimeString();
	}
});