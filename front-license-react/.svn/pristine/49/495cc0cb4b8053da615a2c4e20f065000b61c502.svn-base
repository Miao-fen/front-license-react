import React from 'react';
import licenseImg from '../../images/license.jpg';
import './license.css';
import QRCode  from 'qrcode.react';

class License extends React.Component{
    render(){
        //const ossurl="https://njcyy.oss-cn-beijing.aliyuncs.com/"
        const qrUrl=window.location.origin+'/#/q/'+this.props.id
        return(
            <div id='licenseWrap' className='licenseWrap'>
                <img src={licenseImg} alt='license-bg'/>
                <div className='headwrap' style={{display:this.props.imr?'block':'none'}}>
                    <img crossOrigin="anonymous" src={this.props.imr} alt='license-head'/>
                </div>
                <div className='name'>{this.props.name}</div>
                <div className='career'>检测员（食品快速检测）</div>
                <div className='idnumb'>{this.props.idnumb}</div>
                <div className='filenumber'>{this.props.filenumber}</div>
                <div className='time'>{this.props.time}</div>
                <QRCode className='qrCode'
                    value={qrUrl}  //value参数为生成二维码的链接
                    size={200} //二维码的宽高尺寸
                    fgColor="#000000"  //二维码的颜色
                />
            </div>
        )
    }
}
export default License;