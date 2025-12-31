import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  lastSignInTime: string;
  creationTime: string;
  disabled: boolean;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, check for admin role here or in ProtectedRoute
    // For now, allow viewing if authenticated (API will block if not authorized)
    if (!user) return;

    const fetchUsers = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch('/api/admin/users?limit=100', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark-text mb-2">
            Admin Dashboard
          </h1>
          <p className="text-dark-text/70">
            Manage members and view signups
          </p>
        </div>
        <div className="bg-white px-6 py-4 rounded-wellness shadow-sm border border-neutral-base/50">
          <p className="text-sm text-dark-text/60 mb-1">Total Members (Recent)</p>
          <p className="text-3xl font-bold text-primary">{users.length}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-wellness border border-red-100">
          {error}
        </div>
      )}

      <div className="bg-white rounded-wellness shadow-sm overflow-hidden border border-neutral-base/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-base/50 border-b border-neutral-base">
              <tr>
                <th className="px-6 py-4 font-semibold text-dark-text text-sm">Member</th>
                <th className="px-6 py-4 font-semibold text-dark-text text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-dark-text text-sm">Joined</th>
                <th className="px-6 py-4 font-semibold text-dark-text text-sm">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-base">
              {users.map((member) => (
                <tr key={member.uid} className="hover:bg-neutral-base/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {member.photoURL ? (
                        <img 
                          src={member.photoURL} 
                          alt={member.displayName} 
                          className="w-10 h-10 rounded-full object-cover border border-neutral-base"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {member.email?.[0]?.toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-dark-text">{member.displayName || 'No Name'}</p>
                        <p className="text-sm text-dark-text/60">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.disabled 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {member.disabled ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-text/70">
                    {new Date(member.creationTime).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-text/70">
                    {new Date(member.lastSignInTime).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

