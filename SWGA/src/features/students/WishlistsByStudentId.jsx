import { useState } from "react";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import Menus from "../../ui/Menus";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import StackedHeader from "../../ui/StackedHeader";
import Table from "../../ui/Table";
import Empty from "./Empty";
import WishlistRow from "./WishlistRow";
import { useBrandWishlist } from "./useBrandWishlist";
import { useWishlistsByStudentId } from "./useWishlistsByStudentId";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Container = styled.div`
  margin: 2rem auto 3rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function WishlistsByStudentId() {
  const [limit, setLimit] = useState();
  const [sortField, setSortField] = useState("Id");
  const [sortOrder, setSortOrder] = useState("desc");
  const { wishlistsByStudentId, isLoading: wishlistsLoading } =
    useWishlistsByStudentId(limit, sortField, sortOrder);

  const { brandWishlistArray, isLoading: brandWishlistsLoading } =
    useBrandWishlist(wishlistsByStudentId?.result?.map(w => w.brandId) || []);

  if (wishlistsLoading || brandWishlistsLoading) return <Spinner />;

  if (!wishlistsByStudentId?.result?.length) {
    return (
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h2">Danh sách thương hiệu yêu thích</Heading>
          </HeadingGroup>
        </Row>
        <Empty resourceName="danh sách thương hiệu yêu thích" />
      </Container>
    );
  }

  if (!brandWishlistArray?.length) {
    return (
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h2">Danh sách thương hiệu yêu thích</Heading>
          </HeadingGroup>
        </Row>
        <Empty resourceName="danh sách thương hiệu yêu thích" />
      </Container>
    );
  }

  const handleStackedClick = (clickedColumn) => {
    setSortField(clickedColumn);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <Container>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h2">Danh sách thương hiệu yêu thích</Heading>
          </HeadingGroup>
        </Row>
        <Menus>
          <Table columns="0.7fr 3.2fr 1.6fr 1.2fr 1.1fr">
            <Table.Header>
              <StyledHeader>STT</StyledHeader>
              <StackedHeader
                label="Yêu thích"
                onClick={() => handleStackedClick("StationName")}
                $ascending={sortField === "StationName" && sortOrder === "asc"}
                $active={sortField === "StationName"}
              />
              <div>Thời gian diễn ra</div>
              <div>Tổng chi phí</div>

              <StyledHeader>Trạng thái</StyledHeader>
            </Table.Header>

            <Table.Body
              data={brandWishlistArray}
              render={(brand, index) => (
                <WishlistRow key={brand.id} brand={brand} index={index + 1} />
              )}
            />
          </Table>
        </Menus>
      </Container>
    </>
  );
}

export default WishlistsByStudentId;
