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

		var AMorPM = ((dateObj.getHours() + 1)/(12) >= 1) ? "PM" : "AM";
		var hour = ((dateObj.getHours()) % 12 === 0) ? 12 : dateObj.getHours() % 12;
		var minute = (dateObj.getMinutes() < 10) ?
		 "0" + dateObj.getMinutes() : dateObj.getMinutes();
		return hour + ":" + minute + " " + AMorPM;
	}
});