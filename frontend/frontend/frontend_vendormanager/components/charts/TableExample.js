import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Empty, Button } from 'antd';

export default function TableExample() {
  return (
    <>
      <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
        Please read our <a href="#API">documentation</a>
      </span>
    }
  >
    <Button type="primary">Create Now</Button>
  </Empty>
    </>
  )
}
