class CreateCalendars < ActiveRecord::Migration
  def change
    create_table :calendars do |t|
      t.string :title
      t.string :color
      t.text :description

      t.timestamps
    end
  end
end
