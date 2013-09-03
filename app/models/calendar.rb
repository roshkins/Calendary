class Calendar < ActiveRecord::Base
  attr_accessible :color, :description, :title
  validates :title, :presence => true
  
  has_many :user_calendars
  has_many :users, :through => :user_calendars, :source => :user




end