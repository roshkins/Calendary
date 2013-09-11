Calendary.Views.EventsAgendaShow = Backbone.View.extend({
	template: JST['events/agenda_show'],

	events: {
		"click #delete_event": "deleteEvent"
	},

	render: function () {
		var niceStart = this.niceTime(Date.create(this.model.escape("start_time")));
		var niceStartDate = this.niceDate(Date.create(this.model.escape("start_date")));
		var niceEnd = this.niceTime(Date.create(this.model.escape("end_time")));
		var niceEndDate = this.niceDate(Date.create(this.model.escape("end_date")));
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
	},
	deleteEvent: function () {
		if (confirm("Are you sure you wish to delete \"" + this.model.get("title") + "\"?")) {
			this.model.destroy();
			this.remove();
		}
	}
});