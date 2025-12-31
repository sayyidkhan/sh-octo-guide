const admin = require('firebase-admin');

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

const auth = admin.auth();

module.exports = async function handler(req, res) {
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
    // For now, we'll assume any valid user can access this
    // const isAdmin = decodedToken.role === 'admin' || decodedToken.email === 'your-admin-email@gmail.com';
    // if (!isAdmin) { return res.status(403).json({ error: 'Forbidden' }); }

    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        return await handleGetUsers(req, res);
      case 'POST':
        return await handleUserAction(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Admin API error:', error);
    return res.status(500).json({
      error: 'Failed to process request',
      message: error.message
    });
  }
};

async function handleGetUsers(req, res) {
  const limit = Number(req.query.limit) || 100;
  const nextPageToken = req.query.nextPageToken;

  // List users
  const listUsersResult = await auth.listUsers(limit, nextPageToken);
  
  // Fetch custom claims for each user to check admin status
  const usersWithClaims = await Promise.all(
    listUsersResult.users.map(async (user) => {
      try {
        const userRecord = await auth.getUser(user.uid);
        const customClaims = userRecord.customClaims || {};
        
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastSignInTime: user.metadata.lastSignInTime,
          creationTime: user.metadata.creationTime,
          disabled: user.disabled,
          isAdmin: customClaims.role === 'admin' || false,
          approved: customClaims.approved !== undefined ? customClaims.approved : false
        };
      } catch (err) {
        console.error(`Error fetching claims for user ${user.uid}:`, err);
        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastSignInTime: user.metadata.lastSignInTime,
          creationTime: user.metadata.creationTime,
          disabled: user.disabled,
          isAdmin: false,
          approved: false
        };
      }
    })
  );

  return res.status(200).json({
    users: usersWithClaims,
    pageToken: listUsersResult.pageToken,
    totalUsers: usersWithClaims.length
  });
}

async function handleUserAction(req, res) {
  const { action, uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  switch (action) {
    case 'disable':
      await auth.updateUser(uid, { disabled: true });
      return res.status(200).json({ success: true, message: 'User disabled' });

    case 'enable':
      await auth.updateUser(uid, { disabled: false });
      return res.status(200).json({ success: true, message: 'User enabled' });

    case 'delete':
      await auth.deleteUser(uid);
      return res.status(200).json({ success: true, message: 'User deleted' });

    case 'setAdmin':
      // Get current claims to preserve approved status
      const userForAdmin = await auth.getUser(uid);
      const currentClaimsAdmin = userForAdmin.customClaims || {};
      await auth.setCustomUserClaims(uid, { 
        role: 'admin',
        approved: currentClaimsAdmin.approved !== undefined ? currentClaimsAdmin.approved : true
      });
      return res.status(200).json({ success: true, message: 'User promoted to admin' });

    case 'removeAdmin':
      // Get current claims to preserve approved status
      const userForMember = await auth.getUser(uid);
      const currentClaimsMember = userForMember.customClaims || {};
      await auth.setCustomUserClaims(uid, { 
        role: 'member',
        approved: currentClaimsMember.approved !== undefined ? currentClaimsMember.approved : false
      });
      return res.status(200).json({ success: true, message: 'Admin privileges removed' });

    case 'approve':
      // Get current claims to preserve role
      const userForApprove = await auth.getUser(uid);
      const currentClaimsApprove = userForApprove.customClaims || {};
      await auth.setCustomUserClaims(uid, { 
        role: currentClaimsApprove.role || 'member',
        approved: true
      });
      return res.status(200).json({ success: true, message: 'User approved' });

    case 'reject':
      // Get current claims to preserve role
      const userForReject = await auth.getUser(uid);
      const currentClaimsReject = userForReject.customClaims || {};
      await auth.setCustomUserClaims(uid, { 
        role: currentClaimsReject.role || 'member',
        approved: false
      });
      return res.status(200).json({ success: true, message: 'User approval revoked' });

    default:
      return res.status(400).json({ error: 'Invalid action' });
  }
}
