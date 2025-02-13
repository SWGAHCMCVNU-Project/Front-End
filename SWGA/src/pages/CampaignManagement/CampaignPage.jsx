/* eslint-disable no-extra-semi */
import { Card, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import styled from "styled-components";
import CampaignFilter from "../../features/campaigns/CampaignPage/campaign-filter/campaign-filter";
import CampaignList from "../../features/campaigns/CampaignPage/campaign-list/campaign-list";
import CampaignSearch from "../../features/campaigns/CampaignPage/campaign-search/campaign-search";
import { CampaignProvider } from "../../features/campaigns/CampaignPage/useCampaign";

const Container = styled.div`
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function CampaignPage() {
    return (
        <CampaignProvider>
            <Container>
                <Title level={2}>
                    Danh sách chiến dịch
                </Title>
                <div className="title-table-list">
                    <div>
                        <CampaignFilter />
                    </div>
                    <div>
                        <CampaignSearch />
                    </div>
                </div>

                <div className="tabled">
                    <Row gutter={[24, 0]}>
                        <Col xs="24" xl={24}>
                            <Card
                                bordered={false}
                                className="criclebox tablespace mb-24"
                            >
                                <CampaignList />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </CampaignProvider>
    );
};

export default CampaignPage;