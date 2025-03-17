import { Spin, Tag } from "antd";
import Empty from "../../../../ui/Empty";
import { TableItem } from "../../../../ui/custom/Table/TableItem";
// import { formatDateTime } from "../../../../utils/helpers";
// import { useCampaignActivity } from "../useCampaignActivity";

function CampaignActivity() {
    // const {
    //     isLoading,
    //     campaignActivities,
    //     page,
    //     limit,
    //     handlePageChange,
    //     handleLimitChange
    // } = useCampaignActivity();

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
            title: "Trạng thái",
            dataIndex: "State",
            key: "State",
            align: "center",
            width: "20%"
        },
        {
            title: "Mô tả",
            dataIndex: "Description",
            key: "Description"
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "DateCreated",
            key: "DateCreated"
        }
    ];

    // Dữ liệu mẫu để hiển thị UI khi chưa có API
    const mockData = [
        {
            key: 1,
            number: <div className="number-header"><span>1</span></div>,
            State: <Tag className="campaign-status-tag" color={getStatusTagColor("Hoạt động")}>Hoạt động</Tag>,
            Description: <div className="campaign-description-major">Chiến dịch đang chạy</div>,
            DateCreated: <div className="ant-employed-table-align"><span>2025-03-17 10:00</span></div>,
        },
    ];

    // if (isLoading) {
    //     return (
    //         <Spin>
    //             <TableItem
    //                 columns={columns}
    //                 dataSource={[]}
    //                 pagination={false}
    //             />
    //         </Spin>
    //     );
    // }

    // if (!campaignActivities?.result?.length) return <Empty resourceName="trạng thái" />

    // const data = campaignActivities?.result?.map((activity, index) => {
    //     const dataIndex = (page - 1) * limit + index + 1;
    //     return {
    //         key: index,
    //         number: <div className="number-header"><span>{dataIndex}</span></div>,
    //         State: <Tag className="campaign-status-tag" color={getStatusTagColor(activity.stateName)}>{activity.stateName}</Tag>,
    //         Description: <div className="campaign-description-major">{activity.description}</div>,
    //         DateCreated: <div className="ant-employed-table-align"><span>{activity.dateCreated && formatDateTime(activity.dateCreated)}</span></div>,
    //     };
    // });

    return (
        <Spin spinning={false}> {/* Thay isLoading bằng false để hiển thị UI */}
            <TableItem
                columns={columns}
                dataSource={mockData} // Sử dụng dữ liệu mẫu
                limit={5}
                label="Trạng thái / Trang"
                page={1}
                elements={1} // Tổng số phần tử mẫu
                setPage={() => {}} // Hàm rỗng để tránh lỗi
                setLimit={() => {}} // Hàm rỗng để tránh lỗi
            />
        </Spin>
    );
}

export default CampaignActivity;