# == Schema Information
#
# Table name: events
#
#  id          :integer          not null, primary key
#  title       :string(255)
#  start_time  :datetime
#  end_time    :datetime
#  all_day     :boolean
#  location    :string(255)
#  calendar_id :integer
#  description :text
#  attachment  :string(255)
#  color       :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Event < ActiveRecord::Base
	attr_accessible :all_day, :attachment, :calendar_id,
	 :color, :description, :end_time, :location,
	 :start_time, :title

	 validates :start_time, :end_time, :presence => true

	 validate :start_time_before_end_time

	 def start_time_before_end_time
	 	if (self.start_time > self.end_time)
	 		self.errors[:base] << 
	 		"Start time must be before end time."
	 	end
	 end

	belongs_to :calendar, :dependent => :destroy

	def has_update_permission?(user)
		user.has_update_permission?(self.calendar)
	end

	def has_show_permission?(user)
		user.has_show_permission?(self.calendar)
	end
end
