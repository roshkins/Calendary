* SecureRandom.urlsafe_Base64
* build in "slices" meaning build feature by feature

# Color Scheme: http://colorschemedesigner.com/#0T31yeJ--w0w0, also check out the Color Palette html file.

* Users
	* have many Calendars
	 	* Has title:string (check)
	 	* Has color:string (check)
	 	* Has description:text (check)

	 	* have many events
	 		* title:string
	 		* start:date_time
	 		* end:date_time
	 		* all_day:boolean
	 		* location:string
	 		* belongs_to calendar
	 		* description:text
	 		* attachment:string (file)
	 		* color:string
	 		* have many reminders
	 			* type:string (choice: pop-up (desktop notification)||SMS||Email)
	 			* delay:integer
	 			* unit:string (choice: minutes|hours|days|weeks)
	 		* have many guests (users)
	 	* belongs to many users (check)
	 		* permission settings (See all event details | Make Changes to events) (check)


## TODO

1. Show calendar on page
	1. Show as Agenda (check)
	2. Allow calendar creation
	3. All calendars are going to be bootstrapped with the user. Still can be fetched manually through /calendars/ though.
2. Show list of calendars
3. Omniauth
4. Set up a delayed job to send an email
5. Add description to login page of app with screenshots.

## Debugging tips

* Did you forget a new in javascript?
* Sub-inheritance as_json: http://stackoverflow.com/questions/4443218/ror-nested-include-to-include-sub-resources-in-to-xml-to-json
* To move a model from one collection to another, you must REMOVE from the first one THEN ADD it to the SECOND ONE. (DO NOT DO IT THE OTHER WAY AROUND. IT'S BUGGY FOR SOME REASON.)