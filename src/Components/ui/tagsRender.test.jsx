import { render, screen } from '@testing-library/react';
import TagsRender from './tagsRender';

const tags = ['#Great', '#Cool'];

describe('TagsRender', () => {
  it('TagsRender renders', () => {
    render(<TagsRender tags={tags} />);
    expect(screen.getByText('#Great')).toBeInTheDocument();
  });
});
