// features/lecturers/mockData.js
export const mockLecturers = {
  result: [
    {
      id: 1,
      fullName: "Nguyễn Văn A",
      code: "GV001",
      phone: "0901234567",
      avatar: "https://example.com/lecturer1.png",
      state: true,
      stateName: "Hoạt động",
      dateCreated: "2023-01-15",
      universityId: 1, // Liên kết với đại học
      majorId: 1, // Liên kết với chuyên ngành
    },
    {
      id: 2,
      fullName: "Trần Thị B",
      code: "GV002",
      phone: "0912345678",
      avatar: "https://example.com/lecturer2.png",
      state: false,
      stateName: "Không hoạt động",
      dateCreated: "2023-02-20",
      universityId: 2,
      majorId: 2,
    },
    {
      id: 3,
      fullName: "Lê Văn C",
      code: "GV003",
      phone: "0923456789",
      avatar: "https://example.com/lecturer3.png",
      state: true,
      stateName: "Hoạt động",
      dateCreated: "2023-03-10",
      universityId: 1,
      majorId: 3,
    },
  ],
};

export const mockUniversities = {
  result: [
    {
      id: 1,
      universityName: "Đại học Bách Khoa Hà Nội",
    },
    {
      id: 2,
      universityName: "Đại học Kinh Tế Quốc Dân",
    },
    {
      id: 3,
      universityName: "Đại học Sư Phạm Hà Nội",
    },
  ],
};

export const mockMajors = {
  result: [
    {
      id: 1,
      majorName: "Công nghệ Thông tin",
    },
    {
      id: 2,
      majorName: "Kinh tế Quốc tế",
    },
    {
      id: 3,
      majorName: "Sư phạm Toán",
    },
  ],
};

export const mockLecturersPoints = [
  {
    id: 1,
    lecturerId: 1, // Liên kết với ID của giảng viên từ mockLecturers
    campusId: 1,
    pointsAllocated: 50,
    pointsUsed: 20,
    pointsRemaining: 30,
    allocationDate: "2023-10-05",
    state: "active",
  },
  {
    id: 2,
    lecturerId: 2,
    campusId: 1,
    pointsAllocated: 100,
    pointsUsed: 30,
    pointsRemaining: 70,
    allocationDate: "2023-10-15",
    state: "active",
  },
  {
    id: 3,
    lecturerId: 3,
    campusId: 1,
    pointsAllocated: 75,
    pointsUsed: 25,
    pointsRemaining: 50,
    allocationDate: "2023-11-01",
    state: "active",
  },
];