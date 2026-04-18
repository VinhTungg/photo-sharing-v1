import { BASE_API } from "./config.js";

async function handleResponse(response, fallbackMessage) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || fallbackMessage);
    }

    return data;
}

export async function getUser(data) {
    const response = await fetch(`${BASE_API}/user/${data}`);
    return handleResponse(response, "Không thể lấy người dùng");
}

export async function getUserList() {
    const response = await fetch(`${BASE_API}/user/list`);
    return handleResponse(response, "Không thể lấy danh sách người dùng");
}

export async function getUserPhoto(userId) {
    const response = await fetch(`${BASE_API}/photo/${userId}`);
    return handleResponse(response, "Không thể lấy ảnh");
}