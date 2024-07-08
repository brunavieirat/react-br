import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import RegisterFormModal from '../RegisterFormModal';
import { FormDialogHandles } from '../../types';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { enableFetchMocks } from 'jest-fetch-mock';
import { User } from '../../Users/UsersContainer';
import Users from '../../Users/Users';
enableFetchMocks();

const user: User[] = [{
  id: 1,
  name: "Teste",
  email: "teste@teste.com"
}];

jest.mock('../../../hooks/useUsers', () => ({
  __esModule: true,
  default: () => ({
    refetch: jest.fn(), 
  }),
}));

describe('RegisterFormContainer', () => {
  test('submits form and refetches users', async () => {
    const ref = { current: null as null | FormDialogHandles };

    render(<RegisterFormModal ref={ref} initialData={{ name: '', email: '' }} />);

    act(() => {
      if (ref.current) {
        ref.current.openDialog();
      }
    });

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const dialogTitle = screen.getByRole('heading', { name: /Adicionar Usuário|Editar Usuário/i });
    expect(dialogTitle).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /submit|atualizar/i }));

    await waitFor(() => {
      const updatedDialog = screen.queryByRole('dialog');
      expect(updatedDialog).not.toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalled();

  });

});
