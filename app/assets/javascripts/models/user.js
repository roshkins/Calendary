Calendary.Models.User = Backbone.Model.extend({
	url: "user",
	parse: function(response) {
		response.calendars = new Calendary.Collections.Calendars(response.calendars);
		return response;
	}

})