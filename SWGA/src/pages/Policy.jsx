import { Typography } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const PolicyContainer = styled.div`
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled(Title)`
  font-size: 1.5rem !important;
  margin-top: 1.5rem !important;
`;

const Policy = () => {
  return (
    <PolicyContainer>
      <Title level={2} style={{ textAlign: 'center' }}>
        Điều khoản và Điều kiện SWallet
      </Title>

      <SectionTitle level={3}>1. Điều khoản Sử dụng Chung</SectionTitle>
      <Paragraph>
        Bằng cách sử dụng SWallet, bạn đồng ý với các điều khoản và điều kiện này. SWallet cung cấp dịch vụ ví điện tử để quản lý điểm, thanh toán và phần thưởng. Mỗi tài khoản chỉ dành cho cá nhân sử dụng. Việc chia sẻ thông tin đăng nhập (tên người dùng và mật khẩu) với người khác là hoàn toàn bị cấm.
      </Paragraph>

      <SectionTitle level={3}>2. Chính sách Mua Điểm và Không Hoàn Tiền</SectionTitle>
      <Paragraph>
        Điểm mua qua SWallet không được hoàn tiền sau khi giao dịch hoàn tất. Vui lòng kiểm tra kỹ gói điểm trước khi xác nhận mua. SWallet có quyền từ chối các yêu cầu hoàn tiền trong mọi trường hợp, bao gồm nhưng không giới hạn bởi lỗi người dùng hoặc thay đổi ý định.
      </Paragraph>

      <SectionTitle level={3}>3. Bảo mật Tài khoản và Hạn chế</SectionTitle>
      <Paragraph>
        SWallet có thể tạm khóa hoặc hạn chế tài khoản nếu phát hiện hoạt động đáng ngờ, như truy cập trái phép, giao dịch gian lận hoặc vi phạm các điều khoản này. Bạn chịu trách nhiệm bảo vệ an toàn tài khoản và thông báo ngay cho chúng tôi nếu có sử dụng trái phép.
      </Paragraph>

      <SectionTitle level={3}>4. Giao hàng Sản phẩm và Giá cả</SectionTitle>
      <Paragraph>
        Tất cả giá của các gói điểm bao gồm các loại thuế áp dụng (ví dụ: VAT) theo quy định địa phương. SWallet đảm bảo giá cả minh bạch, và số tiền cuối cùng sẽ được hiển thị trước khi bạn xác nhận mua. Điểm sẽ được ghi có vào tài khoản ngay sau khi thanh toán thành công.
      </Paragraph>

      <SectionTitle level={3}>5. Trách nhiệm Người dùng</SectionTitle>
      <Paragraph>
        Bạn cam kết chỉ sử dụng SWallet cho các mục đích hợp pháp. Bất kỳ lạm dụng nào, như cố gắng khai thác hệ thống để nhận thêm điểm hoặc phần thưởng, có thể dẫn đến chấm dứt tài khoản mà không cần thông báo trước. SWallet không chịu trách nhiệm cho bất kỳ tổn thất nào do bạn không tuân thủ các điều khoản này.
      </Paragraph>

      <SectionTitle level={3}>6. Hỗ trợ và Giải quyết Tranh chấp</SectionTitle>
      <Paragraph>
        Đối với bất kỳ vấn đề nào liên quan đến tài khoản hoặc giao dịch, SWallet cung cấp hỗ trợ khách hàng 24/7 qua ứng dụng và website. Các tranh chấp về mua điểm phải được báo cáo trong vòng 7 ngày kể từ ngày giao dịch. Chúng tôi sẽ điều tra và giải quyết theo chính sách của mình.
      </Paragraph>
    </PolicyContainer>
  );
};

export default Policy;