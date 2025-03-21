import {
  Avatar,
  Card,
  Empty,
  Input,
  Select,
  Table,
  Tag,
  Typography,
  Spin,
} from "antd";
import React, { useContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import imgDefaultVoucher from "../../../assets/images/coupon.png";
import greenBean from "../../../assets/images/dauxanh.png";
import { NextPrevContext } from "../../../context/NextPrevContext";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
import { formatCurrency } from "../../../utils/helpers";
import "./scss/create-campaign-voucher.scss";
import { useVouchers } from "../../../hooks/voucher/useVouchers";

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

const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
`;

const TotalIncome = styled.span`
  color: #2ecc71;
  margin-left: 1.3rem;
  font-weight: 600;
`;

const TotalCost = styled.span`
  color: #2ecc71;
  margin-left: 0.7rem;
  font-weight: 600;
  font-size: 1.6rem;
`;

const VoucherContainer = styled.div`
  margin-bottom: 60px;
`;

function CreateCampaignVoucher({ selectVoucher, cost, disabled }) {
  const { Title } = Typography;
  const { newCampaign, setNewCampaign } = useContext(NextPrevContext);
  const { vouchers, isLoading, error } = useVouchers();
  const [campaignVoucherOptions, setCampaignVoucherOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedVouchers, setSelectedVouchers] = useState([]);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [editingRecord, setEditingRecord] = useState({});
  const [editingQuantity, setEditingQuantity] = useState(0);
  const [editingDescription, setEditingDescription] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (
      !hasInitialized &&
      !isLoading &&
      vouchers &&
      vouchers.data &&
      Array.isArray(vouchers.data.items)
    ) {
      getVoucherSelectBox();
      setHasInitialized(true);
    }
  }, [vouchers, isLoading, hasInitialized]);

  useEffect(() => {
    if (error) {
      toast.error("Không thể tải danh sách voucher");
    }
  }, [error]);

  const getVoucherSelectBox = () => {
    if (!vouchers || !vouchers.data || !Array.isArray(vouchers.data.items)) {
      console.warn(
        "Vouchers is not an array or data is not available:",
        vouchers
      );
      setCampaignVoucherOptions([]);
      return;
    }

    const filteredVouchers = vouchers.data.items.filter((c) => c.state);
    if (filteredVouchers?.length > 0) {
      setCampaignVoucherOptions(
        filteredVouchers.map((c) => ({
          value: c.id,
          label: c.voucherName,
          image: c.image,
          brand: c.brandName,
          price: c.price,
          rate: c.rate,
          numberOfItems: c.numberOfItemsAvailable,
          quantity: 1,
        }))
      );
    } else {
      setCampaignVoucherOptions([]);
    }
  };

  // Initialize selectedVouchers from newCampaign.campaignDetails
  useEffect(() => {
    if (!hasInitialized) return;

    if (newCampaign?.campaignDetails) {
      if (
        typeof newCampaign.campaignDetails === "string" &&
        newCampaign.campaignDetails !== ""
      ) {
        try {
          const parsedDetails = JSON.parse(`[${newCampaign.campaignDetails}]`);
          const selectedVoucherIds =
            parsedDetails.map((option) => option.voucherId) || [];
          setSelectedItems(selectedVoucherIds);
          setSelectedVouchers(parsedDetails);
        } catch (e) {
          console.error("Error parsing campaignDetails:", e);
          setSelectedItems([]);
          setSelectedVouchers([]);
        }
      } else if (
        Array.isArray(newCampaign.campaignDetails) &&
        newCampaign.campaignDetails.length > 0
      ) {
        const selectedVoucherIds =
          newCampaign.campaignDetails.map((option) => option.voucherId) || [];
        setSelectedItems(selectedVoucherIds);
        setSelectedVouchers(newCampaign.campaignDetails);
      }
    } else if (campaignVoucherOptions?.length > 0) {
      const initialSelectedIds = campaignVoucherOptions.map(
        (option) => option.value
      );
      setSelectedItems(initialSelectedIds);
      setSelectedVouchers(
        campaignVoucherOptions.map((option) => ({
          voucherId: option.value,
          quantity: 1,
          fromIndex: 1,
          description: option.label,
          state: true,
        }))
      );
    }
  }, [campaignVoucherOptions, hasInitialized, newCampaign]);

  const calculateTotal = () => {
    let sum = 0;
    selectedVouchers.forEach((voucher) => {
      const { voucherId, quantity } = voucher;
      const matchedOption = campaignVoucherOptions.find(
        (option) => option.value === voucherId
      );
      if (matchedOption) {
        const { price, rate } = matchedOption;
        sum += price * rate * quantity;
      }
    });
    return sum;
  };

  // Update total and notify parent component when selectedVouchers change
  useEffect(() => {
    const newTotal = calculateTotal();
    setTotal(newTotal);
    selectVoucher(selectedVouchers);
    cost(newTotal);

    // Update newCampaign only if necessary (e.g., when the user saves or submits)
    setNewCampaign((prev) => ({
      ...prev,
      campaignDetails: selectedVouchers.length > 0 ? selectedVouchers : [],
    }));
  }, [selectedVouchers, selectVoucher, cost, setNewCampaign]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    setEditingQuantity(record.Quantity);
    setEditingDescription(record.Description || "");
    setEditingRecord({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
    setEditingRecord({});
    setEditingDescription("");
  };

  const handleSave = (record) => {
    const optionIndex = campaignVoucherOptions.findIndex(
      (o) => o.value === record.key
    );
    if (optionIndex !== -1) {
      const updatedOptions = [...campaignVoucherOptions];
      const availableQuantity = updatedOptions[optionIndex].numberOfItems;

      if (
        editingQuantity > 0 &&
        (availableQuantity === null || editingQuantity <= availableQuantity)
      ) {
        updatedOptions[optionIndex] = {
          ...updatedOptions[optionIndex],
          quantity: editingQuantity,
        };
        setCampaignVoucherOptions(updatedOptions);

        const updatedVouchers = selectedVouchers.map((voucher) => {
          if (voucher.voucherId === updatedOptions[optionIndex].value) {
            return {
              ...voucher,
              quantity: editingQuantity || 1,
              description: editingDescription || voucher.description,
            };
          }
          return voucher;
        });
        setSelectedVouchers(updatedVouchers);
      } else {
        toast.error(`Số lượng không được vượt quá ${availableQuantity}`);
      }
    }
    setEditingKey("");
    setEditingRecord({});
    setEditingDescription("");
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: "Tên voucher",
      dataIndex: "VoucherName",
      key: "VoucherName",
    },
    {
      title: "Tỉ lệ chuyển đổi",
      dataIndex: "Rate",
      key: "Rate",
      align: "center",
    },
    {
      title: "Chi phí",
      dataIndex: "Price",
      key: "Price",
      align: "center",
    },
    {
      title: "Tồn kho",
      dataIndex: "Available",
      key: "Available",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "Quantity",
      key: "Quantity",
      align: "center",
      render: (_, record) => {
        const availableQuantity =
          record.Available?.props?.children || record.Available;
        return (
          <>
            {editingRecord.key === record.key ? (
              <div>
                <Input
                  type="number"
                  value={editingQuantity}
                  onChange={(e) =>
                    setEditingQuantity(parseInt(e.target.value, 10))
                  }
                  min="1"
                  max={availableQuantity || Infinity}
                  className="input-edit-quantity"
                />
              </div>
            ) : (
              <StackedTime>
                <span>
                  <TotalIncome>{record.Quantity}</TotalIncome>
                </span>
              </StackedTime>
            )}
          </>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key: "Description",
      align: "center",
      render: (_, record) => (
        <>
          {editingRecord.key === record.key ? (
            <div>
              <Input
                type="text"
                value={editingDescription}
                onChange={(e) => setEditingDescription(e.target.value)}
                className="input-edit-description"
              />
            </div>
          ) : (
            <StackedTime>
              <span>{record.Description || "Chưa có mô tả"}</span>
            </StackedTime>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        const isSelected = selectedItems.includes(record.key);

        return isSelected ? (
          editable ? (
            <>
              <ButtonCustom
                className="btn-action-layout"
                onClick={() => handleSave(record)}
              >
                Lưu
              </ButtonCustom>
              <ButtonCustom onClick={cancel}>Hủy</ButtonCustom>
            </>
          ) : (
            <>
              <ButtonCustom
                className="btn-action-layout"
                onClick={() => edit(record)}
                disabled={disabled}
              >
                Sửa
              </ButtonCustom>
              <ButtonCustom
                onClick={() => handleDelete(record)}
                disabled={disabled}
              >
                Xóa
              </ButtonCustom>
            </>
          )
        ) : null;
      },
    },
  ];

  const data = selectedItems.map((value, index) => {
    const dataIndex = index + 1;
    const option = campaignVoucherOptions.find((o) => o.value === value);
    const selectedVoucher = selectedVouchers.find((v) => v.voucherId === value);
    const avatarSrc = option?.image !== null ? option?.image : imgDefaultVoucher;

    return {
      key: value,
      number: (
        <div className="number-header">
          <span>{dataIndex}</span>
        </div>
      ),
      VoucherName: (
        <Avatar.Group>
          <Avatar
            className="shape-avatar-product"
            shape="square"
            src={avatarSrc}
          />
          <div className="avatar-info">
            <Title className="title-product-name" level={5}>
              {option?.label}
            </Title>
            <p className="p-column-table">Thương hiệu {option?.brand}</p>
          </div>
        </Avatar.Group>
      ),
      Rate: option?.rate ? (
        <StackedTime>
          <span>
            <TotalIncome>{option?.rate}</TotalIncome>
          </span>
        </StackedTime>
      ) : (
        <span>Chưa cập nhật</span>
      ),
      Price: option?.price ? (
        <StackedTime>
          <span>
            <TotalIncome>
              {option?.price.toLocaleString("vi-VN")}
              <img className="shape-avatar-campaign-bean" src={greenBean} />
            </TotalIncome>
          </span>
        </StackedTime>
      ) : (
        <span>Chưa cập nhật</span>
      ),
      Available: option?.numberOfItems ? (
        <TotalIncome>{option?.numberOfItems}</TotalIncome>
      ) : (
        <span>Chưa cập nhật</span>
      ),
      Quantity: selectedVoucher?.quantity || 1,
      Description: selectedVoucher?.description || "",
    };
  });

  const MIN_ROWS = 5;
  const emptyRow = {
    key: `empty-${Math.random()}`,
    number: (
      <div className="number-header">
        <span>-</span>
      </div>
    ),
    VoucherName: <span></span>,
    Rate: <span></span>,
    Price: <span></span>,
    Available: <span></span>,
    Quantity: <span></span>,
    Description: <span></span>,
    action: null,
  };
  const paddedData = [...data];
  while (paddedData.length < MIN_ROWS) {
    paddedData.push({ ...emptyRow, key: `empty-${Math.random()}` });
  }

  const handleSelectVoucher = (value) => {
    setSelectedItems(value);

    const updatedItems = value.map((option) => {
      const existingVoucher = selectedVouchers.find(
        (v) => v.voucherId === option
      );
      return (
        existingVoucher || {
          voucherId: option,
          quantity: 1,
          fromIndex: 1,
          description:
            campaignVoucherOptions.find((o) => o.value === option)?.label || "",
          state: true,
        }
      );
    });

    setSelectedVouchers(updatedItems);
  };

  const handleDelete = (record) => {
    const updatedItems = selectedItems.filter((item) => item !== record.key);
    const updatedSelectedVouchers = selectedVouchers.filter(
      (item) => item.voucherId !== record.key
    );
    setSelectedItems(updatedItems);
    setSelectedVouchers(updatedSelectedVouchers);
  };

  const footer = () => {
    return (
      <div className="cost-container">
        <div>
          <label className="cost-label">Tổng cộng:</label>
          <TotalCost>
            {formatCurrency(total)}
            <img className="shape-avatar-campaign-bean" src={greenBean} />
          </TotalCost>
        </div>
      </div>
    );
  };

  return (
    <VoucherContainer>
      <Card>
        <Header>
          <div>Chọn voucher</div>
        </Header>
        <div>
          <Select
            mode="multiple"
            placeholder="Chọn voucher..."
            onChange={handleSelectVoucher}
            className="select-campaign-major"
            style={{ width: "100%" }}
            showSearch={false}
            value={selectedItems}
            tagRender={(props) => {
              const option = campaignVoucherOptions.find(
                (option) => option.value === props.value
              );
              if (!option) return null;
              return (
                <Tag className="tag-select-items">
                  <div className="div-option-major">
                    <img
                      src={
                        option.image !== null ? option.image : imgDefaultVoucher
                      }
                      alt="voucher"
                      width={40}
                      height={40}
                    />
                    <label className="label-option-update">
                      {option.label}
                    </label>
                  </div>
                </Tag>
              );
            }}
            maxTagCount={5}
            notFoundContent={
              <div className="font-empty">
                <Empty description="Đã hết voucher để chọn" />
              </div>
            }
            disabled={disabled || isLoading}
          >
            {campaignVoucherOptions.map((item) => (
              <Select.Option
                key={item.value}
                value={item.value}
                label={item.label}
              >
                <div className="select-campaign-container">
                  <div className="div-option-major">
                    <img
                      src={item.image !== null ? item.image : imgDefaultVoucher}
                      alt="voucher"
                      width={40}
                      height={40}
                    />
                    <label className="label-option-update">{item.label}</label>
                  </div>
                  <div>
                    Giá:{" "}
                    <TotalIncome>
                      {item.price.toLocaleString("vi-VN")}{" "}
                      <img
                        className="shape-avatar-campaign-bean"
                        src={greenBean}
                      />
                    </TotalIncome>
                  </div>
                  <div>
                    Tỉ lệ chuyển đổi: <TotalIncome>{item.rate}</TotalIncome>
                  </div>
                  <div>
                    Tồn kho: <TotalIncome>{item.numberOfItems}</TotalIncome>
                  </div>
                </div>
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="container-table">
          <Spin spinning={isLoading}>
            {selectedItems.length === 0 ? (
              <div className="font-empty">
                <Empty description="Không có voucher nào được chọn" />
              </div>
            ) : (
              <Table
                className="tbl-msc"
                pagination={false}
                columns={columns}
                dataSource={paddedData}
                locale={{
                  emptyText: (
                    <div className="font-empty">
                      <Empty description="Danh sách voucher trống" />
                    </div>
                  ),
                }}
              />
            )}
          </Spin>
        </div>
        <footer>{footer()}</footer>
      </Card>
    </VoucherContainer>
  );
}

export default CreateCampaignVoucher;