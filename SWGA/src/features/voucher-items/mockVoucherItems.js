export const mockVoucherItems = {
  result: [
    {
      id: "VI001",
      voucherImage: "https://example.com/images/voucher1.jpg",
      dateCreated: "2024-03-15T09:30:00",
      voucherName: "Voucher giảm giá 30%",
      voucherCode: "SALE30",
      price: 30000,
      rate: 1.5,
      status: "active",
      description: "Voucher giảm giá 30% cho tất cả đồ uống",
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
        }
      ]
    },
    {
      id: "VI002", 
      voucherImage: "https://example.com/images/voucher2.jpg",
      dateCreated: "2024-03-14T14:20:00",
      voucherName: "Voucher mua 1 tặng 1",
      voucherCode: "BUY1GET1",
      price: 50000,
      rate: 2,
      status: "active",
      description: "Mua 1 tặng 1 cho tất cả đồ uống"
    },
    {
      id: "VI003",
      voucherImage: "https://example.com/images/voucher3.jpg", 
      dateCreated: "2024-03-13T11:15:00",
      voucherName: "Voucher giảm 50k",
      voucherCode: "SAVE50K",
      price: 50000,
      rate: 1,
      status: "active",
      description: "Giảm 50.000đ cho hóa đơn từ 100.000đ"
    },
    {
      id: "VI004",
      voucherImage: "https://example.com/images/voucher4.jpg",
      dateCreated: "2024-03-12T16:45:00", 
      voucherName: "Voucher sinh nhật",
      voucherCode: "BIRTHDAY",
      price: 100000,
      rate: 2.5,
      status: "active",
      description: "Voucher đặc biệt cho sinh nhật"
    },
    {
      id: "VI005",
      voucherImage: "https://example.com/images/voucher5.jpg",
      dateCreated: "2024-03-11T10:30:00",
      voucherName: "Voucher khách VIP",
      voucherCode: "VIP100K",
      price: 100000,
      rate: 3,
      status: "active", 
      description: "Voucher dành riêng cho khách VIP"
    }
  ],
  currentPage: 1,
  pageSize: 10,
  pageCount: 1,
  rowCount: 5,
  totalCount: 5
};

// Mock cho filter vouchers
export const mockVouchersFilter = {
  result: [
    {
      id: "V001",
      voucherName: "Voucher giảm giá 30%"
    },
    {
      id: "V002", 
      voucherName: "Voucher mua 1 tặng 1"
    },
    {
      id: "V003",
      voucherName: "Voucher giảm 50k"
    },
    {
      id: "V004",
      voucherName: "Voucher sinh nhật"
    },
    {
      id: "V005",
      voucherName: "Voucher khách VIP"
    }
  ]
};

// Mock function cho việc tạo voucher item đơn lẻ
export const mockCreateVoucherItemResponse = (newVoucherItem) => {
  const newVoucher = {
    id: `VI${String(mockVoucherItems.result.length + 1).padStart(3, '0')}`,
    voucherImage: "https://example.com/images/voucher-new.jpg",
    dateCreated: new Date().toISOString(),
    status: "active",
    ...newVoucherItem
  };
  
  mockVoucherItems.result.push(newVoucher);
  mockVoucherItems.totalCount += 1;
  mockVoucherItems.rowCount += 1;

  return {
    filename: "VoucherItems_Result",
    responseData: newVoucher
  };
};

// Mock function cho việc tạo nhiều voucher items từ template
export const mockCreateVoucherTemplateResponse = () => {
  const newVouchers = Array(5).fill().map((_, index) => ({
    id: `VI${String(mockVoucherItems.result.length + index + 1).padStart(3, '0')}`,
    voucherImage: "https://example.com/images/voucher-template.jpg",
    dateCreated: new Date().toISOString(),
    voucherName: `Voucher Template ${index + 1}`,
    voucherCode: `TEMPLATE${index + 1}`,
    price: 50000,
    rate: 1.5,
    status: "active",
    description: "Voucher được tạo từ template"
  }));

  mockVoucherItems.result.push(...newVouchers);
  mockVoucherItems.totalCount += newVouchers.length;
  mockVoucherItems.rowCount += newVouchers.length;

  return {
    filename: "VoucherItems_Result",
    responseData: newVouchers
  };
};

// Thêm mock cho getVoucherItemTemplateUrl
export const mockGetVoucherItemTemplateUrl = () => {
  // Giả lập tạo và tải xuống file Excel template
  const templateData = new Blob(['Mock Excel Template Data'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(templateData);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'VoucherItemTemplate.xlsx');
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
}; 