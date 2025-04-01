/* eslint-disable react/prop-types */
import {
  HiOutlineBuildingStorefront,
  HiOutlineCalendarDays,
  HiOutlineSquare3Stack3D,
  HiOutlineTicket,
} from "react-icons/hi2";
import Stat from "./Stat";
import StatBalanceBean from "./StatBalanceBean";

export default function Stats({ titles }) {
  return (
    <>
      <Stat
        title="Chiến dịch"
        color="blue"
        icon={<HiOutlineCalendarDays />}
        value={titles?.numberOfCampaigns || 0}
      />
      <Stat
        title="Cửa hàng"
        color="green"
        icon={<HiOutlineBuildingStorefront />}
        value={titles?.numberOfStores || 0}
      />
      <Stat
        title="Phiếu ưu đãi"
        color="indigo"
        icon={<HiOutlineTicket />}
        value={titles?.numberOfVoucherItems || 0}
      />
      <StatBalanceBean
        title="Ví"
        color="yellow"
        icon={<HiOutlineSquare3Stack3D />}
        value={titles?.balance || 0} // Assuming balance is still needed
      />
    </>
  );
}