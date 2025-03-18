import { Avatar, Spin, Tag, Typography, Alert } from "antd";
import { HiEye, HiPencil } from "react-icons/hi2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import imgDefaultCampaign from "../../../../assets/images/campaign.png";
import greenBean from "../../../../assets/images/dauxanh.png";
import Empty from "../../../../ui/Empty";
import Modal from "../../../../ui/Modal";
import { ButtonAction } from "../../../../ui/custom/Button/Button";
import { TableItem } from "../../../../ui/custom/Table/TableItem";
import { formatDate, useImageValidity } from "../../../../utils/helpers";
import { useCampaign } from "../useCampaign";
import "./campaign-list.scss";

const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
`;

const StackedTimeFrameAbove = styled.span`
  color: #2ecc71;
  margin-left: 0.4rem;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
`;

const TotalIncome = styled.span`
  color: #2ecc71;
  font-weight: 600;
`;

const TotalSpending = styled.span`
  color: #2ecc71;
  font-weight: 600;
`;

function CampaignList() {
  const { Title } = Typography;
  const {
    isLoading,
    campaigns,
    errorMessage,
    page,
    size, // Đổi từ limit thành size
    handlePageChange,
    handleLimitChange: handleSizeChange, // Đổi tên để đồng bộ
    setSort
  } = useCampaign();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const campaignImages = campaigns?.result?.map(campaign => campaign.image);
  const isValidImages = useImageValidity(campaigns?.result, campaignImages);

  // console.log('Page and Size in CampaignList:', { page, size }); // Log để kiểm tra

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const handleSort = (pagination, filters, sorter) => {
    const sortOrder = sorter.order === "ascend" ? "asc" : "desc";

    switch (sorter.field) {
      case "CampaignName":
        setSort(`${sorter.field},${sortOrder}`);
        break;
      case "StartOn":
        setSort(`${sorter.field},${sortOrder}`);
        break;
      case "TotalIncome":
        setSort(`${sorter.field},${sortOrder}`);
        break;
      default:
        break;
    }
  };

  const determineCampaignStatus = (startOn, endOn) => {
    const startDate = new Date(startOn);
    const endDate = new Date(endOn);
    const today = new Date(formattedDate);

    if (today < startDate) return "Chờ duyệt";
    if (today >= startDate && today <= endDate) return "Hoạt động";
    if (today > endDate) return "Kết thúc";
    return "Không xác định";
  };

  const getStatusTagColor = (stateCurrent) => {
    switch (stateCurrent) {
      case "Chờ duyệt":
        return 'orange';
      case "Từ chối":
        return 'purple';
      case "Hoạt động":
        return 'cyan';
      case "Không hoạt động":
        return 'default';
      case "Kết thúc":
        return 'volcano';
      case "Đóng":
        return 'red';
      case "Hủy":
        return 'error';
      default:
        return 'default-color';
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "number",
      key: "number",
      align: "center"
    },
    {
      title: "Chiến dịch",
      dataIndex: "CampaignName",
      key: "CampaignName",
      sorter: true
    },
    {
      title: "Thương hiệu",
      dataIndex: "BrandName",
      key: "BrandName",
      align: "center"
    },
    {
      title: "Thời gian diễn ra",
      dataIndex: "StartOn",
      key: "StartOn",
      sorter: true
    },
    {
      title: "Chi phí",
      key: "TotalIncome",
      dataIndex: "TotalIncome",
      sorter: true
    },
    {
      title: "Trạng thái",
      key: "State",
      dataIndex: "State",
      align: "center"
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "action",
      align: "center"
    }
  ];

  if (isLoading) {
    // console.log("Loading campaigns...");
    return (
      <Spin>
        <TableItem
          columns={columns}
          dataSource={[]}
          pagination={false}
        />
      </Spin>
    );
  }

  if (errorMessage) {
    return <Alert message={errorMessage} type="error" showIcon />;
  }

  // console.log("Campaigns data:", campaigns);
  if (!campaigns?.result?.length) return <Empty resourceName="chiến dịch" />;

  const data = campaigns?.result?.map((campaign, index) => {
    const dataIndex = !isNaN((page - 1) * size + index + 1) ? (page - 1) * size + index + 1 : index + 1; // Đảm bảo dataIndex là số

    const isValid = isValidImages[index];
    const avatarSrc = isValid ? campaign.image : imgDefaultCampaign;

    const campaignStatus = determineCampaignStatus(campaign.startOn, campaign.endOn);

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
            <Title className="title-product-name" level={5}>{campaign.campaignName}</Title>
            <p className="p-column-table">Thể loại {campaign.typeName}</p>
          </div>
        </Avatar.Group>
      ),
      BrandName: <div className="campaign-brand-row">{campaign.brandName}</div>,
      StartOn: (
        <StackedTime>
          <span>
            Bắt đầu: <StackedTimeFrameAbove>{formatDate(campaign.startOn)}</StackedTimeFrameAbove>
          </span>
          <span>
            Kết thúc: <StackedTimeFrameBelow>{formatDate(campaign.endOn)}</StackedTimeFrameBelow>
          </span>
        </StackedTime>
      ),
      TotalIncome: (
        <StackedTime>
          <span>
            Hạn mức: <TotalIncome>{campaign.totalIncome.toLocaleString("vi-VN")}<img className="shape-avatar-campaign-bean" src={greenBean} /></TotalIncome>
          </span>
          <span>
            Đã chi: <TotalSpending>{campaign.totalSpending.toLocaleString("vi-VN")}<img className="shape-avatar-campaign-bean" src={greenBean} /></TotalSpending>
          </span>
        </StackedTime>
      ),
      State: (
        <Tag className="campaign-status-tag" color={getStatusTagColor(campaignStatus)}>
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
          {(new Date(campaign.startOn) > new Date(formattedDate)) && (
            <Link to={`/campaigns/edit/${campaign.id}`} state={{ campaign }}>
              <ButtonAction>
                <HiPencil />
              </ButtonAction>
            </Link>
          )}
        </div>
      )
    };
  });

  const handleRowClick = (record, columnKey) => {
    if (columnKey.target.tagName === "BUTTON" || columnKey.target.tagName === "svg" || columnKey.target.tagName === "path") {
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
        limit={size} // Đổi từ limit thành size
        label="Chiến dịch / Trang"
        page={page}
        elements={campaigns?.totalCount}
        setPage={handlePageChange}
        setLimit={handleSizeChange} // Đổi từ handleLimitChange thành handleSizeChange
        handleRowClick={handleRowClick}
      />
    </Spin>
  );
}

export default CampaignList;