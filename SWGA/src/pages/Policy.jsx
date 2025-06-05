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
        Bằng cách sử dụng SWallet, bạn đồng ý với các điều khoản và điều kiện này. SWallet cung cấp dịch vụ ví tích điểm để hỗ trợ quản lý điểm. Điểm được sử dụng để tạo và phát hành voucher cho sinh viên hoặc phân phối cho giảng viên, tùy thuộc vào vai trò của bạn trong hệ thống. Mỗi tài khoản chỉ dành cho đại diện chính thức. Việc chia sẻ thông tin đăng nhập (tên người dùng và mật khẩu) với người khác là hoàn toàn bị cấm.
      </Paragraph>

      <SectionTitle level={3}>2. Chính sách Mua Điểm và Không Hoàn Tiền</SectionTitle>
      <Paragraph>
        Điểm mua qua SWallet không được hoàn tiền sau khi giao dịch hoàn tất. Vui lòng kiểm tra kỹ gói điểm trước khi xác nhận mua. SWallet có quyền từ chối các yêu cầu hoàn tiền trong mọi trường hợp, bao gồm nhưng không giới hạn bởi lỗi người dùng hoặc thay đổi ý định.
      </Paragraph>

      <SectionTitle level={3}>3. Bảo mật Tài khoản và Hạn chế</SectionTitle>
      <Paragraph>
        SWallet có thể tạm khóa hoặc hạn chế tài khoản nếu phát hiện hoạt động đáng ngờ, như truy cập trái phép, giao dịch gian lận hoặc vi phạm các điều khoản này. Bạn chịu trách nhiệm bảo vệ an toàn tài khoản và thông báo ngay cho chúng tôi nếu có sử dụng trái phép.
      </Paragraph>

      <SectionTitle level={3}>4. Sản phẩm và Giá cả</SectionTitle>
      <Paragraph>
        Tất cả giá của các gói điểm bao gồm các loại thuế áp dụng (ví dụ: VAT) theo quy định địa phương. SWallet đảm bảo giá cả minh bạch, và số tiền cuối cùng sẽ được hiển thị trước khi xác nhận mua. Điểm sẽ được ghi có vào tài khoản ngay sau khi thanh toán thành công. Để tham khảo, 1 điểm tương đương với 100 đồng. Hiện tại, SWallet chưa hỗ trợ quy đổi từ điểm ra tiền mặt. Nếu có bất kỳ thay đổi nào về chính sách này, chúng tôi sẽ cập nhật trong tương lai.
      </Paragraph>

      <SectionTitle level={3}>5. Vai trò của Thương hiệu trong Tạo và Phát hành Voucher (Dành cho Thương hiệu)</SectionTitle>
      <Paragraph>
        Thương hiệu sử dụng điểm đã mua để tạo và phát hành voucher trên SWallet: <br />
        - <strong>Mua Điểm</strong>: Thương hiệu mua điểm qua mục "Mua Điểm" để có số dư điểm cần thiết. <br />
        - <strong>Tạo Voucher</strong>: Sử dụng điểm để thiết kế voucher, xác định giá trị (1 điểm = 100 đồng), điều kiện sử dụng, thời hạn hiệu lực, và ưu đãi cụ thể (ví dụ: giảm giá 20%, miễn phí sản phẩm). Ví dụ: Để tạo một voucher trị giá 20.000 đồng, thương hiệu cần sử dụng 200 điểm. <br />
        - <strong>Phát hành Voucher</strong>: Sau khi tạo, thương hiệu phát hành voucher vào mục "Ưu đãi" trên SWallet để sinh viên có thể đổi. Voucher có thể được phát hành theo các chiến dịch khuyến mãi, sự kiện đặc biệt, hoặc để thu hút khách hàng mới. <br />
        - <strong>Quản lý và Theo dõi</strong>: Thương hiệu chịu trách nhiệm theo dõi việc sử dụng voucher, đảm bảo chúng được áp dụng đúng tại các cửa hàng hoặc dịch vụ liên kết, và hỗ trợ xử lý các vấn đề phát sinh (như voucher không áp dụng được). <br />
        - <strong>Tăng Nhận diện Thương hiệu</strong>: Voucher là công cụ marketing giúp thương hiệu tăng nhận diện thông qua logo, thông tin liên hệ, và thông điệp được hiển thị trên voucher. <br />
        Nếu có thắc mắc về việc tạo hoặc phát hành voucher, vui lòng liên hệ hỗ trợ qua hotline: 0329137972.
      </Paragraph>

      {/* <SectionTitle level={3}>6. Vai trò của Campus trong Mua và Phân phối Điểm (Dành cho Campus)</SectionTitle>
      <Paragraph>
        Campus đóng vai trò mua và phân phối điểm trong hệ thống SWallet: <br />
        - <strong>Mua Điểm</strong>: Campus mua điểm qua mục "Mua Điểm" để có số dư điểm cần thiết. <br />
        - <strong>Phân phối Điểm</strong>: Campus phân phối điểm đã mua cho giảng viên dựa trên các tiêu chí hoặc hoạt động cụ thể (ví dụ: tham gia sự kiện, giảng dạy). Điểm này có thể được giảng viên sử dụng trong các hoạt động liên quan đến SWallet. <br />
        - <strong>Không Tạo Voucher</strong>: Campus không có quyền tạo hoặc phát hành voucher. Vai trò của campus chỉ giới hạn ở việc mua và phân phối điểm cho giảng viên. <br />
        - <strong>Quản lý Phân phối</strong>: Campus chịu trách nhiệm đảm bảo điểm được phân phối đúng đối tượng và theo dõi việc sử dụng điểm của giảng viên. <br />
        Nếu có thắc mắc về việc mua hoặc phân phối điểm, vui lòng liên hệ hỗ trợ qua hotline: 0329137972.
      </Paragraph> */}

      <SectionTitle level={3}>6. Hỗ trợ và Giải quyết Tranh chấp</SectionTitle>
      <Paragraph>
        Đối với bất kỳ vấn đề nào liên quan đến tài khoản, giao dịch mua điểm, tạo voucher, hoặc phân phối điểm, SWallet cung cấp hỗ trợ khách hàng 24/7 qua hotline. Số hotline để liên hệ: 0329137972.
      </Paragraph>
    </PolicyContainer>
  );
};

export default Policy;