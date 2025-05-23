import { ItemCardList } from '../../components/ItemCardList';
import { renderWithProviders } from '../utils';

describe('ItemCardList', () => {
  const products = [
    {
      id: 1,
      brand: 'brand',
      modelName: 'modelName',
      description: 'description',
      price: 1,
      admin: 1,
    },
    {
      id: 2,
      brand: 'brand',
      modelName: 'modelName',
      description: 'description',
      price: 1,
      admin: 1,
    },
  ];
  it('should render', async () => {
    const { container, findAllByRole } = renderWithProviders(
      <ItemCardList title='test' list={products} />,
    );
    expect(container).toBeTruthy();
    const brand = await findAllByRole('listitem');
    expect(brand).toBeTruthy();
    expect(brand.length).toBe(2);
  });
});
