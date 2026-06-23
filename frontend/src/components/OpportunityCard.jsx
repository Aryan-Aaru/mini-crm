import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { deleteOpportunity } from '../services/api';

// Color mappings for stage badges
const stageColors = {
  'New': 'bg-blue-100 text-blue-700',
  'Contacted': 'bg-yellow-100 text-yellow-700',
  'Qualified': 'bg-purple-100 text-purple-700',
  'Proposal Sent': 'bg-orange-100 text-orange-700',
  'Won': 'bg-green-100 text-green-700',
  'Lost': 'bg-red-100 text-red-700',
};

// Color mappings for priority badges
const priorityColors = {
  'Low': 'bg-gray-100 text-gray-600',
  'Medium': 'bg-yellow-100 text-yellow-700',
  'High': 'bg-red-100 text-red-700',
};

const OpportunityCard = ({ opportunity, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if logged in user is the owner of this opportunity
  const isOwner = user?._id === opportunity.owner?._id;

  const handleDelete = async () => {
    // Confirm before deleting
    if (!window.confirm('Are you sure you want to delete this opportunity?')) return;

    try {
      await deleteOpportunity(opportunity._id);
      onDelete(opportunity._id); // tell Dashboard to remove this card
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete opportunity');
    }
  };

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100
                    p-4 sm:p-6 hover:shadow-md transition duration-200">

      {/* Card Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {opportunity.customerName}
          </h3>
          {opportunity.contactName && (
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              👤 {opportunity.contactName}
            </p>
          )}
        </div>

        {/* Deal Value */}
        <div className="text-right shrink-0">
          <p className="text-base sm:text-lg font-bold text-indigo-600">
            ₹{opportunity.estimatedValue?.toLocaleString('en-IN') || 0}
          </p>
          <p className="text-xs text-gray-400">Est. Value</p>
        </div>
      </div>

      {/* Requirement */}
      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
        📋 {opportunity.requirement}
      </p>

      {/* Stage and Priority Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full 
                         ${stageColors[opportunity.stage]}`}>
          {opportunity.stage}
        </span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full 
                         ${priorityColors[opportunity.priority]}`}>
          {opportunity.priority} Priority
        </span>
      </div>

      {/* Follow Up Date and Created By */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 
                      text-xs text-gray-500">
        <span>📅 Follow up: {formatDate(opportunity.nextFollowUpDate)}</span>
        <span>🕒 {formatDate(opportunity.createdAt)}</span>
        <span>👨‍💼 {opportunity.owner?.name}</span>
      </div>

      {/* Action Buttons - only show if user is owner */}
      {isOwner && (
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <button
            onClick={() => navigate(`/opportunities/edit/${opportunity._id}`)}
            className="flex-1 py-1.5 text-xs sm:text-sm font-medium
                       text-indigo-600 border border-indigo-300
                       rounded-lg hover:bg-indigo-50
                       transition duration-200"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 py-1.5 text-xs sm:text-sm font-medium
                       text-red-600 border border-red-300
                       rounded-lg hover:bg-red-50
                       transition duration-200"
          >
            🗑️ Delete
          </button>
        </div>
      )}

      {/* Show "not yours" label for other people's opportunities */}
      {!isOwner && (
        <div className="pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400 italic">
            Created by {opportunity.owner?.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default OpportunityCard;