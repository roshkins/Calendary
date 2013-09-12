Calendary.Models.Calendar = Backbone.Model.extend({
	parse: function (attributes) {
        console.log(attributes.events);
			attributes.events = new Calendary.Collections.Events(
				// _.filter(attributes.events, function (dateObj) {
				// 	// var value = Date.parse(dateObj.start_date) + Date.parse(dateObj.start_time);					
				// 	var date = (Date.create(dateObj.start_datetime).reset());
				// 	return date - (new Date()) > 0;
				// })
				attributes.events
				, {
					parse: true					
				}, attributes.id);
		return attributes;
	}
});
