/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
async function fetchModel(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Không thể tải dữ liệu từ ${url} (mã lỗi ${response.status}).`);
  }

  return response.json();
}

export default fetchModel;
