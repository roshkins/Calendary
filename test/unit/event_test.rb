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

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
