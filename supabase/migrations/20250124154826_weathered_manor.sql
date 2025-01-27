/*
  # Wedding Gift Registry Schema

  1. New Tables
    - `gifts`
      - `id` (uuid, primary key)
      - `name` (text) - Name of the gift
      - `image_url` (text) - URL of the gift image
      - `link1` (text) - First store link
      - `link2` (text) - Second store link
      - `link3` (text) - Third store link
      - `is_purchased` (boolean) - Whether the gift has been purchased
      - `buyer_name` (text) - Name of the person who bought the gift
      - `buyer_phone` (text) - Phone number of the person who bought the gift
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `gifts` table
    - Add policies for public read access
    - Add policies for authenticated users to manage gifts
*/

CREATE TABLE IF NOT EXISTS gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  link1 text NOT NULL,
  link2 text,
  link3 text,
  is_purchased boolean DEFAULT false,
  buyer_name text,
  buyer_phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read gifts
CREATE POLICY "Anyone can view gifts"
  ON gifts
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert/update gifts
CREATE POLICY "Authenticated users can manage gifts"
  ON gifts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);