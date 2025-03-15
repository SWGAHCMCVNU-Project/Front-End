import Title from "antd/lib/typography/Title";
import StoreFormUpdate from "../../features/stores/store-form-update";

export default function StoreUpdatePage() {
  return (
    <>
      <div className="title-table-list">
        <Title className="title-name-table-list" level={2}>
          Cập nhật cửa hàng
        </Title>
      </div>
      <div>
        <StoreFormUpdate />
      </div>
    </>
  );
}