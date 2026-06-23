import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOpportunities } from '../services/api';
import { useAuth } from '../context/AuthContext';
import OpportunityCard from '../components/OpportunityCard';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch all opportunities when page loads
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const { data } = await getOpportunities();
        setOpportunities(data);
        setFiltered(data);
      } catch (err) {
        setError('Failed to load opportunities');
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  // Apply filters whenever filter values or opportunities change
  useEffect(() => {
    let result = [...opportunities];

    if (stageFilter !== 'All') {
      result = result.filter((o) => o.stage === stageFilter);
    }
    if (priorityFilter !== 'All') {
      result = result.filter((o) => o.priority === priorityFilter);
    }
    if (searchQuery) {
      result = result.filter((o) =>
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.requirement.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFiltered(result);
  }, [stageFilter, priorityFilter, searchQuery, opportunities]);

  // Called by OpportunityCard after successful delete
  const handleDelete = (id) => {
    setOpportunities((prev) => prev.filter((o) => o._id !== id));
  };

  // Summary calculations for stat cards
  const totalValue = opportunities.reduce((sum, o) => sum + (o.estimatedValue || 0), 0);
  const wonValue = opportunities
    .filter((o) => o.stage === 'Won')
    .reduce((sum, o) => sum + (o.estimatedValue || 0), 0);
  const highPriority = opportunities.filter((o) => o.priority === 'High').length;
  const myOpportunities = opportunities.filter((o) => o.owner?._id === user?._id).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center 
                        justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Opportunity Pipeline
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Track and manage all your sales opportunities
            </p>
          </div>
          <button
            onClick={() => navigate('/opportunities/create')}
            className="bg-indigo-600 text-white px-4 py-2.5
                       rounded-lg font-semibold text-sm
                       hover:bg-indigo-700 transition duration-200
                       flex items-center gap-2 self-start sm:self-auto"
          >
            + New Opportunity
          </button>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Total Pipeline</p>
            <p className="text-lg sm:text-xl font-bold text-indigo-600">
              ₹{totalValue.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {opportunities.length} opportunities
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Won Value</p>
            <p className="text-lg sm:text-xl font-bold text-green-600">
              ₹{wonValue.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {opportunities.filter((o) => o.stage === 'Won').length} deals won
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">High Priority</p>
            <p className="text-lg sm:text-xl font-bold text-red-600">
              {highPriority}
            </p>
            <p className="text-xs text-gray-400 mt-1">need attention</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">My Opportunities</p>
            <p className="text-lg sm:text-xl font-bold text-purple-600">
              {myOpportunities}
            </p>
            <p className="text-xs text-gray-400 mt-1">created by you</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="🔍 Search by company or requirement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                         text-sm focus:outline-none focus:ring-2
                         focus:ring-indigo-500 focus:border-transparent"
            />

            {/* Stage Filter */}
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg
                         text-sm focus:outline-none focus:ring-2
                         focus:ring-indigo-500 bg-white"
            >
              <option value="All">All Stages</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg
                         text-sm focus:outline-none focus:ring-2
                         focus:ring-indigo-500 bg-white"
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200
                          rounded-lg px-4 py-3 mb-6 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <svg className="animate-spin h-8 w-8 text-indigo-600"
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <span className="ml-3 text-gray-500">Loading opportunities...</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No opportunities found
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {opportunities.length === 0
                ? 'Start by creating your first opportunity!'
                : 'Try changing your filters'}
            </p>
            {opportunities.length === 0 && (
              <button
                onClick={() => navigate('/opportunities/create')}
                className="bg-indigo-600 text-white px-6 py-2.5
                           rounded-lg font-semibold text-sm
                           hover:bg-indigo-700 transition duration-200"
              >
                + Create First Opportunity
              </button>
            )}
          </div>
        )}

        {/* Opportunities Grid */}
        {!loading && filtered.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Showing {filtered.length} of {opportunities.length} opportunities
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((opportunity) => (
                <OpportunityCard
                  key={opportunity._id}
                  opportunity={opportunity}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;