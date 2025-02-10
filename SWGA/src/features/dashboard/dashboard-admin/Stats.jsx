/* eslint-disable react/prop-types */
import {
  HiOutlineSquare3Stack3D,
  HiOutlineTag,
  HiOutlineTicket,
  HiOutlineUsers,
} from "react-icons/hi2";
import Stat from "./Stat";

export default function Stats({ titles }) {
  return (
    <>
      <Stat
        title="Thương hiệu"
        color="blue"
        icon={<HiOutlineTag />}
        value={titles?.numberOfBrands}
      />
      <Stat
        title="Chiến dịch"
        color="green"
        icon={<HiOutlineTicket />}
        value={titles?.numberOfCampagins}
      />
      <Stat
        title="Sinh viên"
        color="indigo"
        icon={<HiOutlineUsers />}
        value={titles?.numberOfStudents}
      />
      <Stat
        title="Sản phẩm"
        color="yellow"
        icon={<HiOutlineSquare3Stack3D />}
        value={titles?.numberOfProducts}
      />
    </>
  );
}
