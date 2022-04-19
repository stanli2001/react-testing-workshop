import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { items } from './items';

describe('App', () => {
    it("Displays the logged in user's username", async () => {
        render(<App />);
        await screen.findByText(/Welcome, Tester/);
    });
    it('Allow the user to build a cart and place an order', async () => {
        render(
            <div id="root">
                <App />
            </div>,
        );
        // await waitFor(() => {
        //     const thumbnails = screen.getAllByTestId('thumbnail-component');
        //     expect(thumbnails).toHaveLength(items.length);
        // });
        const thumbnails = await screen.findAllByTestId('thumbnail-component');
        expect(thumbnails).toHaveLength(items.length);
        // await screen.findByRole('link', { name: /hamburger/i });
        userEvent.click(await screen.findByRole('link', { name: /hamburger/i }));
        await screen.findByText(/Price:/);
        userEvent.click(screen.getByRole('button', { name: 'Add to Cart' }));
        await waitFor(() => {
            expect(screen.getByTestId('cart-quantity')).toHaveTextContent('1');
        });
        userEvent.click(screen.getByRole('button', { name: 'Add to Cart' }));
        await waitFor(() => {
            expect(screen.getByTestId('cart-quantity')).toHaveTextContent('2');
        });
        userEvent.click(screen.getByRole('link', { name: /cart/i }));
        await screen.findByLabelText(/Name/);
        await screen.findByText(/Sub-total: \$5.00/);
        expect(
            screen.getByRole('button', { name: 'Place Order' }),
        ).toBeDisabled();
        userEvent.type(screen.getByLabelText(/Name/), 'Big Nerd Ranch');
        userEvent.type(screen.getByLabelText(/Zip Code/), '12345');
        expect(
            screen.getByRole('button', { name: 'Place Order' }),
        ).toBeEnabled();
        userEvent.click(screen.getByRole('button', { name: 'Place Order' }));
        await screen.findByText(/Thanks for your order/i);
        userEvent.click(screen.getByRole('button', { name: 'Return Home' }));
        await screen.findAllByTestId('thumbnail-component');
    });
});
