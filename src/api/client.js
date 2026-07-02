const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export const apiRequest = async (path, options = {}) => {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const contentType = response.headers.get("Content-Type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new ApiError(
      payload?.message || "Request failed",
      response.status,
      payload,
    );
  }

  return payload;
};

export const authApi = {
  login(credentials) {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  register(data) {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  refresh() {
    return apiRequest("/auth/refresh", {
      method: "POST",
    });
  },

  logout() {
    return apiRequest("/auth/logout", {
      method: "POST",
    });
  },

  me(accessToken) {
    return apiRequest("/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

const authHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
});

const buildQuery = (params) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
};

export const usersApi = {
  list(accessToken, params = {}) {
    return apiRequest(`/users${buildQuery(params)}`, {
      headers: authHeaders(accessToken),
    });
  },

  create(accessToken, data) {
    return apiRequest("/users", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  update(accessToken, id, data) {
    return apiRequest(`/users/${id}`, {
      method: "PATCH",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  deactivate(accessToken, id) {
    return apiRequest(`/users/${id}/deactivate`, {
      method: "PATCH",
      headers: authHeaders(accessToken),
    });
  },

  reactivate(accessToken, id) {
    return apiRequest(`/users/${id}/reactivate`, {
      method: "PATCH",
      headers: authHeaders(accessToken),
    });
  },
};

export const classesApi = {
  list(accessToken, params = {}) {
    return apiRequest(`/classes${buildQuery(params)}`, {
      headers: authHeaders(accessToken),
    });
  },

  create(accessToken, data) {
    return apiRequest("/classes", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  update(accessToken, id, data) {
    return apiRequest(`/classes/${id}`, {
      method: "PATCH",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  remove(accessToken, id) {
    return apiRequest(`/classes/${id}`, {
      method: "DELETE",
      headers: authHeaders(accessToken),
    });
  },
};

export const subjectsApi = {
  list(accessToken, params = {}) {
    return apiRequest(`/subjects${buildQuery(params)}`, {
      headers: authHeaders(accessToken),
    });
  },

  create(accessToken, data) {
    return apiRequest("/subjects", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  update(accessToken, id, data) {
    return apiRequest(`/subjects/${id}`, {
      method: "PATCH",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  remove(accessToken, id) {
    return apiRequest(`/subjects/${id}`, {
      method: "DELETE",
      headers: authHeaders(accessToken),
    });
  },
};

export const teacherAssignmentsApi = {
  list(accessToken, params = {}) {
    return apiRequest(`/teacher-assignments${buildQuery(params)}`, {
      headers: authHeaders(accessToken),
    });
  },

  create(accessToken, data) {
    return apiRequest("/teacher-assignments", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  update(accessToken, id, data) {
    return apiRequest(`/teacher-assignments/${id}`, {
      method: "PATCH",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  remove(accessToken, id) {
    return apiRequest(`/teacher-assignments/${id}`, {
      method: "DELETE",
      headers: authHeaders(accessToken),
    });
  },
};

export const teacherApi = {
  classes(accessToken) {
    return apiRequest("/teacher/classes", {
      headers: authHeaders(accessToken),
    });
  },

  classStudents(accessToken, classId, params = {}) {
    return apiRequest(`/teacher/classes/${classId}/students${buildQuery(params)}`, {
      headers: authHeaders(accessToken),
    });
  },

  attendance(accessToken, params) {
    return apiRequest(`/teacher/attendance${buildQuery(params)}`, {
      headers: authHeaders(accessToken),
    });
  },

  saveAttendance(accessToken, data) {
    return apiRequest("/teacher/attendance", {
      method: "PUT",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  assignments(accessToken, params = {}) {
    return apiRequest(`/teacher/assignments${buildQuery(params)}`, {
      headers: authHeaders(accessToken),
    });
  },

  createAssignment(accessToken, data) {
    return apiRequest("/teacher/assignments", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  updateAssignment(accessToken, id, data) {
    return apiRequest(`/teacher/assignments/${id}`, {
      method: "PATCH",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  deleteAssignment(accessToken, id) {
    return apiRequest(`/teacher/assignments/${id}`, {
      method: "DELETE",
      headers: authHeaders(accessToken),
    });
  },

  grades(accessToken, params) {
    return apiRequest(`/teacher/grades${buildQuery(params)}`, {
      headers: authHeaders(accessToken),
    });
  },

  saveGrades(accessToken, data) {
    return apiRequest("/teacher/grades", {
      method: "PUT",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  announcements(accessToken) {
    return apiRequest("/teacher/announcements", {
      headers: authHeaders(accessToken),
    });
  },

  createAnnouncement(accessToken, data) {
    return apiRequest("/teacher/announcements", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  updateAnnouncement(accessToken, id, data) {
    return apiRequest(`/teacher/announcements/${id}`, {
      method: "PATCH",
      headers: authHeaders(accessToken),
      body: JSON.stringify(data),
    });
  },

  deleteAnnouncement(accessToken, id) {
    return apiRequest(`/teacher/announcements/${id}`, {
      method: "DELETE",
      headers: authHeaders(accessToken),
    });
  },
};

export const studentApi = {
  overview(accessToken) {
    return apiRequest("/student/overview", {
      headers: authHeaders(accessToken),
    });
  },

  courses(accessToken) {
    return apiRequest("/student/courses", {
      headers: authHeaders(accessToken),
    });
  },

  attendance(accessToken, params = {}) {
    return apiRequest(`/student/attendance${buildQuery(params)}`, {
      headers: authHeaders(accessToken),
    });
  },

  assignments(accessToken) {
    return apiRequest("/student/assignments", {
      headers: authHeaders(accessToken),
    });
  },

  grades(accessToken, params = {}) {
    return apiRequest(`/student/grades${buildQuery(params)}`, {
      headers: authHeaders(accessToken),
    });
  },

  fees(accessToken, params = {}) {
    return apiRequest(`/student/fees${buildQuery(params)}`, {
      headers: authHeaders(accessToken),
    });
  },

  announcements(accessToken) {
    return apiRequest("/student/announcements", {
      headers: authHeaders(accessToken),
    });
  },
};
