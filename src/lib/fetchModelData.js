import { BASE_API } from "../api/config";

/**
 * @param {string} path  Đường dẫn tương đối (ví dụ: "/user/list")
 */
async function fetchModel(path) {
  const fullUrl = `${BASE_API}${path}`;

  const response = await fetch(fullUrl, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Không thể tải dữ liệu từ ${fullUrl} (mã lỗi ${response.status}).`);
  }

  return response.json();
}

export default fetchModel;