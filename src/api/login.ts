import http from "@/utils/http";

export function loginApi(params: any) {
  return http.post("/employee/login", params);
}

export function logoutApi() {
  return http.post("/employee/logout", {});
}
