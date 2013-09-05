Calendary.Views.EventsNew = Backbone.View.extend({
	template: JST['events/form'],
	events: {
		"change #attachment": "attachment",
		"submit #event_form": "submitEventForm"
	}, 
	render: function () {
		this.model =  new Calendary.Models.Event();
		var content = this.template({event: this.model});
		this.$el.html(content);
		return this;
	},

	attachment: function (event) {
		var fileURL = event.originalEvent.fpfile.url;
		var hiddenField = $(
			'<input type="hidden" name="event[attachment]">'
			).html(fileURL);
		this.$("#event_form").prepend(hiddenField);
	},

	submitEventForm: function (event) {
		event.preventDefault();
		formData = $("#event_form").serializeJSON();
		this.collection = Calendary.current_user.
		get("calendars").
		get(parseInt(formData.event.calendar_id)).get("events");
		console.log(this.collection);
		var that = this;
		this.collection.create(formData.event, {success: function () {
			console.log(that.collection);
		}, error: 
		function () {
			console.log("something went wrong");
		}});
	}

});