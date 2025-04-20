import { Avatar, Spin, Tag, Typography } from "antd";
import styled from "styled-components";
import imgDefaultStore from "../../../../assets/images/store.png";
import Empty from "../../../../ui/Empty";
import { TableItem } from "../../../../ui/custom/Table/TableItem";
import { useCampaignStore } from "../useCampaignStore";
import { formatPhoneNumber } from "../../../../utils/helpers"; // Đảm bảo đã import formatPhoneNumber

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.4rem;
  padding-left: 8px;

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
  gap: 0.4rem;
  font-weight: 500;
  padding-left: 8px;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const TimeLabel = styled.span`
  min-width: 70px;
  color: var(--color-grey-600);
`;

const StackedTimeFrameAbove = styled.span`
  color: #1c5d78;
  font-size: 1.4rem;
`;

const StackedTimeFrameBelow = styled.span`
  color: red;
  font-size: 1.4rem;
`;

const StoreNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding-left: 8px;

  .avatar-info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .title-product-name {
    margin: 0;
    font-size: 1.4rem;
  }

  .p-column-table {
    margin: 0;
    color: var(--color-grey-500);
    font-size: 1.3rem;
  }
`;

const StyledAddress = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  padding-left: 8px;
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
        key: store.id || index + 1,
        number: <div className="number-header"><span>{(page - 1) * limit + index + 1}</span></div>,
        StoreName: (
            <StoreNameWrapper>
                <Avatar 
                    className="shape-avatar-product" 
                    shape="square" 
                    src={store.avatar || imgDefaultStore} 
                    size={45}
                />
                <div className="avatar-info">
                    <Title className="title-product-name" level={5}>{store.name}</Title>
                    <p className="p-column-table">{store.brand}</p>
                </div>
            </StoreNameWrapper>
        ),
        Hours: (
            <StackedTime>
                <span>
                    <TimeLabel>Mở cửa:</TimeLabel>
                    <StackedTimeFrameAbove>{store.openTime}</StackedTimeFrameAbove>
                </span>
                <span>
                    <TimeLabel>Đóng cửa:</TimeLabel>
                    <StackedTimeFrameBelow>{store.closeTime}</StackedTimeFrameBelow>
                </span>
            </StackedTime>
        ),
        Contact: (
            <Stacked>
                {store.email === null && store.phone === null ? (
                    <span style={{ fontSize: 14 }}>Chưa cập nhật</span>
                ) : (
                    <>
                        <span>{store.email !== null ? store.email : "Chưa cập nhật Email"}</span>
                        <span>{store.phone !== null ? formatPhoneNumber(store.phone) : "Chưa cập nhật số điện thoại"}</span>
                    </>
                )}
            </Stacked>
        ),
        Address: <StyledAddress>{store.address}</StyledAddress>,
        State: <Tag className="status-tag" color={store.state === "active" ? "cyan" : "red"}>{store.state}</Tag>,
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
                        { 
                            title: "STT", 
                            dataIndex: "number", 
                            key: "number", 
                            align: "center",
                            width: "5%" 
                        },
                        { 
                            title: "Cửa hàng", 
                            dataIndex: "StoreName", 
                            key: "StoreName", 
                            width: "25%", 
                            sorter: true 
                        },
                        { 
                            title: "Thời gian làm việc", 
                            dataIndex: "Hours", 
                            key: "Hours",
                            width: "20%"
                        },
                        { 
                            title: "Liên hệ", 
                            dataIndex: "Contact", 
                            key: "Contact",
                            width: "20%"
                        },
                        { 
                            title: "Địa chỉ", 
                            key: "Address", 
                            dataIndex: "Address",
                            width: "20%"
                        },
                        { 
                            title: "Trạng thái", 
                            key: "State", 
                            dataIndex: "State", 
                            align: "center",
                            width: "10%" 
                        },
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