import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const dataFilePath = path.join(process.cwd(), 'form-submissions.json');
    
    // Check if file exists
    if (!fs.existsSync(dataFilePath)) {
      return res.status(200).json({ 
        submissions: [],
        total: 0,
        message: 'No submissions yet'
      });
    }

    // Read and parse data
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const submissions = JSON.parse(fileContent);

    // Return data
    return res.status(200).json({ 
      submissions,
      total: submissions.length,
      message: `Found ${submissions.length} submissions`
    });

  } catch (error) {
    console.error('Error reading submissions:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Could not read submissions data'
    });
  }
}
