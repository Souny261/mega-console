import React, { useState } from 'react';
import { PackageIcon, AlertCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      navigate('/products');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <div className="flex justify-center">
          <PackageIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to InventoryOS
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Use email: admin@example.com / password: admin123
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-3 rounded-md">
          <AlertCircleIcon size={16} />
          {error}
        </div>}
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800" placeholder="Enter your email" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800" placeholder="Enter your password" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  </div>;
};
export default Login;