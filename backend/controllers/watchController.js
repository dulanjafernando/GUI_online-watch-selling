const Watch = require('../models/Watch');

// Get all watches
const getAllWatches = async (req, res) => {
    try {
        const watches = await Watch.getAll();
        res.status(200).json(watches);
    } catch (error) {
        console.error('Error fetching watches:', error);
        res.status(500).json({ message: 'Error fetching watches' });
    }
};

// Get watch by ID
const getWatchById = async (req, res) => {
    try {
        const { id } = req.params;
        const watch = await Watch.getById(id);
        
        if (!watch) {
            return res.status(404).json({ message: 'Watch not found' });
        }
        
        res.status(200).json(watch);
    } catch (error) {
        console.error('Error fetching watch:', error);
        res.status(500).json({ message: 'Error fetching watch' });
    }
};

// Add a new watch (Admin only)
const addWatch = async (req, res) => {
    try {
        const { name, price, discount, description, category, available } = req.body;

        // Validate input fields
        if (!name || !price || !description || !category || available === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate if a file was uploaded
        let imagePath = '';
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        } else {
            return res.status(400).json({ message: 'Image file is required' });
        }

        // Create watch
        const watch = await Watch.create(name, imagePath, price, discount || 0, description, category, available);

        res.status(201).json({
            message: 'Watch added successfully',
            watch: watch,
            imageUrl: imagePath
        });
    } catch (error) {
        console.error('Error adding watch:', error);
        res.status(500).json({ message: 'Error adding watch' });
    }
};

// Update watch (Admin only)
const updateWatch = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, discount, description, category, available, existingImage } = req.body;

        // Validate input
        if (!name || !price || !description || !category || available === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if watch exists
        const watch = await Watch.getById(id);
        if (!watch) {
            return res.status(404).json({ message: 'Watch not found' });
        }

        // Handle image update logic
        let imagePath = existingImage; // If no new image is uploaded, use the existing one
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`; // If a new image is uploaded, use the new image
        }

        // Update watch
        await Watch.update(id, name, imagePath, price, discount || 0, description, category, available);

        res.status(200).json({
            message: 'Watch updated successfully',
            imageUrl: imagePath
        });
    } catch (error) {
        console.error('Error updating watch:', error);
        res.status(500).json({ message: 'Error updating watch' });
    }
};

// Delete watch (Admin only)
const deleteWatch = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if watch exists
        const watch = await Watch.getById(id);
        if (!watch) {
            return res.status(404).json({ message: 'Watch not found' });
        }

        // Delete watch
        await Watch.delete(id);

        res.status(200).json({ message: 'Watch deleted successfully' });
    } catch (error) {
        console.error('Error deleting watch:', error);
        res.status(500).json({ message: 'Error deleting watch' });
    }
};

// Get watches by category
const getWatchesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const watches = await Watch.getByCategory(category);
        res.status(200).json(watches);
    } catch (error) {
        console.error('Error fetching watches by category:', error);
        res.status(500).json({ message: 'Error fetching watches' });
    }
};

// Search watches
const searchWatches = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const watches = await Watch.search(q);
        res.status(200).json(watches);
    } catch (error) {
        console.error('Error searching watches:', error);
        res.status(500).json({ message: 'Error searching watches' });
    }
};

module.exports = {
    getAllWatches,
    getWatchById,
    addWatch,
    updateWatch,
    deleteWatch,
    getWatchesByCategory,
    searchWatches
};
