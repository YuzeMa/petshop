import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CartPage } from '../pages/cart/CartPage';
import { ProductListPage } from '../pages/products/ProductListPage';
import { AppShell } from './AppShell';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<ProductListPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
