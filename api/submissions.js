// Import the same in-memory storage from contact.js
// Note: In serverless functions, each request might be a new instance
// So we'll need to use a shared storage solution

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // For now, return a message explaining the limitation
    return res.status(200).json({ 
      submissions: [],
      total: 0,
      message: 'Data is stored in memory and logged to console. Check Vercel function logs to see submissions.',
      note: 'In-memory storage resets when serverless function restarts. For persistent storage, consider using a database.'
    });

  } catch (error) {
    console.error('Error reading submissions:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Could not read submissions data'
    });
  }
}
