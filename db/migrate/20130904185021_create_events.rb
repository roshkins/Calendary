class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :all_day
      t.string :location
      t.integer :calendar_id
      t.text :description
      t.string :attachment
      t.string :color

      t.timestamps
    end
    add_index :events, :calendar_id
  end
end
