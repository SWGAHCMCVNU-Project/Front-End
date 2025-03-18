import { Avatar, Card, Empty, Select, Spin, Table, Tag, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import imgDefaultStore from "../../../assets/images/store.png";
import { NextPrevContext } from "../../../context/NextPrevContext";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
import "./scss/create-campaign-store.scss";
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

function CreateCampaignStore({ selectStore, disabled }) {
    const { Title } = Typography;
    const { newCampaign } = useContext(NextPrevContext);
    const { isLoading, stores, error } = useStores();
    const [campaignStoreOptions, setCampaignStoreOptions] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedStores, setSelectedStores] = useState([]);
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        if (!hasInitialized && !isLoading && stores && Array.isArray(stores.result)) {
            // console.log("stores from useStores:", stores);
            // console.log("error from useStores:", error);
            getStoreSelectBox();
            setHasInitialized(true);
        }
    }, [stores, isLoading, hasInitialized]);

    const getStoreSelectBox = () => {
        if (!Array.isArray(stores.result)) {
            console.warn("stores.result is not an array:", stores.result);
            setCampaignStoreOptions([]);
            return;
        }

        const filteredStores = stores.result.filter(c => c.state);
        if (filteredStores?.length > 0) {
            setCampaignStoreOptions(filteredStores.map(c => ({
                value: c.id,
                label: c.storeName,
                image: c.avatar,
                brand: c.brandName,
                area: c.areaName,
                areaId: c.areaId,
                address: c.address
            })));
        } else {
            setCampaignStoreOptions([]);
            // console.log("No stores found with state=true or stores.result is empty");
        }
    };

    useEffect(() => {
        if (newCampaign?.campaignStores !== undefined) {
            const selectedStoreIds = newCampaign?.campaignStores?.map((option) => option.storeId) || [];
            setSelectedItems(selectedStoreIds);
            setSelectedStores(newCampaign?.campaignStores || []);
        } else if (campaignStoreOptions?.length > 0) {
            const initialSelectedIds = campaignStoreOptions.map(option => option.value);
            setSelectedItems(initialSelectedIds);
            setSelectedStores(campaignStoreOptions.map((option) => ({
                storeId: option.value,
                description: '',
                state: true
            })));
        }
    }, [campaignStoreOptions, newCampaign]);

    useEffect(() => {
        // console.log("Selected Stores in CreateCampaignStore:", selectedStores); // Debug log
        if (selectedStores.length > 0) {
            selectStore(selectedStores);
        } else {
            selectStore([]);
        }
    }, [selectedStores, selectStore]);

    const columns = [
        {
            title: "STT",
            dataIndex: "number",
            key: "number",
            align: "center"
        },
        {
            title: "Tên cửa hàng",
            dataIndex: "StoreName",
            key: "StoreName"
        },
        {
            title: "Địa chỉ",
            dataIndex: "Address",
            key: "Address",
            align: "center"
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <ButtonCustom
                    onClick={() => handleDelete(record)}
                    disabled={disabled}
                >
                    Xóa
                </ButtonCustom>
            ),
        }
    ];

    const data = selectedItems.map((value, index) => {
        const dataIndex = index + 1;
        const option = campaignStoreOptions.find((o) => o.value === value);
        const avatarSrc = option?.image !== null ? option?.image : imgDefaultStore;

        return {
            key: value,
            number: <div className="number-header"><span>{dataIndex}</span></div>,
            StoreName: (
                <Avatar.Group>
                    <Avatar className="shape-avatar-product" shape="square" src={avatarSrc} />
                    <div className="avatar-info">
                        <Title className="title-product-name" level={5}>{option?.label}</Title>
                        <p className="p-column-table">Thương hiệu {option?.brand} tại {option?.area}</p>
                    </div>
                </Avatar.Group>
            ),
            Address: option?.address ? (
                <div className="campaign-description-major">{option?.address}</div>
            ) : (
                <span>Chưa cập nhật</span>
            )
        };
    });

    const handleSelectStore = (value) => {
        setSelectedItems(value);

        const updatedItems = value.map((option) => ({
            storeId: option,
            description: '',
            state: true
        }));

        setSelectedStores((prevSelectedItems) => {
            const existingIds = prevSelectedItems.map((item) => item.storeId);
            const uniqueItems = updatedItems.filter((item) => !existingIds.includes(item.storeId));
            return [...prevSelectedItems, ...uniqueItems];
        });
    };

    const optionsForSelect = campaignStoreOptions;

    const handleDelete = (record) => {
        const updatedItems = selectedItems.filter((item) => item !== record.key);
        const updatedSelectedStores = selectedStores.filter((item) => item.storeId !== record.key);
        setSelectedItems(updatedItems);
        setSelectedStores(updatedSelectedStores);
    };

    return (
        <Card>
            <Header><div>Chọn cửa hàng</div></Header>
            <div>
                <Select
                    mode="multiple"
                    placeholder="Chọn cửa hàng..."
                    onChange={handleSelectStore}
                    className="select-campaign-major"
                    style={{ width: '100%' }}
                    showSearch={false}
                    value={selectedItems}
                    tagRender={(props) => {
                        const option = campaignStoreOptions.find((option) => option.value === props.value);
                        if (!option) return null;
                        return (
                            <Tag className="tag-select-items">
                                <div className="div-option-major">
                                    <img src={option.image !== null ? option.image : imgDefaultStore} alt="store" width={40} height={40} />
                                    <label className="label-option-update">{option.label}</label>
                                </div>
                            </Tag>
                        );
                    }}
                    maxTagCount={5}
                    notFoundContent={<div className="font-empty"><Empty description="Đã hết cửa hàng để chọn" /></div>}
                    disabled={disabled || isLoading}
                >
                    {optionsForSelect.map((item) => (
                        <Select.Option key={item.value} value={item.value} label={item.label}>
                            <div className="select-campaign-container">
                                <div className="div-option-major">
                                    <img src={item.image !== null ? item.image : imgDefaultStore} alt="store" width={40} height={40} />
                                    <label className="label-option-update">{item.label}</label>
                                </div>
                                <div>Khu vực: {item.area}</div>
                            </div>
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="container-table">
                <Spin spinning={isLoading}>
                    <Table
                        className="tbl-msc"
                        pagination={false}
                        columns={columns}
                        dataSource={data}
                        locale={{ emptyText: <div className="font-empty"><Empty description="Danh sách cửa hàng trống" /></div> }}
                    />
                </Spin>
            </div>
        </Card>
    );
}

export default CreateCampaignStore;