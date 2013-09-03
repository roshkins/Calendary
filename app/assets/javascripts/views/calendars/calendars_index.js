Calendary.Views.CalendarsIndex = Backbone.View.extend({
	template: JST["calendars/index"],

	events: {
		"change #calendar_chooser": "choose_calendar"
	},
	render: function() {
		var content = this.template({calendars: this.collection});
		this.$el.html(content);
		return this;
	},

	choose_calendar: function(event) {
		var selectedValue = "";
		$(event.currentTarget).find("option:selected").each(function () {
			selectedText = $(this).val();
		});
		if(selectedText === "create") {
			Backbone.history.navigate("/calendar/create");
		} else if (!isNaN(parseInt(selectedText))) {
			Backbone.history.navigate("/calendar/agenda/" + selectedText);
		}
	}
});