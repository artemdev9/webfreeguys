// In-memory storage for form submissions
let formSubmissions = [];

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

    // Create form submission object
    const formSubmission = {
      id: Date.now() + Math.random().toString(36).substr(2, 9), // Unique ID
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleString('ru-RU'),
      data: {
        name,
        companyName,
        businessType,
        socialLinks: socialLinks || 'Не указано',
        websitePurpose,
        logoPhotos,
        phone,
        email: email || 'Не указано',
        supportPayment,
        dataProcessing
      }
    };

    // Add to in-memory storage
    formSubmissions.push(formSubmission);

    // Log to console for immediate visibility
    console.log('=== NEW FORM SUBMISSION ===');
    console.log('ID:', formSubmission.id);
    console.log('Date:', formSubmission.date);
    console.log('Name:', name);
    console.log('Company:', companyName);
    console.log('Business Type:', businessType);
    console.log('Social Links:', socialLinks);
    console.log('Website Purpose:', websitePurpose);
    console.log('Logo/Content:', logoPhotos);
    console.log('Phone:', phone);
    console.log('Email:', email);
    console.log('Support Payment:', supportPayment);
    console.log('Data Processing:', dataProcessing);
    console.log('Total Submissions:', formSubmissions.length);
    console.log('========================');

    return res.status(200).json({ 
      success: true, 
      message: 'Заявка успешно сохранена!',
      submissionId: formSubmission.id
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Произошла ошибка при сохранении заявки. Попробуйте еще раз.' 
    });
  }
}