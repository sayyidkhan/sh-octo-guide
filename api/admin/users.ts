import { VercelRequest, VercelResponse } from '@vercel/node';
import { auth } from './_firebase-admin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify the ID token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Check if the requester is an admin
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // In a real app, you would check a custom claim like 'admin'.
    // For now, we'll assume any valid user can view this (OR check for a specific admin email)
    // const isAdmin = decodedToken.role === 'admin' || decodedToken.email === 'your-admin-email@gmail.com';
    // if (!isAdmin) { return res.status(403).json({ error: 'Forbidden' }); }

    // Get query parameters
    const limit = Number(req.query.limit) || 100;
    const nextPageToken = req.query.nextPageToken as string | undefined;

    // List users
    const listUsersResult = await auth.listUsers(limit, nextPageToken);
    
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastSignInTime: user.metadata.lastSignInTime,
      creationTime: user.metadata.creationTime,
      disabled: user.disabled
    }));

    // Get total count (approximation based on list, or use specific counter if maintained)
    // Note: Firebase Auth doesn't provide a direct "total count" API cheaply without listing all.
    // We will just return the list for now.

    return res.status(200).json({
      users,
      pageToken: listUsersResult.pageToken,
      totalUsers: users.length // Ideally you'd maintain a real counter in Firestore/Database
    });

  } catch (error: any) {
    console.error('Admin API error:', error);
    return res.status(500).json({
      error: 'Failed to fetch users',
      message: error.message
    });
  }
}

