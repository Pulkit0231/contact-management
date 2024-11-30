import { message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';


// Create an Axios instance with default settings
const axiosInstance = axios.create({
    baseURL: 'https://contact-management-five-roan.vercel.app/api/contacts',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor for adding authorization tokens (if needed)
axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('accessToken'); // Retrieve token from cookies
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


// Get All Contacts
export const getAllContacts = () => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        const response = await axiosInstance.get('/getallcontacts');
        dispatch({ type: 'GET_ALL_CONTACTS', payload: response.data });
        message.success('Contacts fetched successfully');
    } catch (error) {
        console.error(error);
        message.error(error.response?.data?.message || 'Failed to fetch contacts');
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};

// Add Contact
export const addContact = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        await axiosInstance.post('/addcontacts', reqObj);
        message.success('New contact added successfully');
        setTimeout(() => {
            window.location.href = '/admin'; // Navigate programmatically if needed
        }, 200);
    } catch (error) {
        console.error(error);
        message.error(error.response?.data?.message || 'Failed to add contact');
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};

// Edit Contact
export const editContact = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        await axiosInstance.post(`/editcontact/${reqObj.id}`, reqObj); // Use PUT for updates

        dispatch({ type: 'LOADING', payload: false });

        message.success('Contact details updated successfully');
        setTimeout(() => {
            window.location.href = '/admin';
        }, 200);
    } catch (error) {
        console.error(error);
        message.error(error.response?.data?.message || 'Failed to update contact');
    }
};

// Delete Contact
export const deleteContact = (contactId) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        await axiosInstance.delete(`/deletecontact/${contactId}`);
        message.success('Contact deleted successfully');
        setTimeout(() => {
            window.location.reload();
        }, 200);
    } catch (error) {
        console.error(error);
        message.error(error.response?.data?.message || 'Failed to delete contact');
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
};
