import { fireEvent, screen, waitFor } from '@testing-library/react';
import { createProductApi, updateProductApi } from '../../apis/product';
import Modal from '../../components/Modal';
import { renderWithProviders } from '../utils';
vi.mock('../../apis/product');

const TEST_PRODUCT = {
  brand: 'brand',
  modelName: 'modelName',
  description: 'description',
  price: 1,
};
describe('Modal', () => {
  it('should render for create product', () => {
    // Arrange
    const mockSetShowModal = vi.fn();
    vi.mocked(createProductApi).mockResolvedValue({
      id: 1,
      admin: 1,
      ...TEST_PRODUCT,
    });

    // Act
    const { container } = renderWithProviders(
      <Modal showModal={true} setShowModal={mockSetShowModal} product={null} />,
    );
    screen.findByText('Create New Product');
    const brandInput = screen.getByTestId('brand');
    const modelNameInput = screen.getByTestId('model');
    const descriptionInput = screen.getByTestId('description');
    const priceInput = screen.getByTestId('price');
    const submitButton = container.querySelector('button[type="submit"]');

    // Assert
    expect(brandInput).toBeInTheDocument();
    expect(modelNameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(brandInput, { target: { value: TEST_PRODUCT.brand } });
    fireEvent.change(modelNameInput, { target: { value: TEST_PRODUCT.modelName } });
    fireEvent.change(descriptionInput, { target: { value: TEST_PRODUCT.description } });
    fireEvent.change(priceInput, { target: { value: '1' } });
    fireEvent.click(submitButton as HTMLButtonElement);
    expect(createProductApi).toHaveBeenCalledWith(TEST_PRODUCT);
    waitFor(() => {
      expect(mockSetShowModal).toHaveBeenCalledWith(false);
    });
  });

  it('should render for update product', () => {
    // Arrange
    const product = { ...TEST_PRODUCT, id: 1, admin: 1 };
    const mockSetShowModal = vi.fn();
    vi.mocked(updateProductApi).mockResolvedValue({
      ...product,
      price: 2,
    });

    // Act
    const { container } = renderWithProviders(
      <Modal isUpdate={true} showModal={true} setShowModal={mockSetShowModal} product={product} />,
    );
    screen.findByText('Update Product');
    const brandInput = screen.getByTestId('brand');
    const modelNameInput = screen.getByTestId('model');
    const descriptionInput = screen.getByTestId('description');
    const priceInput = screen.getByTestId('price');
    const submitButton = container.querySelector('button[type="submit"]');

    // Assert
    expect(brandInput).toBeInTheDocument();
    expect(modelNameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(priceInput, { target: { value: 2 } });
    fireEvent.click(submitButton as HTMLButtonElement);

    expect(updateProductApi).toHaveBeenCalledWith(product.id, { ...product, price: 2 });
    waitFor(() => {
      expect(mockSetShowModal).toHaveBeenCalledWith(false);
    });
  });
});
