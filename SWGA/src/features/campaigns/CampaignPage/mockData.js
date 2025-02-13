export const mockCampaigns = {
    result: [
        {
            id: 1,
            campaignName: "Chiến dịch mùa hè",
            typeName: "Khuyến mãi",
            brandName: "Thương hiệu A",
            startOn: "2024-03-10",
            endOn: "2024-04-10",
            totalIncome: 1000000,
            totalSpending: 500000,
            currentStateName: "Hoạt động",
            currentStateId: 3,
            image: null
        },
        {
            id: 2,
            campaignName: "Chiến dịch mùa thu",
            typeName: "Tích điểm",
            brandName: "Thương hiệu B",
            startOn: "2024-04-15",
            endOn: "2024-05-15",
            totalIncome: 2000000,
            totalSpending: 800000,
            currentStateName: "Chờ duyệt",
            currentStateId: 1,
            image: null
        }
    ],
    totalCount: 2
};

export const mockBrands = [
    { id: 1, brandName: "Thương hiệu A" },
    { id: 2, brandName: "Thương hiệu B" },
    { id: 3, brandName: "Thương hiệu C" }
];

export const mockCampaignTypes = [
    { id: 1, typeName: "Khuyến mãi" },
    { id: 2, typeName: "Tích điểm" },
    { id: 3, typeName: "Đổi quà" }
]; 