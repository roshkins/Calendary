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

require 'test_helper'

class CalendarTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
