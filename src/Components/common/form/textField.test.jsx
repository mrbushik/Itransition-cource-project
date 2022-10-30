import { render, screen } from '@testing-library/react';

import TextField from './textField';
import userEvent from '@testing-library/user-event';

const onChange = jest.fn();

describe('TextField', () => {
  it('render with placeholder', () => {
    render(<TextField label="write" />);
    expect(screen.getByText('write')).toBeInTheDocument();
  });

  it('render without placeholder', () => {
    render(<TextField value="login" />);
    expect(screen.getByPlaceholderText('')).toBeInTheDocument();
  });

  it('custom placeholder works correctly', () => {
    render(<TextField value="login" placeholder="you login" />);
    expect(screen.getByPlaceholderText('you login')).toBeInTheDocument();
  });

  it('onChange textField', () => {
    render(<TextField value="login" placeholder="you login" onChange={onChange} />);
    userEvent.type(screen.getByRole('textbox'), 'nikita');
    expect(onChange).toHaveBeenCalledTimes(6);
  });
});
