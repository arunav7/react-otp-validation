import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { Provider } from '@/chakra-components/ui/provider.tsx';

import './index.css';
import { LanguageProvider } from './context/LanguageProvider.tsx';

const Wrapper = () => {
  return (
    <Provider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </Provider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Wrapper />
  </StrictMode>
);
