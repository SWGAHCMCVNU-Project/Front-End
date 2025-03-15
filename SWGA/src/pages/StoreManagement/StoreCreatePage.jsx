import Title from "antd/lib/typography/Title";
import StoreFormCreate from "../../features/stores/store-form-create";

function StoreCreatePage() {
    return (
        <>
            <div className="title-table-list">
                <Title className="title-name-table-list" level={2}>
                    Thêm cửa hàng mới
                </Title>
            </div>
            <div>
                <StoreFormCreate />
            </div>
        </>
    );
};

export default StoreCreatePage;