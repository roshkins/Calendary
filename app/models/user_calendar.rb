class UserCalendar < ActiveRecord::Base
  attr_accessible :calendar_id, :permission_setting, :user_id

  PERMISSION_OPTIONS = ["see all event details", "make changes to events"]
  validates :permission_setting, :inclusion => {:in => PERMISSION_OPTIONS}

  validates :user_id, :uniqueness => {:scope => :calendar_id}
  validates :user_id, :calendar_id, :permission_setting, :presence => true

  belongs_to :user
  belongs_to :calendar
end
