require "bcrypt"
class User < ActiveRecord::Base
  attr_accessible :username, :password, :email_address

  def password= plain_text
  	self.password_digest = BCrypt::Password.create(plain_text)
  end

  def password_equal? plain_text
  	BCrypt::Password.new(self.password_digest) == plain_text
  end

  def self.fetch_valid_user other_user_params
    user = User.find_by_username(other_user_params[:password])
   if user.username == other_user_params[:username] &&
    user.password_equal?(other_user_params[:password])
    user
  else
    nil
  end
  end

  def session_token!
  	self.session = SecureRandom.urlsafe_base64(16)
  	self.save!
  	self.session
  end
end
