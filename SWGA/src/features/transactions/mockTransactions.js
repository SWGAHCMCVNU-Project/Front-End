export const mockTransactions = [
  {
    id: "HD001",
    storeName: "Trà sữa Quận 1",
    transactionDate: new Date("2024-03-15T09:30:00").getTime(),
    amount: 150000,
    paymentMethods: {
      voucher: true,
      cash: true,
      voucherAmount: 45000, // 30%
      cashAmount: 105000
    },
    voucherCode: "VC123",
    voucherPercent: 30,
    status: "completed",
    customer: {
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "nguyenvana@email.com",
      points: 100
    },
    items: [
      {
        name: "Trà sữa trân châu",
        quantity: 2,
        price: 25000,
        total: 50000
      },
      {
        name: "Trà sữa matcha",
        quantity: 2,
        price: 30000,
        total: 60000
      },
      {
        name: "Topping trân châu",
        quantity: 4,
        price: 10000,
        total: 40000
      }
    ]
  },
  {
    id: "HD002",
    storeName: "Trà sữa Quận 2",
    transactionDate: new Date("2024-03-14T14:20:00").getTime(),
    amount: 85000,
    paymentMethods: {
      voucher: false,
      cash: true,
      cashAmount: 85000
    },
    status: "completed",
    customer: {
      name: "Trần Thị B",
      phone: "0987654321",
      email: "tranthib@email.com",
      points: 85
    },
    items: [
      {
        name: "Trà sữa ô long",
        quantity: 2,
        price: 30000,
        total: 60000
      },
      {
        name: "Topping pudding",
        quantity: 1,
        price: 25000,
        total: 25000
      }
    ]
  },
  {
    id: "HD003",
    storeName: "Trà sữa Quận 7",
    transactionDate: new Date("2024-03-14T16:45:00").getTime(),
    amount: 120000,
    paymentMethods: {
      voucher: true,
      cash: false,
      voucherAmount: 120000, // 100%
      cashAmount: 0
    },
    voucherCode: "VC456",
    voucherPercent: 100,
    status: "completed",
    customer: {
      name: "Lê Văn C",
      phone: "0909123456",
      email: "levanc@email.com",
      points: 120
    },
    items: [
      {
        name: "Trà sữa chocolate",
        quantity: 3,
        price: 35000,
        total: 105000
      },
      {
        name: "Topping thạch",
        quantity: 3,
        price: 5000,
        total: 15000
      }
    ]
  },
  {
    id: "HD004",
    storeName: "Trà sữa Quận 5",
    transactionDate: new Date("2024-03-13T11:15:00").getTime(),
    amount: 95000,
    paymentMethods: {
      voucher: true,
      cash: true,
      voucherAmount: 28500, // 30%
      cashAmount: 66500
    },
    voucherCode: "VC789",
    voucherPercent: 30,
    status: "completed",
    customer: {
      name: "Phạm Thị D",
      phone: "0918234567",
      email: "phamthid@email.com",
      points: 95
    },
    items: [
      {
        name: "Trà sữa dâu",
        quantity: 2,
        price: 35000,
        total: 70000
      },
      {
        name: "Topping trân châu",
        quantity: 5,
        price: 5000,
        total: 25000
      }
    ]
  },
  {
    id: "HD005",
    storeName: "Trà sữa Quận 3",
    transactionDate: new Date("2024-03-13T13:40:00").getTime(),
    amount: 75000,
    paymentMethods: {
      voucher: false,
      cash: true,
      cashAmount: 75000
    },
    status: "completed",
    customer: {
      name: "Hoàng Văn E",
      phone: "0977888999",
      email: "hoangvane@email.com",
      points: 75
    },
    items: [
      {
        name: "Trà sữa thái xanh",
        quantity: 3,
        price: 25000,
        total: 75000
      }
    ]
  }
]; 