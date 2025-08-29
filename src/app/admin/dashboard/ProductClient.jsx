"use client";
import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '@/services/allProduct.service';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Plus, Edit, Trash2 } from 'lucide-react';

const ProductClient = () => {
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const products = await fetchAllProducts();
        setProducts(products);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setEditModalOpen(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setDeleteModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={() => setAddModalOpen(true)} className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <Plus size={18} />
                    Add Product
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="w-1/3 text-left py-3 px-4">{product.name}</td>
                                <td className="w-1/3 text-left py-3 px-4">${product.price.toFixed(2)}</td>
                                <td className="text-left py-3 px-4">
                                    <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-700 mr-4">
                                        <Edit size={20} />
                                    </button>
                                    <button onClick={() => handleDelete(product)} className="text-red-500 hover:text-red-700">
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onProductAdded={loadProducts}
            />

            {selectedProduct && (
                <EditProductModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    product={selectedProduct}
                    onProductUpdated={loadProducts}
                />
            )}

            {selectedProduct && (
                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    product={selectedProduct}
                    onProductDeleted={loadProducts}
                />
            )}
        </div>
    );
};

export default ProductClient;