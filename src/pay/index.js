import { Card, Input, Row, Col, List, Form, Spin } from "antd"
import { useEffect, useRef, useState } from "react"
import { orderQuery } from '../api'
import {
    SyncOutlined,
  } from '@ant-design/icons';

const PayList = () => {
    const [form] = Form.useForm()

    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const  urlParams = useRef()

    useEffect(() => {
        urlParams.current = new URLSearchParams(window.location.search)
        if(urlParams.current.get('phone')) {
            form?.setFieldsValue?.({
                keyword: urlParams.current.get('phone')
            })
            onSearch()
        }
    }, [])

    const onSearch = async () => {
        setLoading(true)
        let params = {
            keyword: form.getFieldValue('keyword') || urlParams.current.get('phone'),
        }
        try {
            const data = await orderQuery(params)
            setResult(data?.data?.filter?.(item => item.state === 1) || [])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return <Spin spinning={loading}> <Row justify='center' style={{ marginTop: 16 }}>
        <Col span={22}>
            <Card>
                <Form form={form}>
                    <Form.Item name='keyword'>
                        <Input.Search
                        placeholder="请输入手机号或者邮箱"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        onSearch={onSearch}
                    />
                    </Form.Item>
                </Form>
                <span>点击刷新订单列表：<SyncOutlined style={{cursor: 'pointer'}} onClick={() => onSearch()} /></span>
            </Card>
        </Col>
        <Col span={22} style={{ marginTop: 16 }}>
            <Card >
                <List
                    itemLayout="horizontal"
                    dataSource={result}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<span style={{
                                    whiteSpace: 'pre'
                                }}>卡密：{`\n${item.content}` || '-'}</span>}
                                description={<>
                                    <div> 订单号：{item.outTradeNo || '-'}</div>
                                    <div> email：{item.email || '-'}</div>
                                    <div> 支付时间：{item.payTime || '-'}</div>
                                    <div> 手机号：{item.phone || '-'}</div>
                                    <div> 数量：{item.number || '-'}</div>
                                    <div> 单价：{item.price || '-'}</div>
                                    <div> 二维码：{item.qrCode ? <img style={{ width: 100, height: 100 }} src={item.qrCode}></img>  : '-'}</div>
                                </>}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </Col>
    </Row>
    </Spin>
}


export default PayList