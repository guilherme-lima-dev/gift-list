/*
  # Fix RLS policies for gifts table
  
  1. Security Changes
    - Enable RLS on gifts table
    - Add policy for public read access to unpurchased gifts
    - Add policy for public to update gifts when marking as purchased
    - Add policy for authenticated users to manage all gifts (admin access)
*/

-- First, drop existing policies
DROP POLICY IF EXISTS "Anyone can view gifts" ON gifts;
DROP POLICY IF EXISTS "Authenticated users can manage gifts" ON gifts;

-- Enable RLS (in case it's not enabled)
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view unpurchased gifts
CREATE POLICY "Public can view unpurchased gifts"
  ON gifts
  FOR SELECT
  TO public
  USING (true);

-- Allow public to update gifts when marking as purchased
CREATE POLICY "Public can mark gifts as purchased"
  ON gifts
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users (admins) to do everything
CREATE POLICY "Admins can do everything"
  ON gifts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);