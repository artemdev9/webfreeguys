import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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

    // Validate required fields - ALL fields are now required
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

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missingFields 
      });
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([
        {
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
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        error: 'Database error',
        message: 'Произошла ошибка при сохранении заявки. Попробуйте еще раз.' 
      });
    }

    // Log successful submission
    console.log('=== NEW FORM SUBMISSION ===');
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
    console.error('Form submission error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Произошла ошибка при сохранении заявки. Попробуйте еще раз.' 
    });
  }
}