import { Avatar, Spin, Tag, Typography } from "antd";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import imgDefaultVoucher from "../../../../assets/images/coupon.png";
import greenBean from "../../../../assets/images/dauxanh.png";
// import storageService from "../../../../services/storageService";
import Empty from "../../../../ui/Empty";
import { TableItem } from "../../../../ui/custom/Table/TableItem";
// import { formatDate, formatDateTime, useImageValidity } from "../../../../utils/helpers";
// import { useCampaignVoucherItem } from "../useCampaignVoucherItem";
import "./scss/campaign-voucher-item.scss";

const StackedTime = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-weight: 500;
`;

const StackedTimeLayout = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StackedTimeDate = styled.span`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 0.2rem;
  margin-left: 17%;
`;

const TotalIncome = styled.span`
  color: #2ecc71;
  margin-left: 0.3rem;
  font-weight: 600;
`;

function CampaignVoucherItems() {
    const { Title } = Typography;
    // const {
    //     isLoading,
    //     campaignVoucherItems,
    //     page,
    //     limit,
    //     handlePageChange,
    //     handleLimitChange,
    //     setSort,
    // } = useCampaignVoucherItem();
    // const navigate = useNavigate();
    // const role = storageService.getRoleLogin();

    // const voucherImages = campaignVoucherItems?.result?.map(item => item.voucherImage);
    // const isValidImages = useImageValidity(campaignVoucherItems?.result, voucherImages);

    const handleSort = () => {}; // Hàm rỗng để tránh lỗi khi chưa có API

    const getStatusTagColor = (bought, used) => {
        if (bought === false && used === false) return 'volcano';
        else if (bought === true && used === false) return 'blue';
        else if (bought === true && used === true) return 'cyan';
    };

    const getStatusName = (bought, used) => {
        if (bought === false && used === false) return 'Chưa mua';
        else if (bought === true && used === false) return 'Đã mua';
        else if (bought === true && used === true) return 'Đã sử dụng';
    };

    const columns = [
        { title: "STT", dataIndex: "number", key: "number", align: "center" },
        { title: "Ưu đãi", dataIndex: "VoucherName", key: "VoucherName" },
        { title: "Sinh viên", dataIndex: "Person", key: "Person" },
        { title: "Chi phí", dataIndex: "Price", key: "Price" },
        { title: "Hạn sử dụng", key: "Valid", dataIndex: "Valid" },
        { title: "Hoạt động", key: "State", dataIndex: "State", align: "center" },
    ];

    // Dữ liệu mẫu để hiển thị UI
    const mockData = [
        {
            key: 1,
            number: <div className="number-header"><span>1</span></div>,
            VoucherName: (
                <Avatar.Group>
                    <Avatar className="shape-avatar-product" shape="square" src={imgDefaultVoucher} />
                    <div className="avatar-info">
                        <Title className="title-item-name" level={5}>Voucher Giảm 50%</Title>
                        <p className="p-item-table">Code: ABC123</p>
                    </div>
                </Avatar.Group>
            ),
            Person: <div className="title-item-student-name">Nguyễn Văn A</div>,
            Price: (
                <StackedTime>
                    <span>Giá tiền: <TotalIncome>50,000<img className="shape-avatar-campaign-bean" src={greenBean} /></TotalIncome></span>
                    <span>Tỉ lệ chuyển đổi: <TotalIncome>x2</TotalIncome></span>
                </StackedTime>
            ),
            Valid: (
                <StackedTime>
                    <div><label>Hiệu lực từ:</label><span className="span-valid"> 2025-03-17</span></div>
                    <div><label>Hết hạn:</label><span className="span-valid"> 2025-04-17</span></div>
                </StackedTime>
            ),
            State: <Tag className="campaign-status-tag" color={getStatusTagColor(true, false)}>{getStatusName(true, false)}</Tag>,
            Date: (
                <StackedTimeLayout>
                    <StackedTimeDate>
                        <div><label>Ngày tạo:</label><span className="span-valid"> 2025-03-16 09:00</span></div>
                        <div><label>Thêm vào chiến dịch:</label><span className="span-valid"> 2025-03-16 10:00</span></div>
                    </StackedTimeDate>
                    <StackedTimeDate>
                        <div><label>Ngày mua:</label><span className="span-valid"> 2025-03-17 14:00</span></div>
                    </StackedTimeDate>
                </StackedTimeLayout>
            ),
        },
    ];

    return (
        <Spin spinning={false}>
            <TableItem
                columns={columns}
                dataSource={mockData}
                handleSort={handleSort}
                limit={5}
                label="Ưu đãi / Trang"
                page={1}
                elements={1}
                setPage={() => {}}
                setLimit={() => {}}
                expandable={{
                    expandedRowRender: (record) => <>{record.Date}</>,
                }}
            />
        </Spin>
    );
}

export default CampaignVoucherItems;