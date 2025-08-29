import React from 'react';
import { X } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, product, onProductDeleted }) => {

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/products/${product.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                onProductDeleted();
                onClose();
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Confirm Deletion</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>
                <p>Are you sure you want to delete the product "{product.name}"?</p>
                <div className="flex justify-end mt-4">
                    <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;