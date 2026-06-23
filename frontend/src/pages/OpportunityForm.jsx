import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createOpportunity,
  updateOpportunity,
  getOpportunityById,
} from '../services/api';
import Navbar from '../components/Navbar';

const OpportunityForm = () => {
  const { id } = useParams(); // if ID exists in URL = edit mode
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [error, setError] = useState('');

  // Form fields state
  const [formData, setFormData] = useState({
    customerName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    requirement: '',
    estimatedValue: '',
    stage: 'New',
    priority: 'Medium',
    nextFollowUpDate: '',
    notes: '',
  });

  // If edit mode, fetch existing opportunity data
  useEffect(() => {
    if (isEditMode) {
      const fetchOpportunity = async () => {
        try {
          const { data } = await getOpportunityById(id);
          setFormData({
            customerName: data.customerName || '',
            contactName: data.contactName || '',
            contactEmail: data.contactEmail || '',
            contactPhone: data.contactPhone || '',
            requirement: data.requirement || '',
            estimatedValue: data.estimatedValue || '',
            stage: data.stage || 'New',
            priority: data.priority || 'Medium',
            // Format date for input field
            nextFollowUpDate: data.nextFollowUpDate
              ? new Date(data.nextFollowUpDate).toISOString().split('T')[0]
              : '',
            notes: data.notes || '',
          });
        } catch (err) {
          setError('Failed to load opportunity');
        } finally {
          setFetchLoading(false);
        }
      };
      fetchOpportunity();
    }
  }, [id, isEditMode]);

  // Handle input changes for all fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode) {
        await updateOpportunity(id, formData);
      } else {
        await createOpportunity(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while fetching data in edit mode
  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-indigo-600"
               xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10"
                    stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <span className="ml-3 text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {isEditMode ? '✏️ Edit Opportunity' : '➕ New Opportunity'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isEditMode
              ? 'Update the opportunity details below'
              : 'Fill in the details to create a new opportunity'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200
                          rounded-lg px-4 py-3 mb-6 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Section: Customer Info */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase 
                             tracking-wide mb-4 pb-2 border-b border-gray-100">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Customer Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer / Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. Acme Corporation"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                               text-sm focus:outline-none focus:ring-2
                               focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                               text-sm focus:outline-none focus:ring-2
                               focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="contact@company.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                               text-sm focus:outline-none focus:ring-2
                               focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                               text-sm focus:outline-none focus:ring-2
                               focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Section: Opportunity Details */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase
                             tracking-wide mb-4 pb-2 border-b border-gray-100">
                Opportunity Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Requirement */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requirement / Need Summary <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="Briefly describe what the customer needs..."
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                               text-sm focus:outline-none focus:ring-2
                               focus:ring-indigo-500 focus:border-transparent
                               resize-none"
                  />
                </div>

                {/* Estimated Value */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Deal Value (₹)
                  </label>
                  <input
                    type="number"
                    name="estimatedValue"
                    value={formData.estimatedValue}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                               text-sm focus:outline-none focus:ring-2
                               focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Next Follow Up Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Next Follow Up Date
                  </label>
                  <input
                    type="date"
                    name="nextFollowUpDate"
                    value={formData.nextFollowUpDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                               text-sm focus:outline-none focus:ring-2
                               focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Stage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stage
                  </label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                               text-sm focus:outline-none focus:ring-2
                               focus:ring-indigo-500 bg-white"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                               text-sm focus:outline-none focus:ring-2
                               focus:ring-indigo-500 bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any additional notes about this opportunity..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
                               text-sm focus:outline-none focus:ring-2
                               focus:ring-indigo-500 focus:border-transparent
                               resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 rounded-lg text-white font-semibold text-sm
                           transition-colors duration-200
                           ${loading
                             ? 'bg-indigo-300 cursor-not-allowed'
                             : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                           }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10"
                              stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    {isEditMode ? 'Updating...' : 'Creating...'}
                  </span>
                ) : (
                  isEditMode ? 'Update Opportunity' : 'Create Opportunity'
                )}
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 rounded-lg font-semibold text-sm
                           text-gray-600 border border-gray-300
                           hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OpportunityForm;