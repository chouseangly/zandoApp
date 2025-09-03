
"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ChevronDown } from 'lucide-react';

// --- MOCK DATA ---
const initialProducts = [
    { id: 1, name: 'T-Shirt "Own The Run"', price: 46.52, status: 'Available', image: 'https://placehold.co/40x40/f1f5f9/334155?text=TS' },
    { id: 2, name: 'T-Shirt "Boxy Adicolor Classic"', price: 48.76, status: 'Out of stock', image: 'https://placehold.co/40x40/f1f5f9/334155?text=TS' },
    { id: 3, name: 'T-Shirt "Essentials 3-Stripes"', price: 48.00, status: 'Available', image: 'https://placehold.co/40x40/f1f5f9/334155?text=TS' },
    { id: 4, name: 'Tokyo Pack Short Sleeve Tee', price: 48.76, status: 'Active', image: 'https://placehold.co/40x40/f1f5f9/334155?text=TS' },
    { id: 5, name: 'Juventus Away Jersey 21/22', price: 66.18, status: 'Out of stock', image: 'https://placehold.co/40x40/f1f5f9/334155?text=JS' },
    { id: 6, name: 'T-Shirt "Own The Run" Unisex', price: 48.76, status: 'Active', image: 'https://placehold.co/40x40/f1f5f9/334155?text=TS' },
];

// --- HELPER & MODAL COMPONENTS ---

const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
    switch (status.toLowerCase()) {
        case 'available':
        case 'active':
            return <span className={`${baseClasses} bg-green-100 text-green-700`}>{status}</span>;
        case 'out of stock':
            return <span className={`${baseClasses} bg-red-100 text-red-700`}>{status}</span>;
        default:
            return <span className={`${baseClasses} bg-gray-100 text-gray-700`}>{status}</span>;
    }
};

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                </div>
                <div className="p-6">{children}</div>
                <div className="p-6 bg-gray-50 rounded-b-lg flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={onClose} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">Confirm</button>
                </div>
            </div>
        </div>
    );
};

const AddProductModal = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
        <p className="text-gray-600">Form to add a new product would go here.</p>
    </Modal>
);

const EditProductModal = ({ isOpen, onClose, product }) => (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit ${product?.name || 'Product'}`}>
        <p className="text-gray-600">Form to edit product details for "{product?.name}" would go here.</p>
    </Modal>
);

const DeleteConfirmationModal = ({ isOpen, onClose, product }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
        <p className="text-gray-600">Are you sure you want to delete the product "{product?.name}"? This action cannot be undone.</p>
    </Modal>
);

// --- PRODUCT CLIENT COMPONENT ---

const ProductClient = () => {
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        setProducts(initialProducts);
    }, []);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setEditModalOpen(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setDeleteModalOpen(true);
    };

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                    <h2 className="text-xl font-bold text-gray-800">Products</h2>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                            Most Sell <ChevronDown size={16} />
                        </button>
                        <button onClick={() => setAddModalOpen(true)} className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                            <Plus size={18} /> Add Product
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product, index) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={product.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900"><Edit size={18} /></button>
                                            <button onClick={() => handleDelete(product)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <AddProductModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
            {selectedProduct && <EditProductModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} product={selectedProduct} />}
            {selectedProduct && <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} product={selectedProduct} />}
        </>
    );
};

export default ProductClient;
