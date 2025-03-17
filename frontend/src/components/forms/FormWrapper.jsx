import React from 'react';
import Button from '../common/Button';

const FormWrapper = ({
  children,
  title,
  onSubmit,
  onCancel,
  submitText = 'Enregistrer',
  cancelText = 'Annuler',
  loading = false
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {title && (
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div className="p-6">
          {children}
        </div>
        
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end space-x-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="px-4 py-2"
            >
              {cancelText}
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="px-4 py-2"
          >
            {loading ? 'Chargement...' : submitText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormWrapper;