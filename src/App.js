/*
 * @Author: yankj yankj
 * @Date: 2023-03-07 19:16:32
 * @LastEditors: yankj yankj
 * @LastEditTime: 2023-03-09 14:16:02
 * @FilePath: /my-app/src/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
          <span>Landbot卡密</span>
          <span style={{ marginLeft: 10, fontSize: 12, color: '#666' }}>联系微信qq793178</span>
        </span>
        <Link to={`pay_list`}><Button type='link' >历史订单 <span></span> </Button></Link>
      </div>
    </Header>
    <Content style={contentStyle}>
      <Detail></Detail>
    </Content>
    {/* <Footer style={footerStyle}>Footer</Footer> */}
  </Layout>
);
export default App;