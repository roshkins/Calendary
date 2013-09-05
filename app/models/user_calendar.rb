# == Schema Information
#
# Table name: user_calendars
#
#  id                 :integer          not null, primary key
#  user_id            :integer
#  calendar_id        :integer
#  permission_setting :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class UserCalendar < ActiveRecord::Base
  attr_accessible :calendar_id, :permission_setting, :user_id

  PERMISSION_OPTIONS = ["see all event details", "make changes to events"]
  validates :permission_setting, :inclusion => {:in => PERMISSION_OPTIONS}

  validates :user_id, :uniqueness => {:scope => :calendar_id}
  validates :user_id, :calendar_id, :permission_setting, :presence => true

  belongs_to :user, :dependent => :destroy
  belongs_to :calendar, :dependent => :destroy
end
