

const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-5xl font-bold text-green-600 mt-4">1,284</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-600">Blocked Users</h3>
          <p className="text-5xl font-bold text-red-600 mt-4">23</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-600">Active Scans Today</h3>
          <p className="text-5xl font-bold text-blue-600 mt-4">347</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;