import { render, fireEvent, waitFor } from '@testing-library/react';
import FetchUsers from './FetchUsers';

describe('App', () => {
  const renderComponent = () => (render(<FetchUsers />));

  test('renders learn react link', async () => {

    const { getByText, getAllByRole } = renderComponent();

    fireEvent.click(getByText('Get users'));

    await waitFor(() => {
      const userList = getAllByRole('listitem');
      expect(userList).toHaveLength(10);
      expect(userList[0]).toHaveTextContent('Leanne Graham');
      expect(userList[1]).toHaveTextContent('Ervin Howell');
    });
  });
})