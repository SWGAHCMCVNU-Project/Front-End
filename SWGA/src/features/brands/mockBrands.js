export const mockBrands = {
  result: [
    {
      id: 1,
      brandName: "Highland Coffee",
      openingHours: "07:00",
      closingHours: "22:00",
      state: true,
      totalIncome: 15000000,
      totalSpending: 5000000,
      logo: "https://example.com/highland.jpg",
      coverPhoto: "https://example.com/highland-cover.jpg",
      description: "Chuỗi cà phê lớn nhất Việt Nam",
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
      phone: "0123456789",
      email: "highland@coffee.com",
      numberOfFollowers: 10000,
      greenWalletName: "Ví xanh",
      greenWalletBalance: 1000000,
      dateCreated: "2024-01-15T07:00:00.000Z",
      acronym: "HLC",
      campaigns: [
        {
          id: 1,
          campaignName: "Khuyến mãi hè 2024",
          startDate: "2024-06-01T00:00:00.000Z",
          endDate: "2024-08-31T00:00:00.000Z",
          totalCost: 5000000,
          state: true
        },
        {
          id: 2,
          campaignName: "Tết 2024",
          startDate: "2024-01-15T00:00:00.000Z",
          endDate: "2024-02-15T00:00:00.000Z",
          totalCost: 8000000,
          state: false
        }
      ],
      histories: [
        {
          id: 1,
          name: "Giao dịch #1",
          typeName: "Nạp tiền",
          amount: 1000000,
          rate: 1,
          transactionDate: "2024-03-15T10:30:00.000Z",
          state: true
        },
        {
          id: 2,
          name: "Giao dịch #2",
          typeName: "Rút tiền",
          amount: 500000,
          rate: 1,
          transactionDate: "2024-03-16T14:20:00.000Z",
          state: true
        }
      ],
      stores: [
        {
          id: 1,
          storeName: "Highland Coffee Nguyễn Huệ",
          address: "123 Nguyễn Huệ, Q1, TP.HCM",
          phone: "0123456789",
          openingHours: "07:00",
          closingHours: "22:00",
          state: true
        },
        {
          id: 2,
          storeName: "Highland Coffee Lê Lợi",
          address: "456 Lê Lợi, Q1, TP.HCM",
          phone: "0987654321",
          openingHours: "07:00",
          closingHours: "22:00",
          state: true
        }
      ],
      vouchers: [
        {
          id: 1,
          voucherName: "Giảm 50% Cà phê",
          price: 50000,
          rate: 1.5,
          numberOfItems: 100,
          numberOfItemsAvailable: 50,
          image: "https://example.com/voucher1.jpg",
          state: true
        },
        {
          id: 2,
          voucherName: "Mua 1 tặng 1",
          price: 100000,
          rate: 2,
          numberOfItems: 50,
          numberOfItemsAvailable: 20,
          image: "https://example.com/voucher2.jpg",
          state: true
        }
      ]
    },
    {
      id: 2,
      brandName: "Phúc Long Coffee & Tea",
      openingHours: "08:00",
      closingHours: "23:00",
      state: false,
      totalIncome: 12000000,
      totalSpending: 4000000,
      logo: "https://example.com/phuclong.jpg",
      coverPhoto: "https://example.com/phuclong-cover.jpg",
      description: "Thương hiệu trà & cà phê",
      address: "456 Lê Lợi, Q1, TP.HCM",
      phone: "0123456789",
      email: "phuclong@coffee.com",
      numberOfFollowers: 8000,
      greenWalletName: "Ví xanh",
      greenWalletBalance: 800000,
      dateCreated: "2024-01-15T08:00:00.000Z",
      acronym: "PL",
      campaigns: [
        {
          id: 3,
          campaignName: "Mùa hè sôi động",
          startDate: "2024-05-01T00:00:00.000Z",
          endDate: "2024-07-31T00:00:00.000Z",
          totalCost: 6000000,
          state: true
        }
      ],
      histories: [
        {
          id: 3,
          name: "Giao dịch #3",
          typeName: "Nạp tiền",
          amount: 800000,
          rate: 1,
          transactionDate: "2024-03-17T09:15:00.000Z",
          state: true
        }
      ],
      stores: [
        {
          id: 3,
          storeName: "Phúc Long Lê Lợi",
          address: "456 Lê Lợi, Q1, TP.HCM",
          phone: "0123456789",
          openingHours: "08:00",
          closingHours: "23:00",
          state: true
        }
      ],
      vouchers: [
        {
          id: 3,
          voucherName: "Giảm 30% Trà sữa",
          price: 40000,
          rate: 1.3,
          numberOfItems: 80,
          numberOfItemsAvailable: 40,
          image: "https://example.com/voucher3.jpg",
          state: true
        }
      ]
    },
    {
      id: 3,
      brandName: "The Coffee House",
      openingHours: "07:30",
      closingHours: "22:30",
      state: true,
      totalIncome: 18000000,
      totalSpending: 6000000,
      logo: "https://example.com/tch.jpg",
      coverPhoto: "https://example.com/tch-cover.jpg",
      description: "Chuỗi cà phê hiện đại",
      address: "789 Lý Tự Trọng, Q1, TP.HCM",
      phone: "0123456789",
      email: "tch@coffee.com",
      numberOfFollowers: 12000,
      greenWalletName: "Ví xanh",
      greenWalletBalance: 1200000,
      dateCreated: "2024-01-15T07:30:00.000Z",
      acronym: "TCH",
      campaigns: [
        {
          id: 4,
          campaignName: "Sinh nhật TCH",
          startDate: "2024-04-01T00:00:00.000Z",
          endDate: "2024-04-30T00:00:00.000Z",
          totalCost: 7000000,
          state: true
        }
      ],
      histories: [
        {
          id: 4,
          name: "Giao dịch #4",
          typeName: "Nạp tiền",
          amount: 1200000,
          rate: 1,
          transactionDate: "2024-03-18T11:45:00.000Z",
          state: true
        }
      ],
      stores: [
        {
          id: 4,
          storeName: "TCH Lý Tự Trọng",
          address: "789 Lý Tự Trọng, Q1, TP.HCM",
          phone: "0123456789",
          openingHours: "07:30",
          closingHours: "22:30",
          state: true
        }
      ],
      vouchers: [
        {
          id: 4,
          voucherName: "Combo Cà phê & Bánh",
          price: 75000,
          rate: 1.8,
          numberOfItems: 60,
          numberOfItemsAvailable: 30,
          image: "https://example.com/voucher4.jpg",
          state: true
        }
      ]
    },
    {
      id: 4,
      brandName: "Starbucks Vietnam",
      openingHours: "07:00",
      closingHours: "23:00",
      state: false,
      totalIncome: 25000000,
      totalSpending: 8000000,
      logo: "https://example.com/starbucks.jpg",
      coverPhoto: "https://example.com/starbucks-cover.jpg",
      description: "Chuỗi cà phê quốc tế",
      address: "101 Đồng Khởi, Q1, TP.HCM",
      phone: "0123456789",
      email: "starbucks@coffee.com",
      numberOfFollowers: 15000,
      greenWalletName: "Ví xanh",
      greenWalletBalance: 1500000,
      dateCreated: "2024-01-15T07:00:00.000Z",
      acronym: "SBV",
      campaigns: [
        {
          id: 5,
          campaignName: "Frappuccino Happy Hour",
          startDate: "2024-03-01T00:00:00.000Z",
          endDate: "2024-03-31T00:00:00.000Z",
          totalCost: 9000000,
          state: false
        }
      ],
      histories: [
        {
          id: 5,
          name: "Giao dịch #5",
          typeName: "Nạp tiền",
          amount: 1500000,
          rate: 1,
          transactionDate: "2024-03-19T13:20:00.000Z",
          state: true
        }
      ],
      stores: [
        {
          id: 5,
          storeName: "Starbucks Đồng Khởi",
          address: "101 Đồng Khởi, Q1, TP.HCM",
          phone: "0123456789",
          openingHours: "07:00",
          closingHours: "23:00",
          state: true
        }
      ],
      vouchers: [
        {
          id: 5,
          voucherName: "Free Size Up",
          price: 60000,
          rate: 1.6,
          numberOfItems: 120,
          numberOfItemsAvailable: 60,
          image: "https://example.com/voucher5.jpg",
          state: true
        }
      ]
    },
    {
      id: 5,
      brandName: "Trung Nguyên Legend",
      openingHours: "06:30",
      closingHours: "21:00",
      state: true,
      totalIncome: 20000000,
      totalSpending: 7000000,
      logo: "https://example.com/trungnguyenlegend.jpg",
      coverPhoto: "https://example.com/trungnguyenlegend-cover.jpg",
      description: "Thương hiệu cà phê Việt Nam",
      address: "202 Nguyễn Thị Minh Khai, Q3, TP.HCM",
      phone: "0123456789",
      email: "trungnguyenlegend@coffee.com",
      numberOfFollowers: 10000,
      greenWalletName: "Ví xanh",
      greenWalletBalance: 1000000,
      dateCreated: "2024-01-15T06:30:00.000Z",
      acronym: "TNL",
      campaigns: [
        {
          id: 6,
          campaignName: "Cà phê sáng",
          startDate: "2024-02-01T00:00:00.000Z",
          endDate: "2024-02-29T00:00:00.000Z",
          totalCost: 4000000,
          state: false
        }
      ],
      histories: [
        {
          id: 6,
          name: "Giao dịch #6",
          typeName: "Nạp tiền",
          amount: 1000000,
          rate: 1,
          transactionDate: "2024-03-20T08:50:00.000Z",
          state: true
        }
      ],
      stores: [
        {
          id: 6,
          storeName: "Trung Nguyên Legend NTMK",
          address: "202 Nguyễn Thị Minh Khai, Q3, TP.HCM",
          phone: "0123456789",
          openingHours: "06:30",
          closingHours: "21:00",
          state: true
        }
      ],
      vouchers: [
        {
          id: 6,
          voucherName: "Cà phê rang xay",
          price: 45000,
          rate: 1.4,
          numberOfItems: 90,
          numberOfItemsAvailable: 45,
          image: "https://example.com/voucher6.jpg",
          state: true
        }
      ]
    }
  ],
  currentPage: 1,
  pageSize: 10,
  pageCount: 1,
  rowCount: 5,
  totalCount: 5
};
