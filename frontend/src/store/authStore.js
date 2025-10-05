import {create} from 'zustand';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Signup from '../pages/Signup';
const API_URL = "https://netflix-j2hg.onrender.com";

const useAuthStore = create((set) => ({
    // initial states
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,

  // functions
    Signup: async (username, email, password) => {
        set({isLoading: true, error: null, message: null}); 
        try {
            const response=await axios.post(`${API_URL}/signup`,{username,email,password});
            set({user: response.data.user, isLoading: false,});
        }catch (error) {
            set({isLoading: false, error: error.response?.data?.message || "Error Signing up"});
            throw error;
        }   
    },

    login: async (username, password) => {
        set({isLoading: true, error: null, message: null}); 
        try {
            const response=await axios.post(`${API_URL}/login`,{username,password});
            const {user, message} = response.data;
            set({user,  message, isLoading: false,});
            return{user, message};
        }catch (error) {
            set({isLoading: false, error: error.response?.data?.message || "Error Logging in"});
            throw error;
        }
    },

    fetchUser: async () => {
        set({fetchingUser: true, error: null});
        try {
            const response=await axios.get(`${API_URL}/fetch-user`);
            const {user}=response.data;
            set({user, fetchingUser: false});
        }catch (error) {
            set({fetchingUser: false, error: error.response?.data?.message || "Error fetching user"});
        }   
    },

    logout: async () => {
        set({ isLoading: true, error: null, message: null });

        try {
            const response = await axios.post(`${API_URL}/logout`);
            const { message } = response.data;
            set({
                message,
                isLoading: false,
                user: null,
                error: null,
            });

            return { message };
        } catch (error) {
        set({
            isLoading: false,
            error: error.response.data.message || "Error logging out",
        });

        throw error;
        }
    },

}));
export default useAuthStore;