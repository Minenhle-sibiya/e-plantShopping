import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {

        // Add a plant to the cart
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;

            // Check if the plant already exists in the cart
            const existingItem = state.items.find(
                item => item.name === name
            );

            if (existingItem) {
                // If it exists, increase the quantity
                existingItem.quantity++;
            } else {
                // If it does not exist, add it with quantity 1
                state.items.push({
                    name,
                    image,
                    cost,
                    quantity: 1
                });
            }
        },

        // Remove a plant completely from the cart
        removeItem: (state, action) => {
            state.items = state.items.filter(
                item => item.name !== action.payload
            );
        },

        // Update the quantity of a plant
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;

            const itemToUpdate = state.items.find(
                item => item.name === name
            );

            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },
    },
});

// Export the action creators
export const {
    addItem,
    removeItem,
    updateQuantity
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;