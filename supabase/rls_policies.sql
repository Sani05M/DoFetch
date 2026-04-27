-- ============================================================
-- Supabase Row Level Security (RLS) Policies for Do-Fetch
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Enable RLS on certificates table
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- 2. Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- CERTIFICATES TABLE POLICIES
-- ============================================================

-- Students can only READ their own certificates
CREATE POLICY "students_read_own_certs"
  ON certificates FOR SELECT
  USING (
    student_id = auth.uid()::text
    OR
    -- Faculty can read ALL certificates (for audit/dashboard)
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid()::text 
      AND profiles.role = 'faculty'
    )
  );

-- Students can only INSERT their own certificates
CREATE POLICY "students_insert_own_certs"
  ON certificates FOR INSERT
  WITH CHECK (student_id = auth.uid()::text);

-- Only faculty can UPDATE certificates (approve/reject)
CREATE POLICY "faculty_update_certs"
  ON certificates FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid()::text 
      AND profiles.role = 'faculty'
    )
  );

-- Students can DELETE their own pending certificates only
CREATE POLICY "students_delete_own_pending"
  ON certificates FOR DELETE
  USING (
    student_id = auth.uid()::text
    AND status = 'pending'
  );

-- ============================================================
-- PROFILES TABLE POLICIES
-- ============================================================

-- Users can read their own profile
CREATE POLICY "users_read_own_profile"
  ON profiles FOR SELECT
  USING (id = auth.uid()::text);

-- Faculty can read ALL profiles (for leaderboard/sections)
CREATE POLICY "faculty_read_all_profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid()::text 
      AND profiles.role = 'faculty'
    )
  );

-- Users can update their own profile
CREATE POLICY "users_update_own_profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid()::text);

-- ============================================================
-- PUBLIC VERIFY ACCESS (for /verify/[id] page)
-- ============================================================

-- Anyone can read approved certificates for public verification
CREATE POLICY "public_read_approved_certs"
  ON certificates FOR SELECT
  USING (status = 'approved');

-- ============================================================
-- SERVICE ROLE BYPASS
-- Note: The service_role key (used by your API routes) 
-- automatically bypasses RLS. Your API routes using 
-- supabase with the service_role key will continue to
-- work without changes.
-- ============================================================
