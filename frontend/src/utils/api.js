import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Bypass-Tunnel-Reminder': 'true'
  }
});

// Users API
export const usersAPI = {
  getAllUsers: (page = 1, limit = 10) =>
    axiosInstance.get(`/users?page=${page}&limit=${limit}`),
  
  getUserById: (id) =>
    axiosInstance.get(`/users/${id}`),
  
  updateUserProfile: (id, data) =>
    axiosInstance.put(`/users/${id}/profile`, data),
  
  updateUserStatus: (id, status) =>
    axiosInstance.put(`/users/${id}/status`, { status }),
  
  deleteUser: (id) =>
    axiosInstance.delete(`/users/${id}`),
  
  getUserStats: () =>
    axiosInstance.get('/users/stats/overview')
};

// Tasks API
export const tasksAPI = {
  createTask: (data) =>
    axiosInstance.post('/tasks', data),
  
  getAllTasks: (page = 1, limit = 10, status = null, priority = null) => {
    let url = `/tasks?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;
    if (priority) url += `&priority=${priority}`;
    return axiosInstance.get(url);
  },
  
  getTaskById: (id) =>
    axiosInstance.get(`/tasks/${id}`),
  
  updateTask: (id, data) =>
    axiosInstance.put(`/tasks/${id}`, data),
  
  deleteTask: (id) =>
    axiosInstance.delete(`/tasks/${id}`),
  
  getTaskStats: () =>
    axiosInstance.get('/tasks/stats/overview')
};

// Activity Logs API
export const activityAPI = {
  getActivityLogs: (page = 1, limit = 20, action = null, userId = null) => {
    let url = `/activity-logs?page=${page}&limit=${limit}`;
    if (action) url += `&action=${action}`;
    if (userId) url += `&userId=${userId}`;
    return axiosInstance.get(url);
  },
  
  getUserActivityLogs: (userId, page = 1, limit = 20) =>
    axiosInstance.get(`/activity-logs/user/${userId}?page=${page}&limit=${limit}`),
  
  getActivityStats: () =>
    axiosInstance.get('/activity-logs/stats/overview')
};

export default axiosInstance;
