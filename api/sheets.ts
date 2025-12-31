import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

// Get environment variables
const SHEETS_CDN_TTL = parseInt(process.env.SHEETS_CDN_TTL_SECONDS || '604800', 10); // 7 days default
const STALE_WHILE_REVALIDATE = parseInt(process.env.SHEETS_CDN_STALE_WHILE_REVALIDATE_SECONDS || '86400', 10); // 1 day default

interface SheetsData {
  testimonials: any[];
  contentLibrary: any[];
  access: any[];
  lastUpdated: string;
}

// Initialize Google Sheets API
function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return google.sheets({ version: 'v4', auth });
}

// Fetch data from Google Sheets
async function fetchSheetsData(): Promise<SheetsData> {
  const sheets = getGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID not configured');
  }

  try {
    // Fetch all ranges in parallel
    const [testimonials, contentLibrary, access] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: process.env.GOOGLE_SHEETS_RANGE_TESTIMONIALS || 'Testimonials!A:Z',
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: process.env.GOOGLE_SHEETS_RANGE_CONTENT_LIBRARY || 'ContentLibrary!A:Z',
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: process.env.GOOGLE_SHEETS_RANGE_ACCESS || 'Access!A:Z',
      }),
    ]);

    return {
      testimonials: testimonials.data.values || [],
      contentLibrary: contentLibrary.data.values || [],
      access: access.data.values || [],
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching sheets data:', error);
    throw error;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch data from Google Sheets
    const data = await fetchSheetsData();

    // Set CDN cache headers
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${SHEETS_CDN_TTL}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`
    );

    // Return the data
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('Sheets API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch content',
      message: error.message,
    });
  }
}

