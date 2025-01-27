CREATE POLICY "allow_public_access"
ON gifts
FOR SELECT
USING (true);
