import axios from "axios";
export const useHttp = (
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any
) => {
  return axios({
    method,
    url: "http://127.0.0.1:3333" + path,
    data,
    params: {
      // 去掉开头和结尾的 "", 因为 localStorage 保存的是字符串
      user: localStorage.getItem("user")?.slice(1, -1),
    },
  });
};
