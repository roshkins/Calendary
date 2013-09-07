Calendary.Views.EventsForm = Backbone.View.extend({
	template: JST['events/form'],
	events: {
		"change #attachment": "attachment",
		"submit #event_form": "submitEventForm",
		"blur #event_start_time": "blurEventStartTime"
	}, 
	render: function () {
		this.model = this.model || new Calendary.Models.Event();
		debugger;
		var content = this.template({
				event: this.model
			});
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
		$("#submit_button").attr("disabled", "disabled");
		var reenable = function () {
			$("#submit_button").removeAttr("disabled");
		};
		var options = {success: function () {
				Backbone.history.navigate("calendar/" +
				formData.event.calendar_id + "/agenda/", {trigger: true});
			}, error: 
			function (model, xhr) {
				var div = $("<div id='errors'></div>").html(xhr.responseText);
				that.$el.prepend(div);
				reenable();
			}
		};

		if (this.model.isNew())
		{
			this.collection.create(formData.event, options);
		} else {
			this.model.set(formData.event);
			var newCal = Calendary.current_user.
			get("calendars").
			get(parseInt(this.model.get("calendar_id"))).get("events");
			 debugger;
			this.collection.remove(this.model);
			newCal.add(this.model);
			this.model.save(null, options);
		}
	},

	blurEventStartTime: function (event) {
		if($("#event_end_time").val() === "") {
			var tempDate = new Date($("#event_start_time").val());
			tempDate.setHours(tempDate.getHours() + 1);
			$("#event_end_time").val(tempDate.toISOString().slice(0, -1));
		}
	}

});