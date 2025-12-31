import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  lastSignInTime: string;
  creationTime: string;
  disabled: boolean;
  isAdmin: boolean;
  approved: boolean;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMockData, setIsMockData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageToken, setPageToken] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'member'>('all');
  const [joinedFilter, setJoinedFilter] = useState<'all' | '7days' | '30days' | '90days'>('all');
  const [lastActiveFilter, setLastActiveFilter] = useState<'all' | '7days' | '30days' | '90days' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'joined' | 'lastActive' | 'name'>('joined');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const pendingMembersCount = users.filter((u) => !u.approved).length;
  const totalMembersCount = users.length;
  const totalAdminsCount = users.filter((u) => u.isAdmin).length;

  useEffect(() => {
    if (!user) return;
    fetchUsers();
  }, [user]);

  useEffect(() => {
    // Filter and sort users
    let filtered = [...users];
    const now = Date.now();

    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.displayName?.toLowerCase().includes(query) ||
          u.email?.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter === 'active') {
      filtered = filtered.filter(u => !u.disabled);
    } else if (statusFilter === 'blocked') {
      filtered = filtered.filter(u => u.disabled);
    }

    // Apply role filter
    if (roleFilter === 'admin') {
      filtered = filtered.filter(u => u.isAdmin);
    } else if (roleFilter === 'member') {
      filtered = filtered.filter(u => !u.isAdmin);
    }

    // Apply joined date filter
    if (joinedFilter !== 'all') {
      const daysMap = { '7days': 7, '30days': 30, '90days': 90 };
      const days = daysMap[joinedFilter];
      const cutoffDate = now - (days * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(u => new Date(u.creationTime).getTime() >= cutoffDate);
    }

    // Apply last active filter
    if (lastActiveFilter !== 'all') {
      if (lastActiveFilter === 'inactive') {
        // Inactive = not active in last 90 days
        const cutoffDate = now - (90 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(u => new Date(u.lastSignInTime).getTime() < cutoffDate);
      } else {
        const daysMap = { '7days': 7, '30days': 30, '90days': 90 };
        const days = daysMap[lastActiveFilter];
        const cutoffDate = now - (days * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(u => new Date(u.lastSignInTime).getTime() >= cutoffDate);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'joined') {
        comparison = new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime();
      } else if (sortBy === 'lastActive') {
        comparison = new Date(a.lastSignInTime).getTime() - new Date(b.lastSignInTime).getTime();
      } else if (sortBy === 'name') {
        comparison = (a.displayName || a.email || '').localeCompare(b.displayName || b.email || '');
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    // Apply tab filter (pending vs all)
    if (activeTab === 'pending') {
      filtered = filtered.filter(u => !u.approved);
    }

    setFilteredUsers(filtered);
  }, [searchQuery, users, statusFilter, roleFilter, joinedFilter, lastActiveFilter, sortBy, sortOrder, activeTab]);

  const fetchUsers = async (nextPageToken?: string) => {
    try {
      setError(null);
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) throw new Error('Not authenticated');

      const token = await firebaseUser.getIdToken();
      const url = `/api/admin/users?limit=100${nextPageToken ? `&nextPageToken=${nextPageToken}` : ''}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType || !contentType.includes("application/json")) {
        throw new Error('Backend not available locally');
      }

      const data = await response.json();
      setUsers(data.users);
      setPageToken(data.pageToken);
      setIsMockData(false);
    } catch (err: any) {
      const message = err?.message || 'Failed to load users';

      if (message === 'Backend not available locally') {
        console.warn("Falling back to mock data:", err);
        setIsMockData(true);
      } else {
        setError(message);
        setIsMockData(false);
      }

      setUsers([
        {
          uid: '1',
          email: 'admin@example.com',
          displayName: 'Admin User',
          photoURL: '',
          lastSignInTime: new Date().toISOString(),
          creationTime: new Date().toISOString(),
          disabled: false,
          isAdmin: true,
          approved: true
        },
        {
          uid: '2',
          email: 'member@example.com',
          displayName: 'Test Member',
          photoURL: '',
          lastSignInTime: new Date(Date.now() - 86400000).toISOString(),
          creationTime: new Date(Date.now() - 172800000).toISOString(),
          disabled: false,
          isAdmin: false,
          approved: true
        },
        {
          uid: '3',
          email: 'blocked@example.com',
          displayName: 'Blocked User',
          photoURL: '',
          lastSignInTime: new Date(Date.now() - 100000000).toISOString(),
          creationTime: new Date(Date.now() - 200000000).toISOString(),
          disabled: true,
          isAdmin: false,
          approved: true
        },
        {
          uid: '4',
          email: 'pending@example.com',
          displayName: 'Pending User',
          photoURL: '',
          lastSignInTime: new Date(Date.now() - 3600000).toISOString(),
          creationTime: new Date(Date.now() - 3600000).toISOString(),
          disabled: false,
          isAdmin: false,
          approved: false
        },
        {
          uid: '5',
          email: 'pending2@example.com',
          displayName: 'Another Pending',
          photoURL: '',
          lastSignInTime: new Date(Date.now() - 7200000).toISOString(),
          creationTime: new Date(Date.now() - 7200000).toISOString(),
          disabled: false,
          isAdmin: false,
          approved: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (uid: string, action: 'disable' | 'enable' | 'delete' | 'setAdmin' | 'removeAdmin' | 'approve' | 'reject') => {
    if (action === 'delete' && !confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    if (action === 'removeAdmin' && !confirm('Are you sure you want to remove admin privileges from this user?')) {
      return;
    }

    if (action === 'reject' && !confirm('Are you sure you want to reject this user? They will not be able to access member content.')) {
      return;
    }

    try {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) throw new Error('Not authenticated');

      const token = await firebaseUser.getIdToken();
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action, uid })
      });

      if (!response.ok) {
        throw new Error('Failed to perform action');
      }

      // Refresh the user list
      await fetchUsers();
      
      const actionMessages: Record<string, string> = {
        disable: 'User blocked successfully',
        enable: 'User enabled successfully',
        delete: 'User deleted successfully',
        setAdmin: 'User promoted to admin',
        removeAdmin: 'Admin privileges removed',
        approve: 'User approved successfully',
        reject: 'User approval revoked'
      };
      
      alert(actionMessages[action] || 'Action completed');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark-text mb-2">
            Admin Dashboard
          </h1>
          <p className="text-dark-text/70">
            Manage members and view signups
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Pending Members Card */}
          <div className="bg-white px-6 py-4 rounded-wellness shadow-sm border border-neutral-base/50 min-w-[160px]">
            <p className="text-sm text-dark-text/60 mb-1">Pending Members</p>
            <p className={`text-3xl font-bold ${pendingMembersCount === 0 ? 'text-dark-text/60' : 'text-orange-600'}`}>
              {pendingMembersCount}
            </p>
          </div>

          {/* Total Admins Card */}
          <div className="bg-white px-6 py-4 rounded-wellness shadow-sm border border-neutral-base/50 min-w-[160px]">
            <p className="text-sm text-dark-text/60 mb-1">Total Admins</p>
            <p className="text-3xl font-bold text-accent">
              {totalAdminsCount}
            </p>
          </div>

          {/* Total Members Card */}
          <div className="bg-white px-6 py-4 rounded-wellness shadow-sm border border-neutral-base/50 min-w-[160px]">
            <p className="text-sm text-dark-text/60 mb-1">Total Members</p>
            <p className="text-3xl font-bold text-primary">
              {totalMembersCount}
            </p>
          </div>
        </div>
      </div>

      {(error || isMockData) && (
        <div className={`p-4 rounded-wellness border ${isMockData ? 'bg-yellow-50 border-yellow-100 text-yellow-800' : 'bg-red-50 border-red-100 text-red-600'}`}>
          {isMockData 
            ? '⚠️ Running in Local/Mock Mode. Backend functions require "vercel dev" to work. Displaying sample data.' 
            : error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-neutral-base/50">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 font-medium text-sm transition-colors cursor-pointer relative ${
              activeTab === 'pending'
                ? 'text-primary border-b-2 border-primary'
                : 'text-dark-text/60 hover:text-dark-text'
            }`}
          >
            Pending Approvals
            {users.filter(u => !u.approved).length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-accent rounded-full">
                {users.filter(u => !u.approved).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 font-medium text-sm transition-colors cursor-pointer relative ${
              activeTab === 'all'
                ? 'text-primary border-b-2 border-primary'
                : 'text-dark-text/60 hover:text-dark-text'
            }`}
          >
            All Members
            <span className="ml-2 text-xs text-dark-text/50">
              ({users.length})
            </span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-wellness shadow-sm border border-neutral-base/50 p-4 space-y-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Status Filter */}
          <div>
            <label className="block text-xs font-medium text-dark-text/70 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-neutral-base rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="blocked">Blocked Only</option>
            </select>
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-xs font-medium text-dark-text/70 mb-1">Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-neutral-base rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins Only</option>
              <option value="member">Members Only</option>
            </select>
          </div>

          {/* Joined Filter */}
          <div>
            <label className="block text-xs font-medium text-dark-text/70 mb-1">Joined</label>
            <select
              value={joinedFilter}
              onChange={(e) => setJoinedFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-neutral-base rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>

          {/* Last Active Filter */}
          <div>
            <label className="block text-xs font-medium text-dark-text/70 mb-1">Last Active</label>
            <select
              value={lastActiveFilter}
              onChange={(e) => setLastActiveFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-neutral-base rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="inactive">Inactive (90+ days)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-medium text-dark-text/70 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-neutral-base rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              <option value="joined">Joined Date</option>
              <option value="lastActive">Last Active</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-xs font-medium text-dark-text/70 mb-1">Order</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="w-full px-3 py-2 border border-neutral-base rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(searchQuery || statusFilter !== 'all' || roleFilter !== 'all' || joinedFilter !== 'all' || lastActiveFilter !== 'all') && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-base/50">
            <span className="text-xs text-dark-text/60">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-primary/70">×</button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter('all')} className="hover:text-primary/70">×</button>
              </span>
            )}
            {roleFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                Role: {roleFilter}
                <button onClick={() => setRoleFilter('all')} className="hover:text-primary/70">×</button>
              </span>
            )}
            {joinedFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                Joined: {joinedFilter.replace('days', ' days')}
                <button onClick={() => setJoinedFilter('all')} className="hover:text-primary/70">×</button>
              </span>
            )}
            {lastActiveFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                Active: {lastActiveFilter === 'inactive' ? 'Inactive (90+ days)' : lastActiveFilter.replace('days', ' days')}
                <button onClick={() => setLastActiveFilter('all')} className="hover:text-primary/70">×</button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setRoleFilter('all');
                setJoinedFilter('all');
                setLastActiveFilter('all');
              }}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Desktop Table View - Hidden on Mobile */}
      <div className="hidden md:block bg-white rounded-wellness shadow-sm overflow-hidden border border-neutral-base/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-base/50 border-b border-neutral-base">
              <tr>
                <th className="px-6 py-4 font-semibold text-dark-text text-sm">Member</th>
                <th className="px-6 py-4 font-semibold text-dark-text text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-dark-text text-sm">Is Admin</th>
                <th className="px-6 py-4 font-semibold text-dark-text text-sm">Joined</th>
                <th className="px-6 py-4 font-semibold text-dark-text text-sm">Last Active</th>
                <th className="px-6 py-4 font-semibold text-dark-text text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-base">
              {filteredUsers.map((member) => (
                <tr key={member.uid} className="hover:bg-neutral-base/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar member={member} />
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
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.isAdmin
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.isAdmin ? '👑 Admin' : 'Member'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-text/70">
                    {new Date(member.creationTime).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-dark-text/70">
                    {new Date(member.lastSignInTime).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {!member.approved ? (
                        <>
                          {/* Pending user - show approve/reject */}
                          <button
                            onClick={() => handleUserAction(member.uid, 'approve')}
                            className="px-3 py-1 text-xs font-medium text-white bg-primary hover:bg-primary/90 rounded transition-colors cursor-pointer"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleUserAction(member.uid, 'reject')}
                            className="px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded hover:bg-red-100 transition-colors cursor-pointer"
                          >
                            ✗ Reject
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Approved user - show standard actions */}
                          {member.disabled ? (
                            <button
                              onClick={() => handleUserAction(member.uid, 'enable')}
                              className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded hover:bg-green-100 transition-colors cursor-pointer"
                            >
                              Enable
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUserAction(member.uid, 'disable')}
                              className="px-3 py-1 text-xs font-medium text-orange-700 bg-orange-50 rounded hover:bg-orange-100 transition-colors cursor-pointer"
                            >
                              Block
                            </button>
                          )}
                          
                          {member.isAdmin ? (
                            <button
                              onClick={() => handleUserAction(member.uid, 'removeAdmin')}
                              className="px-3 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded hover:bg-purple-100 transition-colors cursor-pointer"
                            >
                              Demote
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUserAction(member.uid, 'setAdmin')}
                              className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100 transition-colors cursor-pointer"
                            >
                              Make Admin
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleUserAction(member.uid, 'delete')}
                            className="px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded hover:bg-red-100 transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View - Visible Only on Mobile */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((member) => (
          <div key={member.uid} className="bg-white rounded-wellness shadow-sm border border-neutral-base/50 p-4">
            {/* Header with Avatar and Name */}
            <div className="flex items-start gap-3 mb-4">
              <UserAvatar member={member} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-dark-text truncate">{member.displayName || 'No Name'}</p>
                <p className="text-sm text-dark-text/60 truncate">{member.email}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                member.disabled 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {member.disabled ? 'Blocked' : 'Active'}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                member.isAdmin
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {member.isAdmin ? '👑 Admin' : 'Member'}
              </span>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-dark-text/60 text-xs mb-1">Joined</p>
                <p className="text-dark-text">{new Date(member.creationTime).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-dark-text/60 text-xs mb-1">Last Active</p>
                <p className="text-dark-text">{new Date(member.lastSignInTime).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-base">
              {!member.approved ? (
                <>
                  {/* Pending user - show approve/reject */}
                  <button
                    onClick={() => handleUserAction(member.uid, 'approve')}
                    className="flex-1 px-3 py-2 text-xs font-medium text-white bg-primary hover:bg-primary/90 rounded transition-colors cursor-pointer"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleUserAction(member.uid, 'reject')}
                    className="flex-1 px-3 py-2 text-xs font-medium text-red-700 bg-red-50 rounded hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    ✗ Reject
                  </button>
                </>
              ) : (
                <>
                  {/* Approved user - show standard actions */}
                  {member.disabled ? (
                    <button
                      onClick={() => handleUserAction(member.uid, 'enable')}
                      className="flex-1 px-3 py-2 text-xs font-medium text-green-700 bg-green-50 rounded hover:bg-green-100 transition-colors cursor-pointer"
                    >
                      Enable
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUserAction(member.uid, 'disable')}
                      className="flex-1 px-3 py-2 text-xs font-medium text-orange-700 bg-orange-50 rounded hover:bg-orange-100 transition-colors cursor-pointer"
                    >
                      Block
                    </button>
                  )}
                  
                  {member.isAdmin ? (
                    <button
                      onClick={() => handleUserAction(member.uid, 'removeAdmin')}
                      className="flex-1 px-3 py-2 text-xs font-medium text-purple-700 bg-purple-50 rounded hover:bg-purple-100 transition-colors cursor-pointer"
                    >
                      Demote
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUserAction(member.uid, 'setAdmin')}
                      className="flex-1 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      Make Admin
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleUserAction(member.uid, 'delete')}
                    className="w-full px-3 py-2 text-xs font-medium text-red-700 bg-red-50 rounded hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    Delete Account
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pageToken && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchUsers(pageToken)}
            className="px-6 py-2 bg-primary text-white rounded-wellness hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

function UserAvatar({ member }: { member: UserData }) {
  const [imageError, setImageError] = useState(false);
  
  const getInitials = () => {
    if (member.displayName) {
      const names = member.displayName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return member.displayName.substring(0, 2).toUpperCase();
    }
    return member.email?.[0]?.toUpperCase() || '?';
  };

  if (!member.photoURL || imageError) {
    return (
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
        {getInitials()}
      </div>
    );
  }

  return (
    <img 
      src={member.photoURL} 
      alt={member.displayName} 
      className="w-10 h-10 rounded-full object-cover border border-neutral-base"
      onError={() => setImageError(true)}
    />
  );
}
