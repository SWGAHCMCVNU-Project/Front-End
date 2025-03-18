import { Avatar, Spin, Tag, Typography } from "antd";
import styled from "styled-components";
import imgDefaultStore from "../../../../assets/images/store.png";
import Empty from "../../../../ui/Empty";
import { TableItem } from "../../../../ui/custom/Table/TableItem";
import { useCampaignStore } from "../useCampaignStore"; // Import useCampaignStore

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.4rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500); 
  }
`;

const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
`;

const StackedTimeFrameAbove = styled.span`
  color: #2ecc71;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
`;

function CampaignStore() {
    const { Title } = Typography;
    const {
        isLoading,
        campaignStores,
        page,
        limit,
        handlePageChange,
        handleLimitChange,
        setSort,
    } = useCampaignStore();

    // Chuyển đổi dữ liệu từ campaignStores thành định dạng phù hợp với Table
    const dataSource = campaignStores?.result?.map((store, index) => ({
        key: store.id || index + 1, // Giả định mỗi store có id, nếu không dùng index
        number: <div className="number-header"><span>{(page - 1) * limit + index + 1}</span></div>,
        StoreName: (
            <Avatar.Group>
                <Avatar className="shape-avatar-product" shape="square" src={store.avatar || imgDefaultStore} />
                <div className="avatar-info">
                    <Title className="title-product-name" level={5}>{store.name || "Cửa hàng không tên"}</Title>
                    <p className="p-column-table">{store.brand || "Thương hiệu không rõ"}</p>
                </div>
            </Avatar.Group>
        ),
        Hours: (
            <StackedTime>
                <span>Mở cửa: <StackedTimeFrameAbove>{store.openTime || "09:00"}</StackedTimeFrameAbove></span>
                <span>Đóng cửa: <StackedTimeFrameBelow>{store.closeTime || "18:00"}</StackedTimeFrameBelow></span>
            </StackedTime>
        ),
        Contact: (
            <Stacked>
                <span>{store.email || "email@example.com"}</span>
                <span>{store.phone || "0987 654 321"}</span>
            </Stacked>
        ),
        Address: <div className="campaign-item-address">{store.address || "Địa chỉ không rõ"}</div>,
        State: <Tag className="status-tag" color={store.state === "active" ? "cyan" : "red"}>{store.state || "Không rõ"}</Tag>,
    })) || [];

    const handleSort = (pagination, filters, sorter) => {
        if (sorter.order) {
            setSort(`${sorter.field},${sorter.order === "ascend" ? "asc" : "desc"}`);
        }
    };

    return (
        <Spin spinning={isLoading}>
            {campaignStores?.result?.length > 0 ? (
                <TableItem
                    columns={[
                        { title: "STT", dataIndex: "number", key: "number", align: "center" },
                        { title: "Cửa hàng", dataIndex: "StoreName", key: "StoreName", width: "18%", sorter: true },
                        { title: "Thời gian làm việc", dataIndex: "Hours", key: "Hours" },
                        { title: "Liên hệ", dataIndex: "Contact", key: "Contact" },
                        { title: "Địa chỉ", key: "Address", dataIndex: "Address" },
                        { title: "Trạng thái", key: "State", dataIndex: "State", align: "center" },
                    ]}
                    dataSource={dataSource}
                    handleSort={handleSort}
                    limit={limit}
                    label="Cửa hàng / Trang"
                    page={page}
                    elements={campaignStores.total || 0}
                    setPage={handlePageChange}
                    setLimit={handleLimitChange}
                />
            ) : (
                <Empty description="Không có cửa hàng nào được đăng ký cho chiến dịch này." />
            )}
        </Spin>
    );
}

export default CampaignStore;