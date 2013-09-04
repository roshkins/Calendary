Calendary.Views.CalendarsNew = Backbone.View.extend({
	template: JST["calendars/form"],

	events: {
		"submit form":"formSubmit"
	},

	render: function() {
		var emptyCal = new Calendary.Models.Calendar();
		var content = this.template({calendar: emptyCal});
		this.$el.html(content);
		return this;
	},

	formSubmit: function(event) {
		event.preventDefault();
		$(event.currentTarget).find("input[type='submit']").attr("disabled", "disabled");
		var calendar = $(event.currentTarget).serializeJSON().calendar;
		calendar.user_id = Calendary.current_user.id;
		var newCal = this.collection.create(calendar, {success: function(){
			Backbone.history.navigate("calendar/agenda/" + newCal.id, {trigger: true});
		}});
	}
});