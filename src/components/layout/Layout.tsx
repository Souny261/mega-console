
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}

const LayoutProduct = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-white border-t border-border py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          ProductVerse Manager © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default LayoutProduct;
