import { Avatar, Spin, Tag, Typography } from "antd";
import styled from "styled-components";
import imgDefaultStore from "../../../../assets/images/store.png";
import Empty from "../../../../ui/Empty";
import { TableItem } from "../../../../ui/custom/Table/TableItem";
// import { formatPhoneNumber, formattedHours, useImageValidity } from "../../../../utils/helpers";
// import { useCampaignStore } from "../useCampaignStore";

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
    // const {
    //     isLoading,
    //     campaignStores,
    //     page,
    //     limit,
    //     handlePageChange,
    //     handleLimitChange,
    //     setSort,
    // } = useCampaignStore();

    // const storeImages = campaignStores?.result?.map(store => store.avatar);
    // const isValidImages = useImageValidity(campaignStores?.result, storeImages);

    const handleSort = () => {}; // Hàm rỗng để tránh lỗi khi chưa có API

    const columns = [
        { title: "STT", dataIndex: "number", key: "number", align: "center" },
        { title: "Cửa hàng", dataIndex: "StoreName", key: "StoreName", width: "18%", sorter: true },
        { title: "Thời gian làm việc", dataIndex: "Hours", key: "Hours" },
        { title: "Liên hệ", dataIndex: "Contact", key: "Contact" },
        { title: "Địa chỉ", key: "Address", dataIndex: "Address" },
        { title: "Trạng thái", key: "State", dataIndex: "State", align: "center" },
    ];

    // Dữ liệu mẫu để hiển thị UI
    const mockData = [
        {
            key: 1,
            number: <div className="number-header"><span>1</span></div>,
            StoreName: (
                <Avatar.Group>
                    <Avatar className="shape-avatar-product" shape="square" src={imgDefaultStore} />
                    <div className="avatar-info">
                        <Title className="title-product-name" level={5}>Cửa hàng 1</Title>
                        <p className="p-column-table">Thương hiệu XYZ</p>
                    </div>
                </Avatar.Group>
            ),
            Hours: (
                <StackedTime>
                    <span>Mở cửa: <StackedTimeFrameAbove>09:00</StackedTimeFrameAbove></span>
                    <span>Đóng cửa: <StackedTimeFrameBelow>18:00</StackedTimeFrameBelow></span>
                </StackedTime>
            ),
            Contact: <Stacked><span>xyz@example.com</span><span>0987 654 321</span></Stacked>,
            Address: <div className="campaign-item-address">456 Nguyễn Trãi, TP.HCM</div>,
            State: <Tag className="status-tag" color="cyan">Hoạt động</Tag>,
        },
    ];

    return (
        <Spin spinning={false}>
            <TableItem
                columns={columns}
                dataSource={mockData}
                handleSort={handleSort}
                limit={5}
                label="Cửa hàng / Trang"
                page={1}
                elements={1}
                setPage={() => {}}
                setLimit={() => {}}
            />
        </Spin>
    );
}

export default CampaignStore;