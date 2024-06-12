import axios from "axios";
export const useHttp = (
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any
) => {
  return axios({
    method,
    url: process.env.BASE_API + path,
    data,
    params: {
      // 去掉开头和结尾的 "", 因为 localStorage 保存的是字符串
      user: localStorage.getItem("user")?.slice(1, -1),
    },
  });
};
