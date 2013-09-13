Calendary.Views.CalendarsDaily = Backbone.View.extend({
	template: JST['calendars/daily'],

	events: {
		"mousedown .hourRow": "quickEventStart", 
		"mousemove .hourRow": "quickEventRender",
		"mouseup": "quickEventStop",
		"click #prev_day": "prevDay",
		"click #next_day": "nextDay",
		"keypress": "quickEventStop",
		// "drop .hourRow": "dropHourRow",
	},

	render: function () {
		var content = this.template({currentlyShowingDate: (this.currentDate)});
		this.$el.html(content);
		return this;
	},

	initialize: function () {
		$(window).on('resize', this.secondRender.bind(this));
		$(".hourRow").droppable({ drop: this.dropHourRow});
	},

	draggedEvent: null,

	dropHourRow: function (eventHandler) {
		console.log("dropped");
		var hourNum = parseInt($(eventHandler.currentTarget).
		attr('id').match(/hour(\d+)/)[1]);
		var changeInHours = (hourNum - 1) - this.draggedEvent.get("start_datetime").getHours();
		this.draggedEvent.set({
			"start_datetime": this.draggedEvent.get("start_datetime").addHours(changeInHours),
			"end_datetime"	: this.draggedEvent.get("start_datetime").addHours(changeInHours),
		});
		this.secondRender();
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
		var currentEvents = this.collection.filter(function (event) {
			return Date.create(event.get("start_datetime")).toDateString() == that.currentDate.toDateString();
		});
		currentEvents.each(function (event) {
			var startTime = Date.create(event.get("start_time") || event.get("start_datetime"));
			var endTime   = Date.create(event.get("end_time") || event.get("end_datetime"));
			for (var i = startTime.getHours(); i < endTime.getHours(); i++) {
					eventsAtTime[i] = eventsAtTime[i] || 0;
					eventsAtTime[i]++;
				}
		});
		var runningEventsAtTime = [];
	
		currentEvents.each(function (event) {
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

			var maxNumEvents = that.maxRange(startTime.getHours(), endTime.getHours() - 1, eventsAtTime);
			var elWidth = (hourElm.width() - 20) / maxNumEvents;
			eventEl.width(elWidth);
			
			eventEl.css('top', hourElm.offset().top);
			console.log(runningEventsAtTime);
			var maxNumRunningEvents = that.maxRange(startTime.getHours(), endTime.getHours() - 1, runningEventsAtTime);

			eventEl.css('left', hourElm.offset().left + elWidth * (maxNumRunningEvents));
			runningEventsAtTime = that.mapRange(runningEventsAtTime, startTime.getHours() - 1, endTime.getHours() - 1, function(itm) {
				return (itm) ? ++itm : 1;
			});
			// eventEl.draggable({
			// 	// axis: "y",
			// 	start: function (eventHandler) {
			// 		that.draggedEvent = event;
			// 	},
			// });
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
		currentEvents = eventsAtTime.slice(startTimeInHours, endTimeInHours + 1);
		return currentEvents.max() || 0;
	},
	leave: function () {
		_(this.innerViews).each(function (innerView) {
			innerView.remove();
		});
		$(window).off('resize');
		$(".hourRow").off('drop');
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
			startDateTime.setHours(parseInt(hourNum) % 24, 0, 0, 0);
			var endDateTime = this.currentDate.clone();
			endDateTime.setHours((parseInt(hourNum) + 1) % 24, 0, 0, 0);
			// debugger;
			this.tempEvent.set({
				"start_datetime": startDateTime,
				"end_datetime": endDateTime,
				"start_date": startDateTime.toLocaleDateString(),
				"start_time": startDateTime.toLocaleTimeString(),
				"end_date":   endDateTime.toLocaleDateString(),
				"end_time":   endDateTime.addHours(1).toLocaleTimeString(),
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
			endDateTime.setHours((parseInt(hourNum) + 1) % 24, 0, 0, 0);
			this.tempEvent.set({"end_datetime": endDateTime });
			this.tempEventView.render($(eventHandler.currentTarget).
				height());
		}
	},
	quickEventStop: function (eventHandler) {
		if (this.isMouseDown){
			this.isMouseDown = false;
		
	        // console.log(this.tempEvent);
	        var that = this;
	        this.collection.create(this.tempEvent, {
	        	success: function () {
	        		that.tempEventView.remove();
	        		that.secondRender();
	        	},
	        	error: function (model, xhr) {
	        		alert(xhr.responseText);
	        	}
	        });
		}
	},

	prevDay: function () {
		this.currentDate.addDays(-1);
		this.render();
		this.secondRender();
	},

	nextDay: function () {
		this.currentDate.addDays(1);
		this.render();
		this.secondRender();
	},
});