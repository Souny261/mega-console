// import React, { useCallback, useState, createContext, useContext } from 'react';
// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'admin' | 'manager' | 'support';
//   avatar: string;
// }
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// export const AuthProvider: React.FC<{
//   children: React.ReactNode;
// }> = ({
//   children
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const login = useCallback(async (email: string, password: string) => {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     // Mock validation
//     if (email === 'admin@example.com' && password === 'admin123') {
//       const mockUser: User = {
//         id: '1',
//         name: 'Admin User',
//         email: 'admin@example.com',
//         role: 'admin',
//         avatar: 'A'
//       };
//       setUser(mockUser);
//       setIsAuthenticated(true);
//     } else {
//       throw new Error('Invalid credentials');
//     }
//   }, []);
//   const logout = useCallback(() => {
//     setUser(null);
//     setIsAuthenticated(false);
//   }, []);
//   return <AuthContext.Provider value={{
//     isAuthenticated,
//     user,
//     login,
//     logout
//   }}>
//       {children}
//     </AuthContext.Provider>;
// };
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };