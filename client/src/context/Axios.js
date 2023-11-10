import axios from 'axios';

export default function setAuthToken(token) {
    if (token) {
        // Nếu token tồn tại, thêm token vào header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // Nếu token không tồn tại, xóa token khỏi header
        delete axios.defaults.headers.common['Authorization'];
    }
}