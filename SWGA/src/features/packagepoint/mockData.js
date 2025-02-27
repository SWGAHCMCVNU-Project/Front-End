const mockPackages = [
  {
    id: 1,
    name: "Gói Điểm Cơ Bản",
    points: 100,
    price: 50000,
    description: "Gói điểm dành cho Campus nhỏ.",
    state: "active",
  },
  {
    id: 2,
    name: "Gói Điểm Nâng Cao",
    points: 500,
    price: 200000,
    description: "Gói điểm cho Campus lớn.",
    state: "active",
  },
  {
    id: 3,
    name: "Gói Điểm Đặc Biệt",
    points: 1000,
    price: 500000,
    description: "Gói điểm cao cấp.",
    state: "active",
  },
];

const mockCampusPackages = [
  // Gói đang sử dụng (mới nhất) của Campus
  {
    id: 1,
    packageId: 2, // Gói Điểm Nâng Cao
    campusId: 1, // Giả định Campus ID = 1
    pointsPurchased: 500,
    pricePaid: 250000, // Giả định đã nâng cấp từ Gói Cơ Bản
    purchaseDate: "2023-10-01", // Ngày mua gói đầu tiên (Gói Cơ Bản)
    expiryDate: "2024-04-01", // Ngày hết hạn
    pointsUsed: 100, // Số điểm đã sử dụng
    pointsRemaining: 400, // Số điểm còn lại
    state: "active",
    upgradeDate: "2023-11-01", // Ngày nâng cấp từ Gói Cơ Bản lên Nâng Cao
  },
  // Lịch sử giao dịch: Gói cũ (Gói Cơ Bản)
  {
    id: 2,
    packageId: 1, // Gói Điểm Cơ Bản
    campusId: 1,
    pointsPurchased: 100,
    pricePaid: 50000,
    purchaseDate: "2023-09-01",
    expiryDate: "2023-12-01", // Gói đã hết hạn
    pointsUsed: 80,
    pointsRemaining: 20,
    state: "inactive", // Gói không còn hoạt động
    upgradeDate: null, // Không nâng cấp từ gói này
  },
];

export default { mockPackages, mockCampusPackages };