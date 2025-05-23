import { Card } from '../../components/Card';
import type { IProduct } from '../../constant';
import { renderWithProviders } from '../utils';

describe('Card', () => {
  const product: IProduct = {
    id: 1,
    brand: 'brand',
    modelName: 'modelName',
    description: 'description',
    price: 1,
    admin: 1,
  };
  it('should render', async () => {
    const { container, findByText } = renderWithProviders(<Card {...product} />);
    expect(container).toBeTruthy();
    const modelName = container.textContent?.includes(product.modelName);
    expect(modelName).toBeTruthy();
    const brand = findByText('brand');
    expect(brand).toBeTruthy();
  });
});
