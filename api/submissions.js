import { createClient } from '@supabase/supabase-js'

// Initialize Supabase admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAdminKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey)

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check for password in query parameters
    const { password } = req.query;
    
    // Simple password protection (you can change this password)
    const adminPassword = process.env.ADMIN_PASSWORD || 'webfreeguys2024';
    
    if (!password || password !== adminPassword) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Password required to access submissions'
      });
    }

    // Fetch all submissions from Supabase
    const { data, error } = await supabaseAdmin
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        error: 'Database error',
        message: 'Could not fetch submissions'
      });
    }

    return res.status(200).json({
      submissions: data,
      total: data.length,
      message: 'Submissions retrieved successfully'
    });

  } catch (error) {
    console.error('Error reading submissions:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Could not read submissions data'
    });
  }
}
