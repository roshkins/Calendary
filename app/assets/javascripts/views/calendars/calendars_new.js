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
		var that = this;
		event.preventDefault();
		$submitBtn = $(event.currentTarget).find("input[type='submit']");
		$submitBtn.attr("disabled", "disabled");
		var calendar = $(event.currentTarget).serializeJSON().calendar;
		calendar.user_id = Calendary.current_user.id;
		var newCal = this.collection.create(calendar, {success: function(){
			Backbone.history.navigate("calendar/" + newCal.id + "/agenda/", {trigger: true});
		}, error: function (model, xhr, options) {
			$error = $("<div class='error'></div>").html(xhr.responseText);
			that.$el.append($error);
			$submitBtn.removeAttr("disabled");
		} });
	}
});