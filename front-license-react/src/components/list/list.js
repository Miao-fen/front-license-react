import React from 'react';
import 'antd/dist/antd.css';// 加载 CSS
import '../common.css';// 加载 CSS
import axios from '../../axios';
import qs from 'qs'
import { Modal, Input, Button, Table, Divider, Upload, Icon, message, Popconfirm, DatePicker, Spin, Form, Checkbox } from 'antd';
import moment from "moment";
import License from '../license/license'
import html2canvas from 'html2canvas'
import $ from 'jquery'
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('你只能上传jpg或png图片!');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
        message.error('图片必须小于1M!');
    }
    return isJpgOrPng && isLt1M;
}
class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryInfo: {
                detectname: this.props.detectname,
                detectnumber: this.props.detectnumber,
                filenumber: this.props.filenumber
            }
        }
    }
    handleChange = (name, event) => {
        this.state.queryInfo[name] = event.target.value
        this.setState({
            queryInfo: this.state.queryInfo
        })
    }
    handleBlur = () => {
        this.props.getList(this.state.queryInfo);
    }
    goAdd = () => {
        this.props.goAdd();
    }
    plCz = () => {
        this.props.showModalsj('pl');
    }
    render() {
        return (
            <div className="summary">
                <div className="setOption">
                    <Input value={this.state.queryInfo.detectname} onChange={this.handleChange.bind(this, 'detectname')} placeholder="检测师姓名" />
                </div>
                <div className="setOption">
                    <Input value={this.state.queryInfo.detectnumber} onChange={this.handleChange.bind(this, 'detectnumber')} placeholder="身份证号" />
                </div>
                <div className="setOption">
                    <Input value={this.state.queryInfo.filenumber} onChange={this.handleChange.bind(this, 'filenumber')} placeholder="证书编号" />
                </div>
                <Button className="searchBtn" type="primary" block onClick={this.handleBlur}>查&emsp;询</Button>
                <Button className="searchBtn fr" type="primary" block onClick={this.goAdd}>新&emsp;建</Button>
                <Button style={{ marginRight: '5px' }} className="searchBtn fr" type="primary" block onClick={this.plCz}>批量出证</Button>
            </div>
        )
    }
}
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    render: (val, item, index) => (
                        <span>{index + 1}</span>
                    ),
                },
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '身份证号',
                    dataIndex: 'idnumb',
                    key: 'idnumb',
                },
                {
                    title: '证书编号',
                    dataIndex: 'filenumber',
                    key: 'filenumber',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: '300px',
                    render: (val, item, index) => (
                        <span>
                            <Button type="primary" onClick={this.getLicense.bind(this, index, item, val)}>出证</Button>
                            <Divider type="vertical" />
                            <Button onClick={this.goEdit.bind(this, index)} style={{ background: '#ffa200', color: 'white' }}>修改</Button>
                            <Divider type="vertical" />
                            <Popconfirm placement="top" title='确定要删除吗' onConfirm={this.goDelete.bind(this, index)} okText="确定" cancelText="取消">
                                <Button type="danger">删除</Button>
                            </Popconfirm>
                        </span>
                    ),
                },
            ],
            dataSource: [],
            visiblecz: false,
            licenseInfo: {},
            loading: false,
            imageUrl: '',
            queryInfo: {
                detectname: '',
                detectnumber: '',
                filenumber: ''
            },
            AddOrEdit: '',
            confirmLoading: false,
            czTime: moment().format('YYYY年MM月DD日'),
            selectedRowKeys: '',
            selectedRows: [],
            isPl: false,
            pageInfo: {
                pageSize: 10,
                totalData: 0,
                pageNo: 1
            },
            listloading: false
        }
    }
    componentDidMount() {
        this.getList()
    }
    getLicense = (idx, item, val) => {
        console.log(idx)
        console.log(item)
        console.log(val)
        this.setState({
            licenseInfo: this.state.dataSource[idx]
        }, function () {
            this.showModalsj()
        });
    }
    showModalcz = () => {
        this.setState({
            visiblecz: true,
        });
    };
    showModalsj = (pl) => {
        if (this.state.licenseInfo.createdate !== "" && !pl) {
            console.log(this.state.licenseInfo.createdate)
            this.setState({
                czTime: this.state.licenseInfo.createdate
            })
        } else {
            this.setState({
                czTime: moment().format('YYYY年MM月DD日')
            })
        }
        this.state.licenseInfo.time = this.state.czTime
        this.setState({
            isPl: pl ? true : false,
            visiblesj: true,
            licenseInfo: this.state.licenseInfo
        });
    };
    handleOkcz = e => {
        console.log(e);
        this.setState({
            visiblecz: false,
        });
    };
    onChangesj = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        this.state.licenseInfo.time = dateString
        this.setState({
            czTime: dateString,
            licenseInfo: this.state.licenseInfo,
        });
    }
    handleOksj = e => {
        if (this.state.isPl) {
            this.plCz()
            return
        }
        console.log(e);
        const that = this
        var params = {
            zhuid: that.state.licenseInfo.id,
            detectname: that.state.licenseInfo.name,
            detectnumber: that.state.licenseInfo.idnumb,
            filenumber: that.state.licenseInfo.filenumber,
            time: that.state.licenseInfo.time,
            fileimr: that.state.imageUrl
        }
        axios.post("/jkz/upjkz/updatejkz",
            qs.stringify(params)
        ).then(function (response) {
            that.setState({
                visiblesj: false,
            });
            let data = response.data
            if (data) {
                message.success('出证时间保存成功', 3);
                that.getList('')
            }
        }).catch(function (error) {
            that.setState({
                visiblesj: false,
            });
            message.error('出证时间保存失败', 3);
        });
        this.setState({
            visiblesj: false
        }, function () {
            that.download()
        });
    };
    handleCancelcz = e => {
        console.log(e);
        if (this.state.confirmLoading === true) {
            message.warning('请等待保存结束', 3);
        } else {
            this.setState({
                visiblecz: false,
            });
        }
    };
    handleCancelsj = e => {
        console.log(e);
        this.setState({
            visiblesj: false,
        });
    };
    getList = (queryInfo) => {
        const that = this
        if (queryInfo) {
            that.setState({
                queryInfo: queryInfo
            })
        }
        that.setState({
            listloading: true
        })
        const params_2 = {
            pageNo: this.state.pageInfo.pageNo,
            pageSize: 10
        }
        const params = $.extend(that.state.queryInfo, params_2)
        axios.post("/jkz/dayin/detectdayin",
            qs.stringify(params)
        ).then(function (response) {
            that.setState({
                listloading: false
            })
            let data = response.data
            console.log(response)
            if (data) {
                that.setState({
                    dataSource: data.page.rows,
                    pageInfo: {
                        totalData: data.page.totalCount,
                        pageNo: 1,
                        pageSize: 10,
                    }
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    goAdd = () => {
        const that = this
        that.setState({
            licenseInfo: {},
            visiblecz: true,
            AddOrEdit: 'add',
            imageUrl: ''
        });
        axios.post("/jkz/Atm/AutoM",
            qs.stringify({
                atm: 1
            })
        ).then(function (response) {
            let data = response.data
            if (data) {
                that.setState({
                    licenseInfo: {
                        filenumber: data
                    }
                })
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    goEdit = (idx) => {
        this.setState({
            licenseInfo: this.state.dataSource[idx],
            visiblecz: true,
            AddOrEdit: 'edit',
            imageUrl: this.state.dataSource[idx].imr
        });
    }
    goDelete = (idx) => {
        const that = this
        axios.post('/jkz/deletejkz/dtjkz',
            qs.stringify({
                zhuid: this.state.dataSource[idx].id
            })
        ).then(function (response) {
            let data = response.data
            if (data) {
                message.success('删除成功', 3);
                that.getList('')
            }
        }).catch(function (error) {
            message.error('删除失败', 3);
        });
    }
    handleChange = (name, event) => {
        this.state.licenseInfo[name] = event.target.value
        this.setState({
            licenseInfo: this.state.licenseInfo,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const that = this
        that.setState({
            confirmLoading: true,
        })
        var url = "/jkz/jiankangzheng/addJianKangZheng"
        var params = {
            detectname: that.state.licenseInfo.name,
            detectnumber: that.state.licenseInfo.idnumb,
            filenumber: that.state.licenseInfo.filenumber,
            fileimr: that.state.imageUrl
        }
        if (that.state.licenseInfo.time) {
            params.time = that.state.licenseInfo.time
        } else {
            params.time = ''
        }
        if (that.state.AddOrEdit === 'edit') {
            url = "/jkz/upjkz/updatejkz"
            params.zhuid = that.state.licenseInfo.id
        }
        axios.post(url,
            qs.stringify(params)
        ).then(function (response) {
            that.setState({
                confirmLoading: false,
            });
            let data = response.data
            if (data) {
                message.success('保存成功', 3);
                that.setState({
                    visiblecz: false,
                });
                that.getList()
            }
        }).catch(function (error) {
            that.setState({
                confirmLoading: false,
            });
            message.error('保存失败', 3);
        });
    }
    plCz = () => {
        const that = this
        let ids = []
        let flag=true
        const { validateFields } = this.props.form;
        validateFields(['isAll'],(err,values)=>{
            if(!err){
                flag=values.isAll
                if (flag) {
                    ids = that.state.selectedRowKeys.join(',')
                } else {
                    for (let i in that.state.selectedRows) {
                        if (that.state.selectedRows[i].createdate === '') {
                            ids.push(that.state.selectedRows[i].id)
                        }
                    }
                }
            }
        })
        var params = {
            zhuids: ids,
            time: that.state.czTime
        }
        axios.post("/jkz/plxg/plxgjkz",
            qs.stringify(params)
        ).then(function (response) {
            const data = response.data
            if (data) {
                message.success('出证时间保存成功', 3);
                that.getList()
            }
        }).catch(function (error) {
            message.error('出证时间保存失败', 3);
        });
        this.setState({
            visiblesj: false
        }, function () {
            pl(0)
        });
        var pl = (i) => {
            let idx = i
            if (flag) {
                that.state.selectedRows[idx].time = that.state.czTime
            } else {
                if (that.state.selectedRows[idx].createdate === '') {
                    that.state.selectedRows[idx].time = that.state.czTime
                }else{
                    that.state.selectedRows[idx].time = that.state.selectedRows[idx].createdate
                }
            }

            that.setState({
                licenseInfo: that.state.selectedRows[idx]
            }, function () {
                that.download()
                idx++
                if (idx < that.state.selectedRows.length) {
                    setTimeout(function () {
                        pl(idx)
                    }, 1500);
                }
            });
        }
    }
    download = () => {
        const that = this
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf('Opera') > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf('Trident/7.0;') > -1 && !isIE; //判断是否IE的Edge浏览器
        /*下载二维码*/
        html2canvas(document.getElementById('licenseWrap'), {
            width: 3508,
            height: 2480,
            useCORS: true,
        }).then(function (canvas) {
            var src = canvas.toDataURL('image/jpeg', 0.4);
            if (isIE || isEdge) {
                var img = document.createElement('img');
                img.onload = function (e) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var context = canvas.getContext('2d');
                    context.drawImage(img, 0, 0, img.width, img.height);
                    window.navigator.msSaveBlob(canvas.msToBlob(), that.state.licenseInfo.name + ".png");
                };
                img.src = src;
            } else {
                var triggerDownload = $("<a>").attr("href", src).attr("target", "_blank").attr("download", that.state.licenseInfo.name + ".png").appendTo("body");
                triggerDownload[0].click();
                triggerDownload.remove();
            }
        });
    }
    handleChange_upload = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            const ossurl = "https://njcyy.oss-cn-beijing.aliyuncs.com/";
            this.setState({
                imageUrl: ossurl + info.file.response.url,
                loading: false
            })
        }
    };
    goToThisPage = (page, num) => {
        const params = {
            pageNo: page,
            pageSize: num
        }
        const that = this
        that.setState({
            listloading: true
        })
        axios.post("/jkz/dayin/detectdayin", qs.stringify(params))
            .then(function (res) {
                that.setState({
                    listloading: false
                })
                console.log(res);
                that.setState({
                    dataSource: res.data.page.rows,
                    pageInfo: {
                        pageSize: num,
                        totalData: res.data.page.totalCount,
                        pageNo: res.data.page.pageNo
                    }
                })
            }).catch(function (data) {
                console.log(data);
            })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const that = this
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                that.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                })
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            // getCheckboxProps: record => ({
            //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
            //   name: record.name,
            // }),
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const { pageInfo } = this.state
        return (
            <div className="main_body">
                <Name
                    getList={this.getList}
                    goAdd={this.goAdd}
                    showModalsj={this.showModalsj}
                    detectname={this.state.queryInfo.detectname}
                    detectnumber={this.state.queryInfo.detectnumber}
                    filenumber={this.state.queryInfo.filenumber}
                />
                <div className="newTableWrap">
                    {this.state.listloading ? <Spin size="large" /> : ''}
                    <Table
                        rowSelection={rowSelection}
                        rowKey="id"
                        pagination={{
                            total: pageInfo.totalData,
                            pageSize: pageInfo.pageSize,
                            defaultPageSize: pageInfo.pageSize,
                            onChange: (current, pageSize) => {
                                this.goToThisPage(current, pageInfo.pageSize);
                            },
                            showTotal: function () {
                                return '共 ' + pageInfo.totalData + ' 条数据';
                            }
                        }}
                        columns={this.state.columns}
                        dataSource={this.state.dataSource}
                    />
                </div>
                <Modal
                    title="证书"
                    footer={false}
                    visible={this.state.visiblecz}
                    onOk={this.handleOkcz}
                    onCancel={this.handleCancelcz}
                >
                    <form className="licenseForm" onSubmit={this.handleSubmit}>
                        <div>
                            <label>姓名：</label>
                            <Input value={this.state.licenseInfo.name} onChange={this.handleChange.bind(this, 'name')} type="text" required />
                        </div>
                        <div>
                            <label>身份证号：</label>
                            <Input value={this.state.licenseInfo.idnumb} onChange={this.handleChange.bind(this, 'idnumb')} type="text" required />
                        </div>
                        <div>
                            <label>证书编号：</label>
                            <Input value={this.state.licenseInfo.filenumber} onChange={this.handleChange.bind(this, 'filenumber')} type="text" required />
                        </div>
                        <div>
                            <label style={{ verticalAlign: 'top' }}>头像：</label>
                            <Upload
                                style={{ width: 200 }}
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action='/jkz/upload'
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange_upload}
                            >
                                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>
                        <div className="formFoot" style={{ textAlign: 'center', marginTop: '40px' }}>
                            <Button style={{ display: this.state.confirmLoading ? 'inline-block' : 'none' }} type="primary" loading>提交</Button>
                            <Input style={{ background: '#1890ff', color: 'white', display: this.state.confirmLoading ? 'none' : 'inline-block' }} type="submit" value="提交" />
                        </div>
                    </form>
                </Modal>
                <Modal
                    title="出证时间"
                    visible={this.state.visiblesj}
                    onOk={this.handleOksj}
                    onCancel={this.handleCancelsj}
                >
                    <div>
                        <div>请选择出证时间：<DatePicker onChange={this.onChangesj} value={moment(this.state.czTime, 'YYYY年MM月DD日')} format='YYYY年MM月DD日' /></div>
                        {this.state.isPl ?
                            <Form>
                                <Form.Item>
                                    {
                                        getFieldDecorator("isAll", {
                                            valuePropName: 'checked',
                                            initialValue: false,
                                        })(
                                            <Checkbox style={{color:'#2C69C4'}}>更新出证时间（如不勾选，则已出过证的证书将沿用之前的出证时间）</Checkbox>
                                        )
                                    }
                                </Form.Item>
                            </Form> : ''
                        }
                    </div>
                </Modal>
                <License {...this.state.licenseInfo} />
            </div>
        )
    }
}
export default Form.create()(List);