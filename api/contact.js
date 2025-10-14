import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  console.log('=== FORM SUBMISSION DEBUG START ===');
  console.log('Request method:', req.method);
  console.log('Request headers:', JSON.stringify(req.headers, null, 2));
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('ERROR: Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== EXTRACTING FORM DATA ===');
    const {
      name,
      'company-name': companyName,
      'business-type': businessType,
      'social-links': socialLinks,
      'website-purpose': websitePurpose,
      'logo-photos': logoPhotos,
      phone,
      email,
      'support-payment': supportPayment,
      'data-processing': dataProcessing
    } = req.body;
    
    console.log('Extracted data:');
    console.log('- name:', name);
    console.log('- companyName:', companyName);
    console.log('- businessType:', businessType);
    console.log('- socialLinks:', socialLinks);
    console.log('- websitePurpose:', websitePurpose);
    console.log('- logoPhotos:', logoPhotos);
    console.log('- phone:', phone);
    console.log('- email:', email);
    console.log('- supportPayment:', supportPayment);
    console.log('- dataProcessing:', dataProcessing);

    // Validate required fields - ALL fields are now required
    console.log('=== VALIDATING REQUIRED FIELDS ===');
    const requiredFields = {
      name,
      companyName,
      businessType,
      socialLinks,
      websitePurpose,
      logoPhotos,
      phone,
      email,
      supportPayment,
      dataProcessing
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || value.trim() === '')
      .map(([key]) => key);

    console.log('Missing fields:', missingFields);
    console.log('All required fields present:', missingFields.length === 0);

    if (missingFields.length > 0) {
      console.log('ERROR: Missing required fields:', missingFields);
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missingFields 
      });
    }

    // Check Supabase connection
    console.log('=== SUPABASE CONNECTION CHECK ===');
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET');
    console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');
    
    // Insert data into Supabase
    console.log('=== INSERTING DATA TO SUPABASE ===');
    const insertData = {
      name,
      company_name: companyName,
      business_type: businessType,
      social_links: socialLinks,
      website_purpose: websitePurpose,
      logo_photos: logoPhotos,
      phone,
      email,
      support_payment: supportPayment,
      data_processing: dataProcessing === 'true'
    };
    
    console.log('Data to insert:', JSON.stringify(insertData, null, 2));
    
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([insertData])
      .select();

    console.log('Supabase response:');
    console.log('- data:', data);
    console.log('- error:', error);

    if (error) {
      console.error('SUPABASE ERROR:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Произошла ошибка при сохранении заявки. Попробуйте еще раз.',
        details: error.message
      });
    }

    // Log successful submission
    console.log('=== FORM SUBMISSION SUCCESS ===');
    console.log('Supabase ID:', data[0].id);
    console.log('Date:', new Date().toLocaleString('ru-RU'));
    console.log('Name:', name);
    console.log('Company:', companyName);
    console.log('Business Type:', businessType);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('========================');

    return res.status(200).json({ 
      success: true, 
      message: 'Заявка успешно сохранена!',
      submissionId: data[0].id
    });

  } catch (error) {
    console.error('=== FORM SUBMISSION ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error object:', JSON.stringify(error, null, 2));
    console.error('========================');
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Произошла ошибка при сохранении заявки. Попробуйте еще раз.',
      details: error.message
    });
  }
}