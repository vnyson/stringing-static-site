-- Inventory consumption tracking table
CREATE TABLE IF NOT EXISTS inventory_consumption (
  id TEXT PRIMARY KEY,
  inventory_id TEXT,
  stringing_job_id TEXT,
  quantity_consumed INTEGER NOT NULL,
  consumed_at TEXT,
  notes TEXT,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id),
  FOREIGN KEY (stringing_job_id) REFERENCES stringing(id)
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_inventory_consumption_inventory_id ON inventory_consumption(inventory_id);
CREATE INDEX IF NOT EXISTS idx_inventory_consumption_stringing_job_id ON inventory_consumption(stringing_job_id);
CREATE INDEX IF NOT EXISTS idx_inventory_consumption_consumed_at ON inventory_consumption(consumed_at);
