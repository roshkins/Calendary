# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)
#  password_digest :string(255)
#  session         :string(255)
#  email_address   :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require "bcrypt"
class User < ActiveRecord::Base
  attr_accessible :username, :password, :email_address
 
  before_save :downcase_username

  validates :username, :presence => true
  validates :password_digest, :presence => {:message => "must have one word character and one number"}
  validates :username, :uniqueness => true

  has_many :user_calendars, :dependent => :destroy

  has_many :calendars, :through => :user_calendars, :source => :calendar

  def as_json(params)
    super(params.merge(:include => [:calendars], :except => [:password_digest, :session]))
  end

  def password= plain_text
    if plain_text =~ /\d/ && plain_text =~ /\w/
  	  self.password_digest = BCrypt::Password.create(plain_text)
    else
      self.errors[:password] = "must contain one digit and one word character."
      self.password_digest = nil    
    end
  end

  def password_equal? plain_text
  	BCrypt::Password.new(self.password_digest) == plain_text
  end

  def self.fetch_valid_user other_user_params
    user = User.find_by_username(other_user_params[:username])
    p user
   if user && user.username.downcase == other_user_params[:username].downcase &&
    user.password_equal?(other_user_params[:password])
    user
  else
    nil
  end
  end

  def downcase_username
    self.username.downcase!
  end

  def session_token!
  	self.session = SecureRandom.urlsafe_base64(16)
  	self.save!
  	self.session
  end

  def has_update_permission?(calendar)
    if user_cal = self.user_calendars.find_by_calendar_id(calendar.id)
      user_cal.permission_setting == UserCalendar::PERMISSION_OPTIONS[1]
    else
      false
    end
  end

  def has_show_permission?(calendar)
    if user_cal = self.user_calendars.find_by_calendar_id(calendar.id)
      permission_level = user_cal.permission_setting
      permission_level == UserCalendar::PERMISSION_OPTIONS[0] || 
      permission_level == UserCalendar::PERMISSION_OPTIONS[1]
    else
      false
    end
  end
end
