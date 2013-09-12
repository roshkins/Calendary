Calendary.Views.CalendarsDaily = Backbone.View.extend({
	template: JST['calendars/daily'],

	events: {
		"mousedown .hourRow": "quickEventStart", 
		"mousemove .hourRow": "quickEventRender",
		"mouseup": "quickEventStop"
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
			var startTime = Date.create(event.get("start_time") || event.get("start_datetime"));
			var endTime   = Date.create(event.get("end_time") || event.get("end_datetime"));
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
			var startTime = Date.create(event.get("start_time") || event.get("start_datetime"));
			var endTime   = Date.create(event.get("end_time") || event.get("end_datetime"));
			var hourElm = that.$("#hour" + (startTime.getHours() || 24));
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

	tempEvent: null,
	tempEventView: null,
	$tempEventEl: null,

	currentDate: new Date(),

	isMouseDown: false,

	positionEl: function($elWithLocation, $elToPosition) {
			$elToPosition.css('position', 'absolute');
			$elToPosition.width($elWithLocation.width() - 10);
			$elToPosition.css('top', $elWithLocation.offset().top);
			$elToPosition.css('left', $elWithLocation.offset().left);
	},

	quickEventStart: function (eventHandler) {
		eventHandler.preventDefault();
		if(eventHandler.which === 1) {
			var hourNum = $(eventHandler.currentTarget).attr('id').match(/hour(\d+)/)[1];
			this.tempEvent = new Calendary.Models.Event();
			var startDateTime = this.currentDate.clone();
			startDateTime.setHours(parseInt(hourNum), 0, 0, 0);
			var endDateTime = this.currentDate.clone();
			endDateTime.setHours(parseInt(hourNum) + 1, 0, 0, 0);
			this.tempEvent.set({
				"start_datetime": startDateTime,
				"end_datetime": endDateTime,
				"color": "#F5F5DC",
                "title": "(no title)",
                "calendar_id": Calendary.selectedCalendar.id,
			});
			this.isMouseDown = true;
			this.tempEventView = new Calendary.Views.EventsDailyShow({model: this.tempEvent});
			var $tempEl = this.tempEventView.render($(eventHandler.currentTarget).height()).$el;
			this.positionEl($(eventHandler.currentTarget), $tempEl);
			this.$el.append($tempEl);
			this.$tempEventEl = $tempEl;
		}

	},
	quickEventRender: function (eventHandler) {
		if(this.isMouseDown) {
			var hourNum = parseInt($(eventHandler.currentTarget).
				attr('id').match(/hour(\d+)/)[1]);
			var endDateTime = this.currentDate.clone();
			endDateTime.setHours(parseInt(hourNum) + 1, 0, 0, 0);
			this.tempEvent.set({"end_datetime": endDateTime });
			this.tempEventView.render($(eventHandler.currentTarget).
				height());
		}
	},
	quickEventStop: function (eventHandler) {
		this.isMouseDown = false;
		this.tempEventView.remove();
        // console.log(this.tempEvent);
        var that = this;
        this.collection.create(this.tempEvent, {
        	success: function () {
        		that.secondRender();
        	},
        	error: function (model, xhr) {
        		alert(xhr.responseText);
        	}
        });
		
	},
});