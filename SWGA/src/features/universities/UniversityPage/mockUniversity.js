export const mockUniversities = {
  result: [
    {
      id: 1,
      universityName: "FPT University",
      email: "fpt.edu@fpt.edu.vn",
      phone: "0123456789",
      image: "https://example.com/fpt.jpg",
      dateCreated: "2024-01-15T07:00:00.000Z",
      state: true,
      stateName: "Hoạt động",
      areas: [
        {
          id: 1,
          areaName: "Quận 1"
        },
        {
          id: 2,
          areaName: "Quận 2"
        },
        {
          id: 3,
          areaName: "Quận 7"
        },
        {
          id: 4,
          areaName: "Quận 10"
        },
        {
          id: 5,
          areaName: "Bình Thạnh"
        }
      ]
    },
    {
      id: 2,
      universityName: "RMIT University",
      email: "rmit.edu@rmit.edu.vn", 
      phone: "0987654321",
      image: "https://example.com/rmit.jpg",
      dateCreated: "2024-01-16T07:00:00.000Z",
      state: true,
      stateName: "Hoạt động",
      areas: [
        {
          id: 1,
          areaName: "Quận 1"
        },
        {
          id: 3,
          areaName: "Quận 7"
        },
        {
          id: 5,
          areaName: "Bình Thạnh"
        }
      ]
    },
    {
      id: 3,
      universityName: "VNU University",
      email: null,
      phone: null,
      image: "https://example.com/vnu.jpg",
      dateCreated: "2024-01-17T07:00:00.000Z",
      state: false,
      stateName: "Không hoạt động",
      areas: [
        {
          id: 2,
          areaName: "Quận 2"
        },
        {
          id: 4,
          areaName: "Quận 10"
        }
      ]
    }
  ],
  currentPage: 1,
  pageSize: 10,
  pageCount: 1,
  rowCount: 3,
  totalCount: 3
};
