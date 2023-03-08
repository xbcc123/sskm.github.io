/*
 * @Author: yankj yankj
 * @Date: 2023-03-07 19:42:55
 * @LastEditors: yankj yankj
 * @LastEditTime: 2023-03-08 15:56:37
 * @FilePath: /my-app/src/detail/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Card, Row, Col, Input, Form, Radio, InputNumber, Button, Image, Modal, Spin } from "antd"
import styles from './index.module.css'
import { payPreCreate } from '../api'
import BigNumber from "bignumber.js";
import { useState } from "react"
import { Link } from "react-router-dom";

export const Detail = () => {

    const [form] = Form.useForm()
    const [price, setPrice] = useState(15)
    const [result, setResult] = useState('')
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(true)
        let params = {
            email: values?.email,
            phone: values?.phone,
            number: values?.number,
        }
        try {
            const data = await payPreCreate(params)
            console.log(data);
            setResult(data?.data || '')
            // setResult('data:image/png;base64,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')
            setVisible(true)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getPrice = () => {
        return new BigNumber(price * (form?.getFieldValue?.('number') || 1))?.toFixed(2)
    }

    return <Spin tip="正在创建订单请稍后..." spinning={loading} > <Row justify='center' style={{ marginTop: 16 }}>
        <Col span={22}>
            <Card >
                <div className={styles.proTit}>选择产品</div>
                <Card className={styles.pro} bodyStyle={{ padding: 0, paddingLeft: 8, paddingTop: 4 }}>
                    <div className={styles.name}>产品名称</div>
                    <div className={styles.price}>¥ {price}</div>
                    <div className={styles.count}>库存 999</div>
                </Card>
                <div className={styles.proDes}>商品描述</div>
                <div>
                    <div>商品描述</div>
                </div>
            </Card>
        </Col>
        <Col span={22} style={{ marginTop: 16 }}>
            <Card>
                <div className={styles.buyTit}>
                    填写信息/购买方式
                </div>
                <Form
                    form={form}
                    onFinish={onFinish}
                    initialValues={{
                        payMode: 'zfb',
                        number: 1
                    }}>
                    <Form.Item label='手机号' name={'phone'} rules={[{ required: true, message: '请输入手机号!' }]}>
                        <Input placeholder="请输入手机号"></Input>
                    </Form.Item>
                    <Form.Item label='邮箱' name={'email'} rules={[{ required: true, message: '请输入邮箱!' }]}>
                        <Input placeholder="请输入邮箱"></Input>
                    </Form.Item>
                    <Form.Item label='支付方式' name={'payMode'} rules={[{ required: true, message: '请选择支付方式!' }]}>
                        <Radio.Group >
                            <Radio.Button value="zfb">支付宝</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label='数量' name={'number'}>
                        <InputNumber precision={0} min={1} max={9999}></InputNumber>
                    </Form.Item>
                    <Form.Item shouldUpdate label='支付金额'>
                        {() => <span style={{
                            fontSize: 18,
                            color: 'red'
                        }}>{getPrice()}</span>}
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" htmlType='submit' loading={loading} type="primary">确认支付</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Col>

        <Modal maskClosable={false} width={500} cancelText='取消' okText={<Link to={`pay_list?phone=${form?.getFieldValue?.('phone')}`}>支付完成，点击这里查看卡密</Link>} title="支付宝扫码" open={visible} onOk={() => {
            setVisible(false)
        }} onCancel={() => setVisible(false)}>
            <div style={{margin: '0 auto', width: 200, height: 260, marginTop: 30}}>
                <Image  style={{margin: '0 auto', width: 200}} src={result}></Image>
            </div>
        </Modal>
    </Row></Spin>
}