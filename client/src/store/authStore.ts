import { create } from "zustand";
import axios from "axios";

// Define the structure of the user object (customize based on your API response)
interface User {
    id: string;
    email: string;
    name: string;
    isVerified: boolean;
}

// Define the state for the store
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
    isCheckingAuth: boolean;
    message: null | string;
    signup: (email: string, password: string, name: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    verifyEmail: (code:string) => Promise<void>;
    checkAuth: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
}

axios.defaults.withCredentials = true;

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;
// Create the Zustand store
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post<{ user: User }>(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({
                    error: error.response?.data?.message || "Error signing up",
                    isLoading: false,
                });
            } else {
                set({ error: "An unexpected error occurred", isLoading: false });
            }
            throw error; // Re-throw the error to be handled by the caller
        }
    },
    login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({
                    error: error.response?.data?.message || "Error Logging In",
                    isLoading: false,
                });
            } else {
                set({ error: "An unexpected error occurred", isLoading: false });
            }
            throw error; // Re-throw the error to be handled by the caller
        }
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({
                    error: error.response?.data?.message || "Error Logging out.",
                    isLoading: false,
                });
            } else {
                set({ error: "An unexpected error occurred", isLoading: false });
            }
            throw error; // Re-throw the error to be handled by the caller
        }
	},
	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify-email`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({
                    error: error.response?.data?.message || "Error Verifying Email",
                    isLoading: false,
                });
            } else {
                set({ error: "An unexpected error occurred", isLoading: false });
            }
            throw error; // Re-throw the error to be handled by the caller
        }
	},
	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error: unknown) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
            throw error;
        }
	},
	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({
                    error: error.response?.data?.message || "Error Sending Password Reset Link",
                    isLoading: false,
                });
            } else {
                set({ error: "An unexpected error occurred", isLoading: false });
            }
            throw error; // Re-throw the error to be handled by the caller
        }
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({
                    error: error.response?.data?.message || "Error Resetting Password",
                    isLoading: false,
                });
            } else {
                set({ error: "An unexpected error occurred", isLoading: false });
            }
            throw error; // Re-throw the error to be handled by the caller
        }
	},
}));
