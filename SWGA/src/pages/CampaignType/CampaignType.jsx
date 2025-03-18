import styled from "styled-components";
import FilterOperations from "../../features/voucher-type/FilterOperations";
import CampaignTypeTable from "../../features/campaign-type/CampaignTypeTable";
import CampaignTypeTableOperations from "../../features/campaign-type/CampaignTypeTableOperations";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import VoucherTypeList from "../../features/voucher-type/VoucherTypeList";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function CampaignType() {
  return (
    <>
      <Container>
        <Heading as="h1">Danh sách các thể loại của chiến dịch</Heading>
        <Row type="horizontal">
          <FilterOperations />
          <CampaignTypeTableOperations />
        </Row>
        <Row>
          <CampaignTypeTable />
        </Row>
      </Container>
    </>
  );
}

export default CampaignType;
