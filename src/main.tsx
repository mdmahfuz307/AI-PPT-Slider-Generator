import { ClerkProvider } from '@clerk/clerk-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App.tsx';
import './index.css';
import Workspace from './workspace/index.tsx';
import Outline from './workspace/project/outline/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/workspace",
    element: <Workspace />,
    children: [
    {
      path: "project/:projectId/outline",
      element: <Outline/>
    }
    ,
    {
      path: "project/outline",
      element: <Outline />
    }
    ],
  },
]);



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}




createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
     <RouterProvider router={router} />
     </ClerkProvider>
  </StrictMode>,
)
