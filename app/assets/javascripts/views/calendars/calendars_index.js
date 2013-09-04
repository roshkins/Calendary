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

	initialize: function() {
		this.listenTo(this.collection, "add", this.render);
		this.listenTo(this.collection, "remove", this.render);
		this.listenTo(this.collection, "change", this.render);
	},

	choose_calendar: function(event) {
		var selectedValue = "";
		$(event.currentTarget).find("option:selected").each(function () {
			selectedText = $(this).val();
		});
		if(selectedText === "new") {
			Backbone.history.navigate("/calendar/new", {trigger: true});
		} else if (!isNaN(parseInt(selectedText))) {
			Backbone.history.navigate("/calendar/" + selectedText + "/agenda/", {trigger: true});
		}
	}
});