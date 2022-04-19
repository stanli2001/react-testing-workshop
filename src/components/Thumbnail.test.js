import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Thumbnail from './Thumbnail';
import { itemImages } from '../items';

describe('Thumbnail', () => {
    it('Display the title and image', () => {
        render(
            <Router>
                <Thumbnail id="apple" title="Apple" image={itemImages.apple} />
            </Router>,
        );
        expect(screen.getByText('Apple')).toBeInTheDocument();
        screen.getAllByAltText('Apple');
    });
});
