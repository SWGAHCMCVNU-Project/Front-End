import { Avatar, Card, Empty, Table, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import imgDefaultVoucher from "../../../assets/images/coupon.png";
import greenBean from "../../../assets/images/dauxanh.png";
import { NextPrevContext } from "../../../context/NextPrevContext";
import { formatCurrency } from "../../../utils/helpers";
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

function ReviewCampaignVoucher() {
  const { Title } = Typography;
  const { newCampaign } = useContext(NextPrevContext);
  const { vouchers, error, isLoading } = useVouchers();
  const [campaignVoucherOptions, setCampaignVoucherOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    console.log("New Campaign in ReviewCampaignVoucher:", newCampaign);
    console.log("Vouchers from useVouchers in ReviewCampaignVoucher:", vouchers);
    console.log("Error from useVouchers:", error);

    const getVoucherSelectBox = () => {
      if (!vouchers || !vouchers.data || !Array.isArray(vouchers.data.items)) {
        console.warn("Vouchers data is not available or not an array:", vouchers);
        setCampaignVoucherOptions([]);
        return;
      }

      const selectedVoucherIds = Array.isArray(newCampaign?.campaignDetails)
        ? newCampaign.campaignDetails.map((option) => option.voucherId) || []
        : [];
      const filteredCampaignVouchers = vouchers.data.items.filter(
        (c) => c.state || selectedVoucherIds.includes(c.id)
      );

      if (filteredCampaignVouchers.length > 0) {
        setCampaignVoucherOptions(
          filteredCampaignVouchers.map((c) => ({
            value: c.id,
            label: c.voucherName,
            image: c.image || imgDefaultVoucher,
            brand: c.brandName,
            price: c.price || 0,
            rate: c.rate || 0,
            numberOfItems: c.numberOfItemsAvailable || 0,
          }))
        );
      } else {
        setCampaignVoucherOptions([]);
        console.log("No vouchers found");
      }
    };

    if (Array.isArray(newCampaign?.campaignDetails) && newCampaign.campaignDetails.length > 0) {
      const selectedVoucherIds = newCampaign.campaignDetails.map((option) => option.voucherId) || [];
      console.log("Setting selectedItems in ReviewCampaignVoucher:", selectedVoucherIds);
      setSelectedItems(selectedVoucherIds);
    } else {
      setSelectedItems([]);
      console.log("No campaignDetails found in newCampaign");
    }

    if (!isLoading && vouchers && vouchers.data && Array.isArray(vouchers.data.items)) {
      getVoucherSelectBox();
    }
  }, [vouchers, isLoading, error, newCampaign]);

  const columns = [
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
    {
      title: "Số Lượng",
      dataIndex: "Quantity",
      key: "Quantity",
      align: "center",
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

  let total = 0;

  const data = selectedItems.map((value, index) => {
    const dataIndex = index + 1;
    const option = campaignVoucherOptions.find((o) => o.value === value);
    const campaignDetail = Array.isArray(newCampaign?.campaignDetails)
      ? newCampaign.campaignDetails.find((v) => v.voucherId === value)
      : null;
    const avatarSrc = option?.image || imgDefaultVoucher;
    const price = option?.price || 0;
    const rate = option?.rate || 0;
    const quantity = campaignDetail?.quantity || 1;
    total += price * rate * quantity;

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
      VoucherName: (
        <Avatar.Group>
          <Avatar className="shape-avatar-product" shape="square" src={avatarSrc} />
          <div className="avatar-info">
            <Title className="title-add-voucher-campaign" level={5}>
              {option?.label}
            </Title>
            <p className="p-column-table">Thương hiệu {option?.brand}</p>
          </div>
        </Avatar.Group>
      ),
      Rate: rate ? (
        <StackedTime>
          <span>
            <TotalIncome>{rate}</TotalIncome>
          </span>
        </StackedTime>
      ) : (
        <span>Chưa cập nhật</span>
      ),
      Price: price ? (
        <StackedTime>
          <span>
            <TotalIncome>
              {price.toLocaleString("vi-VN")}
              <img className="shape-avatar-campaign-bean" src={greenBean} />
            </TotalIncome>
          </span>
        </StackedTime>
      ) : (
        <span>Chưa cập nhật</span>
      ),
      Quantity: quantity ? (
        <StackedTime>
          <span>
            <TotalIncome>{quantity}</TotalIncome>
          </span>
        </StackedTime>
      ) : (
        <span>Chưa cập nhật</span>
      ),
      Total: price * rate * quantity ? (
        <StackedTime>
          <span>
            <TotalIncome>{(price * rate * quantity).toLocaleString("vi-VN")}</TotalIncome>
          </span>
        </StackedTime>
      ) : (
        <span>Chưa cập nhật</span>
      ),
      Description: campaignDetail?.description ? (
        <StackedTime>
          <span>{campaignDetail.description}</span>
        </StackedTime>
      ) : (
        <span>Chưa có mô tả</span>
      ),
    };
  }).filter((item) => item !== null);

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
    <Card className="bottom-voucher-container">
      <Header>
        <div>Ưu đãi</div>
      </Header>
      <div className="container-table">
        <Table
          className="tbl-msc"
          pagination={false}
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: (
              <div className="font-empty">
                <Empty description="Danh sách khuyến mãi trống" />
              </div>
            ),
          }}
        />
      </div>
      <footer>{footer()}</footer>
    </Card>
  );
}

export default ReviewCampaignVoucher;