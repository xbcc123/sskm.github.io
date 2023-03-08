import { Layout, Button } from 'antd';
import { Detail } from './detail'
import styles from './App.module.css'
import 'antd/dist/reset.css';
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

const contentStyle = {
  minHeight: 'calc(100vh - 60px )',
  lineHeight: '120px',
};


const App = () => (
  <Layout>
    <Header className={styles.head}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>
          <span>Landbot 卡密</span>
          <span style={{ marginLeft: 10, fontSize: 12, color: '#666' }}>联系微信 qq793178</span>
        </span>
        <Link to={`pay_list`}><Button type='link' >查看历史订单</Button></Link>
      </div>
    </Header>
    <Content style={contentStyle}>
      <Detail></Detail>
    </Content>
    {/* <Footer style={footerStyle}>Footer</Footer> */}
  </Layout>
);
export default App;