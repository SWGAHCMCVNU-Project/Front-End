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
      majorName: "Software Engineering",
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
      dateOfBirth: "2000-01-15T00:00:00.000Z",
      gender: true,
      greenWalletName: "Ví xanh",
      greenWalletBalance: 500000,
      dateCreated: "2024-01-15T07:00:00.000Z",
      universityId: 1,
      facultyId: 1,
      facultyName: "Công nghệ thông tin",
      majorId: 1,
      histories: [
        {
          id: 1,
          name: "Giao dịch #1",
          typeName: "Nạp tiền",
          amount: 200000,
          rate: 1,
          transactionDate: "2024-03-15T10:30:00.000Z",
          state: true
        },
        {
          id: 2,
          name: "Giao dịch #2",
          typeName: "Mua voucher",
          amount: 100000,
          rate: 1,
          transactionDate: "2024-03-16T14:20:00.000Z",
          state: true
        }
      ],
      vouchers: [
        {
          id: 1,
          voucherName: "Giảm 50% Highland Coffee",
          price: 50000,
          rate: 1.5,
          purchaseDate: "2024-03-16T14:20:00.000Z",
          expiryDate: "2024-04-16T14:20:00.000Z",
          state: true
        }
      ],
      wishlists: [
        {
          id: 1,
          brandId: 1,
          dateCreated: "2024-03-15T10:30:00.000Z",
          state: true
        },
        {
          id: 2,
          brandId: 2,
          dateCreated: "2024-03-16T14:20:00.000Z",
          state: true
        }
      ],
      orders: [
        {
          id: 1,
          orderName: "Đơn hàng #1",
          brandName: "Highland Coffee",
          voucherName: "Giảm 50% Highland Coffee",
          amount: 50000,
          orderDate: "2024-03-16T14:20:00.000Z",
          state: "Completed",
          stateName: "Hoàn thành"
        },
        {
          id: 2,
          orderName: "Đơn hàng #2",
          brandName: "Phúc Long",
          voucherName: "Mua 1 tặng 1 Phúc Long",
          amount: 75000,
          orderDate: "2024-03-17T09:15:00.000Z",
          state: "Processing",
          stateName: "Đang xử lý"
        }
      ]
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
      majorName: "Business Administration",
      address: "456 Lê Lợi, Q1, TP.HCM",
      dateOfBirth: "2001-05-20T00:00:00.000Z",
      gender: false,
      greenWalletName: "Ví xanh",
      greenWalletBalance: 300000,
      dateCreated: "2024-01-20T08:00:00.000Z",
      universityId: 1,
      facultyId: 2,
      facultyName: "Quản trị kinh doanh",
      majorId: 2,
      histories: [
        {
          id: 3,
          name: "Giao dịch #3",
          typeName: "Nạp tiền",
          amount: 300000,
          rate: 1,
          transactionDate: "2024-03-17T09:15:00.000Z",
          state: true
        }
      ],
      vouchers: [
        {
          id: 2,
          voucherName: "Mua 1 tặng 1 Phúc Long",
          price: 75000,
          rate: 2,
          purchaseDate: "2024-03-17T09:15:00.000Z",
          expiryDate: "2024-04-17T09:15:00.000Z",
          state: true
        }
      ],
      wishlists: [
        {
          id: 3,
          brandId: 3,
          dateCreated: "2024-03-17T09:15:00.000Z",
          state: true
        }
      ],
      orders: [
        {
          id: 3,
          orderName: "Đơn hàng #3",
          brandName: "The Coffee House",
          voucherName: "Giảm 30% The Coffee House",
          amount: 45000,
          orderDate: "2024-03-19T13:20:00.000Z",
          state: "Completed",
          stateName: "Hoàn thành"
        }
      ]
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
      majorName: "Graphic Design",
      address: "789 Lý Tự Trọng, Q1, TP.HCM",
      dateOfBirth: "1999-12-10T00:00:00.000Z",
      gender: true,
      greenWalletName: "Ví xanh",
      greenWalletBalance: 700000,
      dateCreated: "2024-02-01T09:00:00.000Z",
      universityId: 1,
      facultyId: 3,
      facultyName: "Thiết kế đồ họa",
      majorId: 3,
      histories: [
        {
          id: 4,
          name: "Giao dịch #4",
          typeName: "Nạp tiền",
          amount: 500000,
          rate: 1,
          transactionDate: "2024-03-18T11:45:00.000Z",
          state: true
        }
      ],
      vouchers: [
        {
          id: 3,
          voucherName: "Giảm 30% The Coffee House",
          price: 45000,
          rate: 1.3,
          purchaseDate: "2024-03-19T13:20:00.000Z",
          expiryDate: "2024-04-19T13:20:00.000Z",
          state: true
        }
      ],
      wishlists: [
        {
          id: 4,
          brandId: 1,
          dateCreated: "2024-03-18T11:45:00.000Z",
          state: true
        },
        {
          id: 5,
          brandId: 4,
          dateCreated: "2024-03-19T13:20:00.000Z",
          state: true
        }
      ],
      orders: [
        {
          id: 4,
          orderName: "Đơn hàng #4",
          brandName: "Highland Coffee",
          voucherName: "Combo 2 ly size L Highlands",
          amount: 120000,
          orderDate: "2024-03-19T13:25:00.000Z",
          state: "Cancelled",
          stateName: "Đã hủy"
        }
      ]
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
      majorName: "Information Security",
      address: "321 Hai Bà Trưng, Q3, TP.HCM",
      dateOfBirth: "2002-08-25T00:00:00.000Z",
      gender: false,
      greenWalletName: "Ví xanh",
      greenWalletBalance: 250000,
      dateCreated: "2024-02-15T10:00:00.000Z",
      universityId: 1,
      facultyId: 1,
      facultyName: "Công nghệ thông tin",
      majorId: 4,
      histories: [],
      vouchers: [],
      wishlists: [],
      orders: []
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

export const mockBrands = {
  result: [
    {
      id: 1,
      brandName: "Highland Coffee",
      logo: "https://example.com/highland.jpg"
    },
    {
      id: 2,
      brandName: "Phúc Long",
      logo: "https://example.com/phuclong.jpg"
    },
    {
      id: 3,
      brandName: "The Coffee House",
      logo: "https://example.com/thecoffeehouse.jpg"
    },
    {
      id: 4,
      brandName: "Gong Cha",
      logo: "https://example.com/gongcha.jpg"
    }
  ]
}; 