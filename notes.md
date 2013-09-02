 * SecureRandom.urlsafe_Base64
 * build in "slices" meaning build feature by feature

 # Color Scheme: http://colorschemedesigner.com/#0T31yeJ--w0w0, also check out the Color Palette html file.

 * Users
 	* have many Calendars
	 	* Has title:string
	 	* Has color:string
	 	* Has description:text
	 	* belongs_to user
	 	* have many events
	 		* title:string
	 		* start:date_time
	 		* end:date_time
	 		* all_day:boolean
	 		* location:string
	 		* belongs_to calendar
	 		* description:text
	 		* attachment:file
	 		* color:string
	 		* have many reminders
	 			* type:string (choice: pop-up (desktop notification)||SMS||Email)
	 			* delay:integer
	 			* unit:string (choice: minutes|hours|days|weeks)
	 		* have many guests (users)
	 	* Share this calendar with user
	 		* permission settings (See all event details | Make Changes to events)
