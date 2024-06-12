import axios from "axios";

export const useHttp = (
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any
) => {
  const config = useRuntimeConfig();
  return axios({
    method,
    url: config.public.baseApi + path,
    data,
    params: {
      // 去掉开头和结尾的 "", 因为 localStorage 保存的是字符串
      user: localStorage.getItem("user")?.slice(1, -1),
    },
  });
};
