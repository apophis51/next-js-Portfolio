import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page, { App } from '../app/(main site)/(Test pages)/_jestExamples/jestTest'

describe('Page', () => {
    it('renders a heading', () => {
        render(<Page />)

        const heading = screen.getByRole('heading', { level: 1 })

        expect(heading).toBeInTheDocument()
    })
})

describe('App', () => {
    it('renders App component', async () => {
        render(<App />);


        expect(screen.getByText('Search:')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        //screen.getByRole(''); 
        expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
        expect(screen.queryByText(/Signed in as/)).toBeNull();

        screen.debug();
        expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
        screen.debug();

    });
});

describe('true is truthy and false is falsy', () => {
    it('true is truthy', () => {
        expect(true).toBe(true);
    });

    it('false is falsy', () => {
        expect(false).toBe(false);
    });
});

function sum(x, y) {
    return x + y;
}

describe('sum', () => {
    it('sums up two values', () => {
        expect(sum(2, 4)).toBe(6);
    });
});