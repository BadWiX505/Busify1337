import React from 'react';
import PropTypes from 'prop-types';

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6L18 18" />
    </svg>
  );
}

// ConfirmationPopUp component
const ConfirmationPopUp = ({ isOpen, onCancel, onConfirm, issueId, issueStatus }) => {
    if (!isOpen) return null;
  
    const handleCancel = () => {
      onCancel();
    };
  
    const handleConfirm = () => {
      // Check if issueId and issueStatus are correctly received
      console.log('Issue ID:', issueId);
      console.log('Issue Status:', issueStatus);
      onConfirm(issueId, issueStatus);
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md">
          <h2 className="text-xl font-bold mb-4">Confirm Issue Resolution</h2>
          <p className="mb-4">Are you sure you want to confirm the resolution of this issue?</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded-md flex items-center gap-1 hover:bg-gray-300"
            >
              <XIcon className="h-4 w-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleConfirm}
              className="px-2 py-1 bg-green-500 text-white text-sm rounded-md flex items-center gap-1 hover:bg-green-600"
            >
              <CheckIcon className="h-4 w-4" />
              <span>Confirm</span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Ensure propTypes are correctly defined
  ConfirmationPopUp.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    issueId: PropTypes.number.isRequired,
    issueStatus: PropTypes.string.isRequired,
  };
  
  
  export default ConfirmationPopUp;
  