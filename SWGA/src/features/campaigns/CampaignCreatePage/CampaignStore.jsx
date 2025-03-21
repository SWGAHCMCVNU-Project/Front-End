import { Avatar, Card, Empty, Select, Spin, Table, Tag, Typography } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import imgDefaultStore from "../../../assets/images/store.png";
import { NextPrevContext } from "../../../context/NextPrevContext";
import { useStores } from "../../../hooks/store/useStores";
import "./scss/campaign.scss";

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

const StoreContainer = styled.div`
  margin-bottom: 60px;
`;

function CampaignStore({ selectStore, disabled = false, mode = "create" }) {
  const { Title } = Typography;
  const { newCampaign, setNewCampaign } = useContext(NextPrevContext);
  const { stores, error, isLoading } = useStores();
  
  // Khởi tạo selectedItems từ newCampaign
  const [selectedItems, setSelectedItems] = useState(() => {
    if (newCampaign?.storeIds && Array.isArray(newCampaign.storeIds)) {
      return newCampaign.storeIds;
    }
    return [];
  });

  // Tạo campaignStoreOptions từ stores
  const campaignStoreOptions = useMemo(() => {
    if (!stores?.result || !Array.isArray(stores.result)) {
      return [];
    }
    return stores.result
      .filter(c => c.state)
      .map(c => ({
        value: c.id,
        label: c.storeName,
        image: c.avatar,
        brand: c.brandName,
        area: c.areaName,
        areaId: c.areaId,
        address: c.address,
      }));
  }, [stores?.result]);

  // Cập nhật selectedItems khi newCampaign.storeIds thay đổi
  useEffect(() => {
    if (newCampaign?.storeIds && Array.isArray(newCampaign.storeIds)) {
      setSelectedItems(newCampaign.storeIds);
    }
  }, [newCampaign?.storeIds]);

  // Đảm bảo selectStore được gọi khi component mount và khi selectedItems thay đổi
  useEffect(() => {
    if (mode === "create" && selectStore && selectedItems.length > 0) {
      selectStore(selectedItems);
    }
  }, [mode, selectStore, selectedItems]);

  const handleSelectStore = value => {
    if (!Array.isArray(value)) return;
    
    setSelectedItems(value);
    
    if (mode === "create") {
      const campaignStores = value.map(storeId => ({
        storeId,
        description: '',
        state: true
      }));
      
      setNewCampaign(prev => ({
        ...prev,
        storeIds: value,
        campaignStores
      }));
    }
  };

  // Log errors
  useEffect(() => {
    if (error) {
      console.error("Error loading stores:", error);
    }
  }, [error]);

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

  const getData = () => {
    return selectedItems.map((value, index) => {
      const option = campaignStoreOptions.find(o => o.value === value);
      if (!option) return null;

      return {
        key: value,
        number: (
          <div className="number-header">
            <span>{index + 1}</span>
          </div>
        ),
        StoreName: (
          <Avatar.Group>
            <Avatar
              className="shape-avatar-product"
              shape="square"
              src={option.image || imgDefaultStore}
            />
            <div className="avatar-info">
              <Title className="title-product-name" level={5}>
                {option.label}
              </Title>
              <p className="p-column-table">Thương hiệu {option.brand}</p>
            </div>
          </Avatar.Group>
        ),
        Address: option.address ? (
          <div className="campaign-review-major">{option.address}</div>
        ) : (
          <span>Chưa cập nhật</span>
        ),
        Area: <div className="campaign-description-major">{option.area}</div>,
      };
    }).filter(Boolean);
  };

  const renderStoreSelector = () => {
    if (mode !== "create") return null;

    return (
      <Select
        mode="multiple"
        placeholder="Chọn cửa hàng..."
        onChange={handleSelectStore}
        className="select-campaign-major"
        style={{ width: "100%" }}
        showSearch={false}
        value={selectedItems}
        tagRender={({ value }) => {
          const option = campaignStoreOptions.find(o => o.value === value);
          if (!option) return null;
          return ( 
            <Tag className="tag-select-items" style={{marginTop: "5px"}}>
              <div className="div-option-major">
                <img
                  src={option.image || imgDefaultStore}
                  alt="store"
                  width={40}
                  height={40}
                />
                <label className="label-option-update">{option.label}</label>
              </div>
            </Tag>
          );
        }}
        maxTagCount={5}
        notFoundContent={
          <div className="font-empty">
            <Empty description={isLoading ? "Đang tải dữ liệu..." : "Không có cửa hàng nào"} />
          </div>
        }
        disabled={disabled || isLoading}
      >
        {campaignStoreOptions.map(item => (
          <Select.Option key={item.value} value={item.value} label={item.label}>
            <div className="select-campaign-container">
              <div className="div-option-major">
                <img
                  src={item.image || imgDefaultStore}
                  alt="store"
                  width={40}
                  height={40}
                />
                <label className="label-option-update">{item.label}</label>
              </div>
              <div>
                Khu vực: <span>{item.area}</span>
              </div>
              <div>
                Địa chỉ: <span>{item.address || "Chưa cập nhật"}</span>
              </div>
            </div>
          </Select.Option>
        ))}
      </Select>
    );
  };

  return (
    <StoreContainer>
      <Spin spinning={isLoading}>
        <Card className={mode === "review" ? "bottom-store-container" : ""}>
          <Header>
            <div>{mode === "create" ? "Chọn cửa hàng" : "Thông tin cửa hàng"}</div>
          </Header>
          {mode === "create" && renderStoreSelector()}
          <div className="container-table">
            {isLoading ? (
              <div className="font-empty">
                <Empty description="Đang tải dữ liệu..." />
              </div>
            ) : selectedItems.length === 0 ? (
              <div className="font-empty">
                <Empty
                  description={
                    mode === "create"
                      ? "Không có cửa hàng nào được chọn"
                      : "Danh sách cửa hàng trống"
                  }
                />
              </div>
            ) : (
              <Table
                className="tbl-msc"
                pagination={false}
                columns={columns}
                dataSource={getData()}
                locale={{
                  emptyText: (
                    <div className="font-empty">
                      <Empty description="Danh sách cửa hàng trống" />
                    </div>
                  ),
                }}
              />
            )}
          </div>
        </Card>
      </Spin>
    </StoreContainer>
  );
}

CampaignStore.propTypes = {
  selectStore: PropTypes.func,
  disabled: PropTypes.bool,
  mode: PropTypes.oneOf(["create", "review"]),
};

export default CampaignStore; 