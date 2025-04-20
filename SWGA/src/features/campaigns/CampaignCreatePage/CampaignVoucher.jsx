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
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import styled from "styled-components";
import imgDefaultVoucher from "../../../assets/images/coupon.png";
import greenBean from "../../../assets/images/dauxanh.png";
import { NextPrevContext } from "../../../context/NextPrevContext";
import ButtonCustom from "../../../ui/custom/Button/ButtonCustom";
import { formatCurrency } from "../../../utils/helpers";
import walletService from "../../../store/api/walletApi"; // Import wallet service
import "./scss/campaign.scss";
import { useVouchers } from "../../../hooks/voucher/useVouchers";

const Header = styled.header`
  color: #1c5d78;
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
  color: #1c5d78;
  margin-left: 1.3rem;
  font-weight: 600;
`;

const TotalCost = styled.span`
  color:#1c5d78;
  margin-left: 0.7rem;
  font-weight: 600;
  font-size: 1.6rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;

  img {
    margin-bottom: 0;
    vertical-align: middle;
    height: 1.2em; // Điều chỉnh theo kích thước font
  }
`;

const VoucherContainer = styled.div`
  margin-bottom: 60px;
`;

function CampaignVoucher({ selectVoucher, cost, disabled = false, mode = "create" }) {
  const { Title } = Typography;
  const { newCampaign, setNewCampaign } = useContext(NextPrevContext);
  const { vouchers, isLoading, error } = useVouchers();
  const [campaignVoucherOptions, setCampaignVoucherOptions] = useState([]);
  const [selectedVouchers, setSelectedVouchers] = useState(() => {
    if (newCampaign?.campaignDetails) {
      const details = typeof newCampaign.campaignDetails === "string"
        ? JSON.parse(`[${newCampaign.campaignDetails}]`)
        : newCampaign.campaignDetails;
      return details;
    }
    return [];
  });
  const [editingQuantity, setEditingQuantity] = useState(0);
  const [editingDescription, setEditingDescription] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [total, setTotal] = useState(0);
  const [walletBalance, setWalletBalance] = useState(null); // State for wallet balance

  // Fetch wallet balance on component mount
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const walletData = await walletService.getWalletByBrandId();
        setWalletBalance(walletData.balance);
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
        setWalletBalance(0);
        toast.error("Không thể tải số dư ví");
      }
    };

    fetchWalletBalance();
  }, []);

  // Initialize voucher options when data is loaded
  useEffect(() => {
    if (!vouchers?.data?.items) {
      setCampaignVoucherOptions([]);
      return;
    }

    const selectedVoucherIds = selectedVouchers.map(v => v.voucherId);
    const filteredVouchers = vouchers.data.items.filter(
      c => c.state || selectedVoucherIds.includes(c.id)
    );

    if (filteredVouchers?.length > 0) {
      setCampaignVoucherOptions(
        filteredVouchers.map(c => ({
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
    }
  }, [vouchers?.data?.items, selectedVouchers]);

  useEffect(() => {
    if (error) {
      toast.error("Không thể tải danh sách voucher");
    }
  }, [error]);

  // Calculate total when selected vouchers change and validate wallet balance
  useEffect(() => {
    if (!selectedVouchers?.length || !campaignVoucherOptions?.length) {
      setTotal(0);
      if (mode === "create") {
        cost?.(0);
      }
      return;
    }

    const newTotal = selectedVouchers.reduce((sum, voucher) => {
      const option = campaignVoucherOptions.find(o => o.value === voucher.voucherId);
      if (option?.price && option?.rate) {
        return sum + (option.price * option.rate * (voucher.quantity || 1));
      }
      return sum;
    }, 0);

    setTotal(newTotal);

    // Validate wallet balance
    if (walletBalance !== null && newTotal > walletBalance) {
      toast.error(`Số dư ví không đủ! Cần ${newTotal} điểm, nhưng ví chỉ có ${walletBalance} điểm.`);
    }
    
    if (mode === "create") {
      selectVoucher?.(selectedVouchers);
      cost?.(newTotal);
    }
  }, [selectedVouchers, campaignVoucherOptions, walletBalance]);

  const isEditing = record => record.key === editingKey;

  const edit = record => {
    setEditingQuantity(record.Quantity);
    setEditingDescription(record.Description || "");
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
    setEditingDescription("");
    setEditingQuantity(0);
  };

  const handleSave = record => {
    const option = campaignVoucherOptions.find(o => o.value === record.key);
    if (!option) return;

    const availableQuantity = option.numberOfItems;
    if (editingQuantity <= 0 || (availableQuantity !== null && editingQuantity > availableQuantity)) {
      toast.error(`Số lượng không hợp lệ (1-${availableQuantity})`);
      return;
    }

    // Calculate the new total cost with the updated quantity
    const updatedVouchers = selectedVouchers.map(voucher =>
      voucher.voucherId === record.key
        ? {
            ...voucher,
            quantity: editingQuantity,
            description: editingDescription || voucher.description,
          }
        : voucher
    );

    const newTotal = updatedVouchers.reduce((sum, voucher) => {
      const option = campaignVoucherOptions.find(o => o.value === voucher.voucherId);
      if (option?.price && option?.rate) {
        return sum + (option.price * option.rate * (voucher.quantity || 1));
      }
      return sum;
    }, 0);

    // Check wallet balance before saving
    if (walletBalance !== null && newTotal > walletBalance) {
      toast.error(`Số dư ví không đủ! Cần ${newTotal} điểm, nhưng ví chỉ có ${walletBalance} điểm.`);
      return;
    }

    setSelectedVouchers(updatedVouchers);
    setEditingKey("");
    setEditingDescription("");
    setEditingQuantity(0);
  };

  const handleSelectVoucher = value => {
    if (!Array.isArray(value)) return;
    
    const updatedVouchers = value.map(voucherId => {
      const existing = selectedVouchers?.find(v => v.voucherId === voucherId);
      const option = campaignVoucherOptions?.find(o => o.value === voucherId);
      
      return existing || {
        voucherId,
        quantity: 1,
        fromIndex: 1,
        description: option?.label || "",
        state: true,
      };
    });

    // Calculate the total cost of the updated vouchers
    const newTotal = updatedVouchers.reduce((sum, voucher) => {
      const option = campaignVoucherOptions.find(o => o.value === voucher.voucherId);
      if (option?.price && option?.rate) {
        return sum + (option.price * option.rate * (voucher.quantity || 1));
      }
      return sum;
    }, 0);

    // Check wallet balance before allowing the selection
    if (walletBalance !== null && newTotal > walletBalance) {
      toast.error(`Số dư ví không đủ! Cần ${newTotal} điểm, nhưng ví chỉ có ${walletBalance} điểm.`);
      return;
    }

    setSelectedVouchers(updatedVouchers);
    
    if (mode === "create") {
      setNewCampaign(prev => ({
        ...prev,
        campaignDetails: updatedVouchers
      }));
    }
  };

  const handleDelete = record => {
    const newSelectedVouchers = selectedVouchers.filter(
      item => item.voucherId !== record.key
    );
    
    setSelectedVouchers(newSelectedVouchers);
    
    if (mode === "create") {
      setNewCampaign(prev => ({
        ...prev,
        campaignDetails: newSelectedVouchers
      }));
    }
  };

  const getColumns = () => {
    const baseColumns = [
      {
        title: "STT",
        dataIndex: "number",
        key: "number",
        align: "center",
      },
      {
        title: "Tên Voucher",
        dataIndex: "VoucherName",
        key: "VoucherName",
      },
      {
        title: "Tỉ Lệ Chuyển Đổi",
        dataIndex: "Rate",
        key: "Rate",
        align: "center",
      },
      {
        title: "Chi Phí",
        dataIndex: "Price",
        key: "Price",
        align: "center",
      },
    ];

    if (mode === "create") {
      return [
        ...baseColumns,
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
            const isEditable = isEditing(record);
            return isEditable ? (
              <Input
                type="number"
                value={editingQuantity}
                onChange={e => setEditingQuantity(parseInt(e.target.value, 10))}
                min="1"
                max={record.Available}
                className="input-edit-quantity"
              />
            ) : (
              <StackedTime>
                <span>
                  <TotalIncome>{record.Quantity}</TotalIncome>
                </span>
              </StackedTime>
            );
          },
        },
        {
          title: "Mô tả",
          dataIndex: "Description",
          key: "Description",
          align: "center",
          render: (_, record) => {
            const isEditable = isEditing(record);
            return isEditable ? (
              <Input
                value={editingDescription}
                onChange={e => setEditingDescription(e.target.value)}
                className="input-edit-description"
              />
            ) : (
              <span>{record.Description || "Chưa có mô tả"}</span>
            );
          },
        },
        {
          title: "Hành động",
          key: "action",
          align: "center",
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
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
            );
          },
        },
      ];
    }

    return [
      ...baseColumns,
      {
        title: "Số Lượng",
        dataIndex: "Quantity",
        key: "Quantity",
        align: "center",
        render: (text) => (
          <StackedTime>
            <span>
              <TotalIncome>{text}</TotalIncome>
            </span>
          </StackedTime>
        ),
      },
      {
        title: "Thành Tiền",
        dataIndex: "Total",
        key: "Total",
        align: "center",
      },
      {
        title: "Mô tả",
        dataIndex: "Description",
        key: "Description",
        align: "center",
      },
    ];
  };

  const getData = () => {
    return selectedVouchers.map((value, index) => {
      const option = campaignVoucherOptions.find(o => o.value === value.voucherId);
      if (!option) return null;

      const price = option.price || 0;
      const rate = option.rate || 0;
      const quantity = value.quantity || 1;
      const total = price * rate * quantity;

      return {
        key: value.voucherId,
        number: <div className="number-header"><span>{index + 1}</span></div>,
        VoucherName: (
          <Avatar.Group>
            <Avatar
              className="shape-avatar-product"
              shape="square"
              src={option.image || imgDefaultVoucher}
            />
            <div className="avatar-info">
              <Title className="title-add-voucher-campaign" level={5}>
                {option.label}
              </Title>
              <p className="p-column-table">Thương hiệu {option.brand}</p>
            </div>
          </Avatar.Group>
        ),
        Rate: (
          <StackedTime>
            <span>
              <TotalIncome>{rate || "Chưa cập nhật"}</TotalIncome>
            </span>
          </StackedTime>
        ),
        Price: (
          <StackedTime>
            <span>
              <TotalIncome>
                {price ? (
                  <>
                    {price.toLocaleString("vi-VN")}
                    <img 
                      className="shape-avatar-campaign-bean" 
                      src={greenBean} 
                      alt="bean" 
                      style={{ marginLeft: "120px",marginTop: "-20px", verticalAlign: 'text-top' }} // Thêm style
                    />
                  </>
                ) : "Chưa cập nhật"}
              </TotalIncome>
            </span>
          </StackedTime>
        ),
        Available: option.numberOfItems,
        Quantity: quantity,
        Total: (
          <StackedTime>
            <span>
              <TotalIncome>{total.toLocaleString("vi-VN")}</TotalIncome>
            </span>
          </StackedTime>
        ),
        Description: value.description || "Chưa có mô tả",
      };
    }).filter(Boolean);
  };

  const renderVoucherSelector = () => {
    if (mode !== "create") return null;

    return (
      <Select
        mode="multiple"
        placeholder="Chọn voucher..."
        onChange={handleSelectVoucher}
        className="select-campaign-major"
        style={{ width: "100%" }}
        showSearch={false}
        value={selectedVouchers.map(v => v.voucherId)}
        tagRender={props => {
          const option = campaignVoucherOptions.find(o => o.value === props.value);
          if (!option) return null;
          return (
            <Tag className="tag-select-items" style={{marginTop: "5px"}}>
              <div className="div-option-major">
                <img
                  src={option.image || imgDefaultVoucher}
                  alt="voucher"
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
            <Empty description="Đã hết voucher để chọn" />
          </div>
        }
        disabled={disabled || isLoading}
      >
        {campaignVoucherOptions.map(item => (
          <Select.Option key={item.value} value={item.value} label={item.label}>
            <div className="select-campaign-container">
              <div className="div-option-major">
                <img
                  src={item.image || imgDefaultVoucher}
                  alt="voucher"
                  width={40}
                  height={40}
                />
                <label className="label-option-update">{item.label}</label>
              </div>
              <div>
                Giá:{" "}
                <TotalIncome>
                  {item.price?.toLocaleString("vi-VN")}{" "}
                  <img className="shape-avatar-campaign-bean" src={greenBean} alt="bean" />
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
    );
  };

  const footer = () => (
    <div className="cost-container">
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <label className="cost-label">Tổng cộng:</label>
        <TotalCost>
          {formatCurrency(total)}
          <img className="shape-avatar-campaign-bean" src={greenBean} alt="bean" />
        </TotalCost>
      </div>
    </div>
  );

  return (
    <VoucherContainer>
      <Card className={mode === "review" ? "bottom-voucher-container" : ""}>
        <Header>
          <div>{mode === "create" ? "Chọn voucher" : "Ưu đãi"}</div>
        </Header>
        {renderVoucherSelector()}
        <div className="container-table">
          <Spin spinning={isLoading}>
            {selectedVouchers.length === 0 ? (
              <div className="font-empty">
                <Empty description={
                  mode === "create"
                    ? "Không có voucher nào được chọn"
                    : "Danh sách khuyến mãi trống"
                } />
              </div>
            ) : (
              <Table
                className="tbl-msc"
                pagination={false}
                columns={getColumns()}
                dataSource={getData()}
                locale={{
                  emptyText: (
                    <div className="font-empty">
                      <Empty description={
                        mode === "create"
                          ? "Danh sách voucher trống"
                          : "Danh sách khuyến mãi trống"
                      } />
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

CampaignVoucher.propTypes = {
  selectVoucher: PropTypes.func,
  cost: PropTypes.func,
  disabled: PropTypes.bool,
  mode: PropTypes.oneOf(["create", "review"]),
};

export default CampaignVoucher;