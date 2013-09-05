# == Schema Information
#
# Table name: calendars
#
#  id          :integer          not null, primary key
#  title       :string(255)
#  color       :string(255)
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Calendar < ActiveRecord::Base
  attr_accessible :color, :description, :title
  validates :title, :presence => true
  
  has_many :user_calendars, :dependent => :destroy
  has_many :users, :through => :user_calendars, :source => :user

  has_many :events, :dependent => :destroy

  def as_json(params)
    super(params.merge(:include => [:events]))
  end


end
