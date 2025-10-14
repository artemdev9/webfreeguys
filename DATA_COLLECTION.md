# Simple Data Collection System

## How It Works
✅ **Form submissions are saved to a JSON file** (`form-submissions.json`)
✅ **Data persists permanently** - survives website updates and code changes
✅ **No email setup needed** - just collects and stores data
✅ **Easy to view collected data** via API endpoint

## What Happens When Someone Submits the Form:
1. Form data is validated (all required fields must be filled)
2. Data is saved to `form-submissions.json` with unique ID and timestamp
3. Data is logged to console for immediate visibility
4. User sees success message

## How to View Collected Data:

### Option 1: Via API Endpoint
Visit: `https://yourdomain.com/api/submissions`
- Shows all form submissions in JSON format
- Includes total count and all data

### Option 2: Via Vercel Dashboard
1. Go to Vercel Dashboard → Your Project → Functions
2. Click on the function logs to see real-time submissions
3. Each submission is logged with all details

### Option 3: Download JSON File
The data is stored in `form-submissions.json` in your project root

## Data Structure
Each submission includes:
```json
{
  "id": "unique-id",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "date": "15.01.2024, 10:30:00",
  "data": {
    "name": "Иван Иванов",
    "companyName": "ООО Ромашка",
    "businessType": "cafe",
    "socialLinks": "https://instagram.com/romashka",
    "websitePurpose": "Нужен сайт для кафе",
    "logoPhotos": "yes",
    "phone": "+7 (999) 123-45-67",
    "email": "ivan@romashka.ru",
    "supportPayment": "3500",
    "dataProcessing": "on"
  }
}
```

## Deployment
1. **Push your code** to git repository
2. **Vercel auto-deploys** and creates the API endpoints
3. **Start collecting data** immediately!

## Benefits
- ✅ **No external services** needed
- ✅ **Data never lost** - stored in your project
- ✅ **Easy to backup** - just copy the JSON file
- ✅ **Export to Excel/CSV** - convert JSON to spreadsheet
- ✅ **Works offline** - no email server dependencies

## Testing
1. Submit the form with all required fields
2. Check `https://yourdomain.com/api/submissions` to see the data
3. Check Vercel function logs for immediate confirmation
