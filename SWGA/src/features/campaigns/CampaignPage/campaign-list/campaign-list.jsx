import { Avatar, Spin, Tag, Typography, Alert } from "antd";
import { HiEye, HiPencil } from "react-icons/hi2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import imgDefaultCampaign from "../../../../assets/images/campaign.png";
import greenBean from "../../../../assets/images/dauxanh.png";
import Empty from "../../../../ui/Empty";
import { ButtonAction } from "../../../../ui/custom/Button/Button";
import { TableItem } from "../../../../ui/custom/Table/TableItem";
import { formatDate, useImageValidity } from "../../../../utils/helpers";
import { useCampaign } from "../useCampaign";
import "./campaign-list.scss";
import { useState, useMemo } from "react";

const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
`;

const StackedTimeFrameAbove = styled.span`
  color: #1c5d78;
  margin-left: 0.4rem;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
`;

const TotalIncome = styled.span`
  color: #1c5d78;
  font-weight: 600;
`;

const TotalSpending = styled.span`
  color: #1c5d78;
  font-weight: 600;
`;

const MoneyWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

function CampaignList() {
  const { Title } = Typography;
  const {
    isLoading,
    campaigns,
    errorMessage,
    page,
    size,
    handlePageChange,
    handleLimitChange: handleSizeChange,
  } = useCampaign();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sort, setSort] = useState("Id,desc");

  const campaignImages =
    campaigns?.result?.map((campaign) => campaign.image) || [];
  const isValidImages = useImageValidity(
    campaigns?.result || [],
    campaignImages
  );

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const handleSort = (pagination, filters, sorter) => {
    if (!sorter.order) {
      setSort("Id,desc");
      return;
    }

    const sortOrder = sorter.order === "ascend" ? "asc" : "desc";
    const sortField = sorter.field;
    const newSort = `${sortField},${sortOrder}`;
    setSort(newSort);
  };

  const sortedCampaigns = useMemo(() => {
    const [sortField, sortOrder] = sort.split(",");
    const items = campaigns?.result ? [...campaigns.result] : [];

    if (!items.length) return [];

    items.sort((a, b) => {
      let valueA, valueB;

      switch (sortField) {
        case "CampaignName":
          valueA = a.campaignName?.toLowerCase() || "";
          valueB = b.campaignName?.toLowerCase() || "";
          break;
        case "BrandName":
          valueA = a.brandName?.toLowerCase() || "";
          valueB = b.brandName?.toLowerCase() || "";
          break;
        case "StartOn":
          valueA = new Date(a.startOn);
          valueB = new Date(b.startOn);
          break;
        case "TotalIncome":
          valueA = a.totalIncome || 0;
          valueB = b.totalIncome || 0;
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });

    return items;
  }, [campaigns?.result, sort]);

  const determineCampaignStatus = (status, startOn, endOn) => {
    // Nếu trạng thái là 3 (Từ chối), giữ nguyên
    if (status === 3) {
      return "Đã Từ Chối";
    }

    const today = new Date();
    const startDate = new Date(startOn);
    const endDate = new Date(endOn);

    if (status === 1) {
      if (today < startDate) {
        return "Chưa Diễn Ra";
      }
      if (today >= startDate && today <= endDate) {
        return "Đang Hoạt Động";
      }
    }
    if (status === 0 || (status === 1 && today > endDate)) {
      return "Không Hoạt Động";
    }
    switch (status) {
      case 2:
        return "Chờ Duyệt";
      default:
        return "Không Xác Định";
    }
  };

  const getStatusTagColor = (stateCurrent) => {
    switch (stateCurrent) {
      case "Chờ Duyệt":
        return "orange";
      case "Đã Từ Chối":
        return "purple";
      case "Đang Hoạt Động":
        return "cyan";
      case "Chưa Diễn Ra":
        return "blue"; // New color for "Chưa Diễn Ra"
      case "Không Hoạt Động":
        return "default";
      default:
        return "default";
    }
  };

  const columns = [
    { title: "STT", dataIndex: "number", key: "number", align: "center" },
    {
      title: "Chiến dịch",
      dataIndex: "CampaignName",
      key: "CampaignName",
      sorter: true,
    },
    {
      title: "Thương hiệu",
      dataIndex: "BrandName",
      key: "BrandName",
      sorter: true,
      align: "center",
    },
    {
      title: "Thời gian diễn ra",
      dataIndex: "StartOn",
      key: "StartOn",
      sorter: true,
    },
    {
      title: "Chi phí",
      key: "TotalIncome",
      dataIndex: "TotalIncome",
      sorter: true,
    },
    { title: "Trạng thái", key: "State", dataIndex: "State", align: "center" },
    { title: "Hành động", key: "action", dataIndex: "action", align: "center" },
  ];

  if (isLoading) {
    return (
      <Spin>
        <TableItem columns={columns} dataSource={[]} pagination={false} />
      </Spin>
    );
  }

  if (errorMessage) {
    return <Alert message={errorMessage} type="error" showIcon />;
  }

  if (!campaigns?.result?.length) return <Empty resourceName="chiến dịch" />;

  const data = sortedCampaigns.map((campaign, index) => {
    const dataIndex = !isNaN((page - 1) * size + index + 1)
      ? (page - 1) * size + index + 1
      : index + 1;
    const isValid = isValidImages[index];
    const avatarSrc = isValid ? campaign.image : imgDefaultCampaign;
    const campaignStatus = determineCampaignStatus(
      campaign.status,
      campaign.startOn,
      campaign.endOn
    );

    return {
      key: campaign.id,
      number: (
        <div className="number-header">
          <span>{dataIndex}</span>
        </div>
      ),
      CampaignName: (
        <Avatar.Group>
          <Avatar
            className="shape-avatar-product"
            shape="square"
            src={avatarSrc}
          />
          <div className="avatar-info">
            <Title className="title-product-name" level={5}>
              {campaign.campaignName}
            </Title>
            <p className="p-column-table">Thể loại {campaign.typeName}</p>
          </div>
        </Avatar.Group>
      ),
      BrandName: <div className="campaign-brand-row">{campaign.brandName}</div>,
      StartOn: (
        <StackedTime>
          <span>
            Bắt đầu:{" "}
            <StackedTimeFrameAbove>
              {formatDate(campaign.startOn)}
            </StackedTimeFrameAbove>
          </span>
          <span>
            Kết thúc:{" "}
            <StackedTimeFrameBelow>
              {formatDate(campaign.endOn)}
            </StackedTimeFrameBelow>
          </span>
        </StackedTime>
      ),
      TotalIncome: (
        <StackedTime>
          <span>
            Hạn mức:{" "}
            <MoneyWrapper>
              <TotalIncome>
                {campaign.totalIncome.toLocaleString("vi-VN")}
              </TotalIncome>
              <img className="shape-avatar-campaign-bean" src={greenBean} />
            </MoneyWrapper>
          </span>
          <span>
            Đã chi:{" "}
            <MoneyWrapper>
              <TotalSpending>
                {campaign.totalSpending.toLocaleString("vi-VN")}
              </TotalSpending>
              <img className="shape-avatar-campaign-bean" src={greenBean} />
            </MoneyWrapper>
          </span>
        </StackedTime>
      ),
      State: (
        <Tag
          className="campaign-status-tag"
          color={getStatusTagColor(campaignStatus)}
        >
          {campaignStatus}
        </Tag>
      ),
      action: (
        <div className="ant-employed-actions">
          <Link className="link-details" to={`/campaigns/${campaign.id}`}>
            <ButtonAction>
              <HiEye />
            </ButtonAction>
          </Link>
          {/* {new Date(campaign.startOn) > new Date(formattedDate) && (
            <Link to={`/campaigns/edit/${campaign.id}`} state={{ campaign }}>
              <ButtonAction>
                <HiPencil />
              </ButtonAction>
            </Link>
          )} */}
        </div>
      ),
    };
  });

  const handleRowClick = (record, columnKey) => {
    if (
      columnKey.target.tagName === "BUTTON" ||
      columnKey.target.tagName === "svg" ||
      columnKey.target.tagName === "path"
    ) {
      return;
    }
    navigate(`/campaigns/${record.key}`);
  };

  return (
    <Spin spinning={isLoading}>
      <TableItem
        columns={columns}
        dataSource={data}
        handleSort={handleSort}
        limit={size}
        label=""
        page={page}
        elements={campaigns?.totalCount}
        setPage={handlePageChange}
        setLimit={handleSizeChange}
        handleRowClick={handleRowClick}
      />
    </Spin>
  );
}

export default CampaignList;
