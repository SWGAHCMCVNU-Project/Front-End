import { Avatar, Card, Empty, Spin, Table, Typography } from "antd";
import React, { useContext, useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import imgDefaultStore from "../../../assets/images/store.png";
import { NextPrevContext } from "../../../context/NextPrevContext";
import { useStores } from "../../../hooks/store/useStores";

const Header = styled.header`
  color: var(--color-green-600);
  font-size: 1.7rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.7rem;
    margin-bottom: 10px;
  }
`;

function ReviewCampaignStore() {
  const { Title } = Typography;
  const { newCampaign, setNewCampaign } = useContext(NextPrevContext); // Thêm setNewCampaign
  const { stores, error, isLoading } = useStores(); // Lấy stores từ useStores
  const [campaignStoreOptions, setCampaignStoreOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Memoize filtered stores để tránh lặp không cần thiết
  const filteredCampaignStores = useMemo(() => {
    const filtered = stores?.result?.filter((c) => c.state) || [];
    // console.log("Filtered stores:", filtered); // Chỉ log một lần khi filtered thay đổi
    return filtered;
  }, [stores?.result]);

  // Cập nhật campaignStoreOptions khi filteredCampaignStores thay đổi
  useEffect(() => {
    if (filteredCampaignStores.length > 0) {
      setCampaignStoreOptions(
        filteredCampaignStores.map((c) => ({
          value: c.id,
          label: c.storeName,
          image: c.avatar,
          brand: c.brandName,
          area: c.areaName,
          areaId: c.areaId,
          address: c.address,
        }))
      );
    } else {
      setCampaignStoreOptions([]);
      // console.log("No stores found with state=true or stores is empty");
    }
  }, [filteredCampaignStores]);

  // Cập nhật selectedItems khi newCampaign hoặc campaignStoreOptions thay đổi
  useEffect(() => {
    if (newCampaign?.campaignStores !== undefined) {
      const selectedStoreIds = newCampaign?.campaignStores?.map((option) => option.storeId) || [];
      // console.log("Selected store IDs from newCampaign:", selectedStoreIds);
      setSelectedItems(selectedStoreIds);
    } else if (campaignStoreOptions.length > 0) {
      const initialSelectedIds = campaignStoreOptions.map((option) => option.value);
      // console.log("Initial selected IDs from campaignStoreOptions:", initialSelectedIds);
      setSelectedItems(initialSelectedIds);
    }
  }, [newCampaign?.campaignStores, campaignStoreOptions]);

  // Cập nhật newCampaign.storeIds khi selectedItems thay đổi
  useEffect(() => {
    setNewCampaign((prev) => ({
      ...prev,
      storeIds: selectedItems, // Cập nhật storeIds vào newCampaign
    }));
    // console.log("Updated newCampaign.storeIds:", selectedItems);
  }, [selectedItems, setNewCampaign]);

  // Log dữ liệu từ useStores để debug
  useEffect(() => {
    // console.log("Stores data from useStores:", stores);
    // console.log("Error from useStores:", error);
  }, [stores, error]);

  const columns = [
    {
      title: "STT",
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "StoreName",
      key: "StoreName",
    },
    {
      title: "Địa chỉ",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "Khu vực",
      dataIndex: "Area",
      key: "Area",
    },
  ];

  const data = selectedItems.map((value, index) => {
    const dataIndex = index + 1;
    const option = campaignStoreOptions.find((o) => o.value === value);
    const avatarSrc = option?.image !== null ? option?.image : imgDefaultStore;

    if (!option) {
      console.warn(`No option found for value: ${value}`);
      return null;
    }

    return {
      key: value,
      number: (
        <div className="number-header">
          <span>{dataIndex}</span>
        </div>
      ),
      StoreName: (
        <Avatar.Group>
          <Avatar className="shape-avatar-product" shape="square" src={avatarSrc} />
          <div className="avatar-info">
            <Title className="title-product-name" level={5}>
              {option?.label}
            </Title>
            <p className="p-column-table">Thương hiệu {option?.brand}</p>
          </div>
        </Avatar.Group>
      ),
      Address: option?.address ? (
        <div className="campaign-review-major">{option?.address}</div>
      ) : (
        <span>Chưa cập nhật</span>
      ),
      Area: <div className="campaign-description-major">{option?.area}</div>,
    };
  }).filter((item) => item !== null);

  return (
    <Card>
      <Header>
        <div>Cửa hàng</div>
      </Header>
      <div className="container-table">
        <Spin spinning={isLoading}>
          <Table
            className="tbl-msc"
            pagination={false}
            columns={columns}
            dataSource={data}
            locale={{
              emptyText: (
                <div className="font-empty">
                  <Empty description="Danh sách cửa hàng trống" />
                </div>
              ),
            }}
          />
        </Spin>
      </div>
    </Card>
  );
}

export default ReviewCampaignStore;