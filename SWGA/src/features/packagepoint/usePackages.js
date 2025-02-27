import { useState, useEffect } from "react";
import mockData from "./mockData"; // Import dữ liệu mock

function usePackages(searchTerm = "", filterState = "") {
  const [packages, setPackages] = useState(mockData.mockCampusPackages);
  const [currentPackage, setCurrentPackage] = useState(
    mockData.mockCampusPackages.find((pkg) => pkg.state === "active") || null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      let filteredPackages = [...mockData.mockCampusPackages];

      if (searchTerm) {
        filteredPackages = filteredPackages.filter((pkg) =>
          mockData.mockPackages.find((p) => p.id === pkg.packageId)?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          new Date(pkg.purchaseDate).toLocaleDateString().includes(searchTerm) ||
          (pkg.upgradeDate && new Date(pkg.upgradeDate).toLocaleDateString().includes(searchTerm))
        );
      }

      if (filterState) {
        filteredPackages = filteredPackages.filter(
          (pkg) => pkg.state === filterState
        );
      }

      // Cập nhật thời gian còn lại (daysRemaining) cho gói hiện tại
      const updatedPackages = filteredPackages.map((pkg) => {
        const expiryDate = new Date(pkg.expiryDate);
        const today = new Date();
        const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        return {
          ...pkg,
          packageName: mockData.mockPackages.find((p) => p.id === pkg.packageId)?.name || "Không rõ",
          daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
          isExpired: daysRemaining <= 0,
          canUpgrade: pkg.pointsPurchased < mockData.mockPackages[mockData.mockPackages.length - 1].points, // Có thể nâng cấp nếu chưa phải gói lớn nhất
        };
      });

      setPackages(updatedPackages);
      setCurrentPackage(updatedPackages.find((pkg) => pkg.state === "active") || null);
      setIsLoading(false);
    }, 1000);
  }, [searchTerm, filterState]);

  const buyPackage = (packageData) => {
    setPackages((prev) => [
      ...prev,
      {
        ...packageData,
        id: Date.now(),
        purchaseDate: new Date().toISOString().split("T")[0],
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
        pointsUsed: 0,
        pointsRemaining: packageData.pointsPurchased,
        state: "active",
        upgradeDate: null,
      },
    ]);
    setCurrentPackage({
      ...packageData,
      id: Date.now(),
      purchaseDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      pointsUsed: 0,
      pointsRemaining: packageData.pointsPurchased,
      state: "active",
      upgradeDate: null,
      packageName: mockData.mockPackages.find((pkg) => pkg.id === packageData.packageId)?.name || "Không rõ",
      daysRemaining: 365,
      isExpired: false,
      canUpgrade: packageData.pointsPurchased < mockData.mockPackages[mockData.mockPackages.length - 1].points,
    });
  };

  const upgradePackage = (packageId, newPackageId) => {
    const newPackage = mockData.mockPackages.find((pkg) => pkg.id === newPackageId);
    if (newPackage) {
      setPackages((prev) =>
        prev.map((pkg) =>
          pkg.id === packageId
            ? {
                ...pkg,
                packageId: newPackage.id,
                pointsPurchased: newPackage.points,
                pricePaid: pkg.pricePaid + newPackage.price, // Giả định cộng thêm chi phí nâng cấp
                pointsRemaining: pkg.pointsRemaining + newPackage.points - pkg.pointsPurchased,
                packageName: newPackage.name,
                upgradeDate: new Date().toISOString().split("T")[0],
                expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
                state: "active",
                canUpgrade: newPackage.points < mockData.mockPackages[mockData.mockPackages.length - 1].points,
              }
            : pkg
        )
      );
      setCurrentPackage((prev) =>
        prev.id === packageId
          ? {
              ...prev,
              packageId: newPackage.id,
              pointsPurchased: newPackage.points,
              pricePaid: prev.pricePaid + newPackage.price,
              pointsRemaining: prev.pointsRemaining + newPackage.points - prev.pointsPurchased,
              packageName: newPackage.name,
              upgradeDate: new Date().toISOString().split("T")[0],
              expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
              state: "active",
              canUpgrade: newPackage.points < mockData.mockPackages[mockData.mockPackages.length - 1].points,
            }
          : prev
      );
    }
  };

  const renewPackage = (packageId) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === packageId
          ? {
              ...pkg,
              expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
              state: "active",
              upgradeDate: new Date().toISOString().split("T")[0], // Cập nhật ngày gia hạn
            }
          : pkg
      )
    );
    setCurrentPackage((prev) =>
      prev.id === packageId
        ? {
            ...prev,
            expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
            state: "active",
            upgradeDate: new Date().toISOString().split("T")[0], // Cập nhật ngày gia hạn
          }
        : prev
    );
  };

  const cancelPackage = (packageId) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === packageId ? { ...pkg, state: "inactive" } : pkg
      )
    );
    if (currentPackage && currentPackage.id === packageId) {
      setCurrentPackage(null);
    }
  };

  return {
    packages, // Lịch sử giao dịch (tất cả gói)
    currentPackage, // Gói đang sử dụng (active)
    isLoading,
    buyPackage,
    upgradePackage,
    renewPackage,
    cancelPackage,
  };
}

export default usePackages;