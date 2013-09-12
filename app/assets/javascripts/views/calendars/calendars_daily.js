Calendary.Views.CalendarsDaily = Backbone.View.extend({
	template: JST['calendars/daily'],

	events: {
		"mouseDown .hourRow": "quickEventStart", 
		"mouseMove .hourRow": "quickEventRender",
		"mouseUp   .hourRow": "quickEventStop"
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	},

	initialize: function () {
		$(window).on('resize', this.secondRender.bind(this));
	},

	innerViews: [],
	secondRender: function () {
		if(this.innerViews.length > 0) {
		_(this.innerViews).each(function (innerView) {
			innerView.remove();
		});
		}
		var that = this;
		var eventsAtTime = [];
		this.collection.each(function (event) {
			var startTime = Date.create(event.get("start_time"));
			var endTime   = Date.create(event.get("end_time"));
			for (var i = startTime.getHours(); i <= endTime.getHours(); i++) {
					eventsAtTime[i] = eventsAtTime[i] || 0;
					eventsAtTime[i]++;
				}
		});

		var runningEventsAtTime = [];
	
		this.collection.each(function (event) {
			var eventView = new Calendary.Views.EventsDailyShow({
				model: event
			});
			var startTime = Date.create(event.get("start_time"));
			var endTime   = Date.create(event.get("end_time"));
			var hourElm = that.$("#hour" + (startTime.getHours()));
			eventView.render(hourElm.height());
			var eventEl = eventView.$el;
			that.innerViews.push(eventView);
			eventEl.css("position", "absolute");

			var maxNumEvents = that.maxRange(startTime.getHours(), endTime.getHours(), eventsAtTime);
			var elWidth = (hourElm.width() - 20) / maxNumEvents;
			eventEl.width(elWidth);
			
			eventEl.css('top', hourElm.offset().top);
			var maxNumRunningEvents = that.maxRange(startTime.getHours(), endTime.getHours(), runningEventsAtTime);

			eventEl.css('left', hourElm.offset().left + elWidth * (maxNumRunningEvents));
			runningEventsAtTime = that.mapRange(runningEventsAtTime, startTime.getHours(), endTime.getHours(), function(itm) {
				return (itm) ? ++itm : 1;
			});
			that.$el.append(eventEl);
			
		});
	},

	mapRange: function(array, idx1, idx2, fn ) {
		for (var i=idx1; i <= idx2; i++) {
			array[i] = fn(array[i], i);
		}
		return array;
	},
	maxRange: function (startTimeInHours, endTimeInHours, eventsAtTime) {
		current_events = eventsAtTime.slice(startTimeInHours, endTimeInHours + 1);
		return current_events.max() || 0;
	},
	leave: function () {
		_(this.innerViews).each(function (innerView) {
			innerView.remove();
		});
		$(window).off('resize');
	},

	tempEvent: new Calendary.Models.Event(),

	quickEventStart: function (eventHandler) {
		var hourNum = eventHandler.currentTarget().attr('id').match(/hour(\d+)/)[1];
		this.tempEvent = new Calendary.Models.Event();

	},
});