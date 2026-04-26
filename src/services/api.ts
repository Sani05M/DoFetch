/**
 * API Service Layer
 * This layer is designed to be backend-ready.
 * Currently returns mock data, but can be easily wired to real endpoints.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Mock Data
const mockStudentData = {
  id: "STU001",
  name: "Abhishek Singh",
  email: "abhishek23@stu.admasuniversity.ac.in",
  rollNo: "22CS001",
  regNo: "REG2022CS001",
  section: "A"
};

const mockFacultyData = {
  id: "FAC001",
  name: "Dr. Priya Sharma",
  email: "priya.sharma@admasuniversity.ac.in",
  facultyId: "FAC-2021-012",
  sections: ["A", "B"]
};

export const api = {
  // Auth
  loginStudent: async (payload: any) => {
    console.log("POST /auth/student", payload);
    return mockStudentData;
  },
  
  loginFaculty: async (payload: any) => {
    console.log("POST /auth/faculty", payload);
    return mockFacultyData;
  },

  logout: async () => {
    console.log("POST /auth/logout");
    return true;
  },

  // Certificates
  getCertificates: async (studentId: string) => {
    console.log(`GET /certificates/${studentId}`);
    return []; // Return mock array if needed
  },

  uploadCertificate: async (formData: FormData) => {
    console.log("POST /certificates", formData);
    return { id: "NEW_CERT", status: "pending" };
  },

  deleteCertificate: async (id: string) => {
    console.log(`DELETE /certificates/${id}`);
    return true;
  },

  // Faculty
  getSectionStudents: async (section: string) => {
    console.log(`GET /faculty/section/${section}`);
    return [];
  },

  approveCertificate: async (id: string) => {
    console.log(`PATCH /certificates/${id}/approve`);
    return true;
  },

  rejectCertificate: async (id: string, reason: string) => {
    console.log(`PATCH /certificates/${id}/reject`, { reason });
    return true;
  },

  getExportData: async (section: string) => {
    console.log(`GET /faculty/export?section=${section}`);
    return [];
  },
};
