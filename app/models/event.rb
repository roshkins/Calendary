# == Schema Information
#
# Table name: events
#
#  id             :integer          not null, primary key
#  title          :string(255)
#  start_datetime :datetime
#  end_datetime   :datetime
#  all_day        :boolean
#  location       :string(255)
#  calendar_id    :integer
#  description    :text
#  attachment     :string(255)
#  color          :string(255)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Event < ActiveRecord::Base
	attr_accessible :all_day, :attachment, :calendar_id,
	 :color, :description, :location, :title, :start_datetime,
	 :end_datetime

	 validates :start_time, :end_time, :presence => true, :unless => :all_day
	 validates :start_date, :end_date, :presence => true

	 validate :start_time_before_end_time_unless_all_day

	 def start_time_before_end_time_unless_all_day
	 	unless self.all_day
		 	if (self.start_time >= self.end_time) && 
		 		(self.start_date == self.end_date)
		 		self.errors[:base] << 
		 		"Start time must be before end time if on same day."
		 	end
	 	end
	 end

	belongs_to :calendar

	def has_update_permission?(user)
		user.has_update_permission?(self.calendar)
	end

	def has_show_permission?(user)
		user.has_show_permission?(self.calendar)
	end

	def start_time
		self.start_datetime.to_time
	end

	def start_date
		self.start_datetime.to_date
	end

	def end_time
		self.end_datetime.to_time
	end

	def end_date
		self.end_datetime.to_date
	end

end
