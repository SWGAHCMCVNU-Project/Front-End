export const mockStudents = {
  result: [
    {
      id: 1,
      fullName: "Nguyễn Văn A",
      code: "SE150001",
      email: "ase150001@fpt.edu.vn",
      phone: "0123456789",
      avatar: "https://example.com/avatar1.jpg",
      state: "Hoạt động",
      stateName: "Hoạt động",
      universityName: "FPT University",
      campusName: "Ho Chi Minh",
      majorName: "Software Engineering"
    },
    {
      id: 2,
      fullName: "Trần Thị B",
      code: "SE150002", 
      email: "bse150002@fpt.edu.vn",
      phone: "0987654321",
      avatar: "https://example.com/avatar2.jpg",
      state: "Chờ duyệt",
      stateName: "Chờ duyệt",
      universityName: "FPT University",
      campusName: "Ha Noi",
      majorName: "Business Administration"
    },
    {
      id: 3,
      fullName: "Lê Văn C",
      code: "SE150003",
      email: "cse150003@fpt.edu.vn", 
      phone: "0369852147",
      avatar: "https://example.com/avatar3.jpg",
      state: "Không hoạt động",
      stateName: "Không hoạt động",
      universityName: "FPT University",
      campusName: "Da Nang",
      majorName: "Graphic Design"
    },
    {
      id: 4,
      fullName: "Phạm Thị D",
      code: "SE150004",
      email: "dse150004@fpt.edu.vn",
      phone: "0741852963",
      avatar: "https://example.com/avatar4.jpg", 
      state: "Từ chối",
      stateName: "Từ chối",
      universityName: "FPT University",
      campusName: "Can Tho",
      majorName: "Information Security"
    }
  ],
  currentPage: 1,
  pageSize: 10,
  pageCount: 1,
  rowCount: 4,
  totalCount: 4
};

export const mockMajors = {
  result: [
    { id: 1, majorName: "Software Engineering" },
    { id: 2, majorName: "Business Administration" },
    { id: 3, majorName: "Graphic Design" },
    { id: 4, majorName: "Information Security" }
  ]
};

export const mockUniversities = {
  result: [
    { id: 1, universityName: "FPT University" },
    { id: 2, universityName: "RMIT University" },
    { id: 3, universityName: "VNU University" }
  ]
}; 