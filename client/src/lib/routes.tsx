import App from "@/App";
import SignUpPage from "@/pages/SignUpPage";
import LoginPage from "@/pages/LoginPage";
import { Navigate, createBrowserRouter } from "react-router";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import { VerifyPage } from "@/pages/VerifyPage";
import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import ResetPasswordPage from "@/pages/ResetPasswordPage";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated, user } = useAuthStore();
	if (!isAuthenticated || !user) {
		return <Navigate to="/login" replace />;
	}
	if (!user.isVerified) {
		return <Navigate to="/verify-email" replace />;
	}
	return children;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated, user, checkAuth } = useAuthStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);
	if (isAuthenticated && user?.isVerified) {
		return <Navigate to="/" replace />;
	}
	return children;
};

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<App />
			</ProtectedRoute>
		),
	},
	{
		path: "/signup",
		element: (
			<AuthProvider>
				<SignUpPage />
			</AuthProvider>
		),
	},
	{
		path: "/login",
		element: (
			<AuthProvider>
				<LoginPage />
			</AuthProvider>
		),
	},
	{
		path: "/verify-email",
		Component: VerifyPage,
	},
	{
		path: "/forgot-password",
		element: (
			<AuthProvider>
				<ForgotPasswordPage />
			</AuthProvider>
		),
	},
	{
		path: "/reset-password/:token",
		element: (
			<AuthProvider>
				<ResetPasswordPage />
			</AuthProvider>
		),
	},
]);
