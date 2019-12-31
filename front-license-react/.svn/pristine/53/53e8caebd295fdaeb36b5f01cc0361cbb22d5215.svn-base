import React from 'react';
import axios from 'axios';
import qs from 'qs'
import './qr.css';
import Zmage from 'react-zmage'

class Qr extends React.Component{
    constructor(props){
        super(props);
        this.state={
            license:{}
        }
    }
    componentDidMount() {
        this.getInfo()
    }
    getInfo=()=>{
        const that=this
        const params={
            pageNo:1,
            pageSize:20,
            zhuid:this.props.match.params.id
        }
        axios.post("/jkz/dayin/detectdayin",
            qs.stringify(params)
        ).then(function (response) {
            that.setState({
                license :response.data.page.rows[0]
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
    render(){
        return(
            <div className="qrwrap">
                <div className="title">
                    食品安全 · 职业技能证书
                </div>
                <div className="body">
                    <div>
                        <div>姓&emsp;&emsp;名：</div>
                        <div>{this.state.license.name}</div>
                    </div>
                    <div>
                        <div>身份证号：</div>
                        <div>{this.state.license.idnumb}</div>
                    </div>
                    <div>
                        <div>证书编号：</div>
                        <div>{this.state.license.filenumber}</div>
                    </div>
                    <div>
                        <div>发证日期</div>
                        <div>{this.state.license.createdate}</div>
                    </div>
                    {this.state.license.imr?
                    <div>
                        <div>头&emsp;&emsp;像：</div>
                        <div>
                            <Zmage src={this.state.license.imr} alt='license-head'/>
                        </div>
                    </div>
                    :''
                    }
                </div>
                <div className="foot">智锐达认证 · 权威发布</div>
            </div>
        )
    }
}
export default Qr;