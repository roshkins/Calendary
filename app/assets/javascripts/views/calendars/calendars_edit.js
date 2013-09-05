Calendary.Views.CalendarsEdit = Backbone.View.extend({
	template: JST['calendars/form'],

	events: {
		"submit form": "finishEditing"
	},

	render: function() {
		var content = this.template({calendar: this.model});
		this.$el.html(content);
		return this;
	},

	finishEditing: function (event) {
		event.preventDefault();
		var that = this;
		$submitBtn = $(event.currentTarget).find("input[type='submit']");
		$submitBtn.attr("disabled", "disabled");
		that.model.save($(event.currentTarget).serializeJSON(), {
			success: function () {
				Backbone.history.navigate("calendar/" + that.model.id + "/agenda/", {trigger: true});
			}, error: function (model, xhr, options) {
			$error = $("<div class='error'></div>").html(xhr.responseText);
			that.$el.append($error);
			$submitBtn.removeAttr("disabled");
		 }
		});
	}
});