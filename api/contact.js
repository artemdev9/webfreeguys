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

    // Validate required fields
    const requiredFields = {
      name,
      companyName,
      businessType,
      websitePurpose,
      logoPhotos,
      phone,
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

    // Email content
    const emailContent = `
Новая заявка с сайта:

Имя: ${name}
Компания/Бренд: ${companyName}
Сфера деятельности: ${businessType}
Соцсети/Карты: ${socialLinks || 'Не указано'}
Цель сайта: ${websitePurpose}
Логотип и контент: ${logoPhotos}
Телефон: ${phone}
Email: ${email || 'Не указано'}
Готовность платить за поддержку: ${supportPayment}
Согласие на обработку данных: ${dataProcessing}

Дата отправки: ${new Date().toLocaleString('ru-RU')}
    `;

    // Send email using Nodemailer (you'll need to install nodemailer)
    // For now, we'll just log the content and return success
    console.log('Form submission received:', emailContent);

    // TODO: Replace with actual email sending logic
    // You can use services like:
    // - Nodemailer with Gmail/SMTP
    // - SendGrid
    // - Mailgun
    // - Resend
    // - EmailJS (client-side)

    return res.status(200).json({ 
      success: true, 
      message: 'Заявка успешно отправлена!' 
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Произошла ошибка при отправке заявки. Попробуйте еще раз.' 
    });
  }
}
