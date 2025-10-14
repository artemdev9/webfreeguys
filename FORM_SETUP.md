# Form Email Setup Instructions

## Overview
The form is now configured to send data to email via Vercel serverless functions. There are two versions:

1. **`/api/contact.js`** - Basic version that logs form data (for testing)
2. **`/api/contact-with-email.js`** - Full version that sends actual emails

## Setup for Email Sending

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables in Vercel
Go to your Vercel dashboard → Project Settings → Environment Variables and add:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=where-to-receive-forms@yourdomain.com
```

### 3. Gmail Setup (if using Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password" for this application
3. Use the app password (not your regular password) in `EMAIL_PASS`

### 4. Switch to Email Version
To use the actual email sending version, rename the files:
```bash
mv api/contact.js api/contact-basic.js
mv api/contact-with-email.js api/contact.js
```

## Form Validation Features

✅ **Client-side validation** - Prevents submission with empty required fields
✅ **Real-time validation** - Shows errors as user types
✅ **Visual feedback** - Red borders for invalid fields
✅ **Success/error messages** - Clear feedback to users
✅ **Button state management** - Disabled during submission
✅ **Form reset** - Clears form after successful submission

## Required Fields
- Name (Ваше имя)
- Company Name (Название компании)
- Business Type (Сфера деятельности)
- Website Purpose (Почему вам нужен сайт?)
- Logo/Content Status (Есть ли у вас логотип)
- Phone (Телефон)
- Support Payment (Готовность платить за поддержку)
- Data Processing Agreement (Согласие на обработку данных)

## Optional Fields
- Social Links (Соцсети/карты)
- Email (Email)

## Testing
1. Try submitting with empty fields - should show validation errors
2. Fill all required fields - should submit successfully
3. Check Vercel function logs for form data
4. Check your email for received forms (if using email version)

## Troubleshooting
- Check Vercel function logs in the dashboard
- Verify environment variables are set correctly
- Test with the basic version first (logs to console)
- Check Gmail app password if using Gmail
