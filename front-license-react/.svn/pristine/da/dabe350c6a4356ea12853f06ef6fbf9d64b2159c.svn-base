import React from 'react';
// import logo from '../logo.svg';
//import DatePicker from 'antd/es/date-picker'; // 按需加载 JS
//import 'antd/es/date-picker/style/css'; // 按需加载 CSS
import { Input,Icon,Button,Alert,Form} from 'antd';// 加载 JS
import 'antd/dist/antd.css';// 加载 CSS
import './login.css';
import axios from 'axios';
import qs from 'qs'


class Uname extends React.Component{
  constructor(props){
      super(props);
      this.state={
          uname:"",
          unameerr:""
      }
  }
  handleChange=(event)=>{
      this.setState({
          uname:event.target.value
      })
      this.props.getName(this.state.uname);
  }
  handleBlur=()=>{
      //var unameReg=/^(?!\d+$)(?![a-zA-Z]+$)(?!_+$)(?![0-9_]+$)(?![a-zA-Z_]+$)\w{4,8}$/;
      this.props.getName(this.state.uname);
      // if(unameReg.test(this.state.uname)){
      //     this.setState({unameerr:""})
      // }else{
      //     this.setState({unameerr:"您的用户名输入错误"})
      // }
  }
  render(){
      return(
          <div>
            <Input
              placeholder="请输入用户名" style={{marginTop:20}} autoComplete="off"
              suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="uname" value={this.state.uname} onChange={this.handleChange} onBlur={this.handleBlur}
            />
            {/* <span>{this.state.unameerr}</span> */}
          </div>
      )
  }
}
class Password extends React.Component{
  constructor(){
      super();
      this.state={
          psd:"",
          psderr:""
      }
  }
  handleChange=(event)=>{
      this.setState({
          psd:event.target.value
      })
      this.props.getPsd(this.state.psd)
  }
  handleBlur=()=>{
    this.props.getPsd(this.state.psd)
  }
  render(){
    return(
      <Input.Password placeholder="请输入密码" style={{marginTop:20}} autoComplete="off"
        name="psd" value={this.state.psd} onChange={this.handleChange} onBlur={this.handleBlur}
      />
    )
  }
}
class Register extends React.Component{
  constructor(props){
      super(props);
      this.state={
          uname:"",
          psd:"",
          isShow:false
      }
  }
  componentDidMount(){
    //const that=this
    // window.addEventListener('keypress',function(e){
    //   if(e.which==13){
    //     that.register()
    //   }
    // })
  }
  showName=(name)=>{
      this.setState({
          uname:name
      })
  }
  showPsd=(psd)=>{
      this.setState({
          psd:psd
      })
  }
  register=()=>{
      const that=this
      if(this.state.uname===""&&this.state.psd===""){
          alert("请输入用户名及密码")
      }else if(this.state.uname===""){
          alert("请输入用户名")
      }else if(this.state.psd===""){
          alert("请输入密码")
      }else{
        axios.post("/jkz/login/userLogin",qs.stringify({
          username:this.state.uname,
          password:this.state.psd
        })).then(function (response) {
          let data =response.data
          if(data===1){
            console.log(that.props)
            console.log(response)
            that.props.historyPush('/list',that.state.uname);
            sessionStorage.setItem("username",this.state.uname);
          }else{
            that.setState({
              isShow:true
          })
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
  }
  render(){
      return(
          <div>
            <p className="p1">食品安全</p>
            <p className="p2">职业技能证书</p>
            <Uname getName={this.showName}/>
            <Password getPsd={this.showPsd}/>
            <Alert message="账号密码输入错误，请检查。" type="error" style={{marginTop:20}} className={this.state.isShow ? 'show': 'hidden'} showIcon />
            <Button type="primary" block onClick={this.register} style={{marginTop:40}}>登录</Button>
          </div>
      )
  }
}
class Login extends React.Component{
  // constructor(props){
  //   super(props);
  // }
  historyPush=(pathname,username)=>{
    this.props.history.push({
      pathname:pathname
    });
  }
  render(){
    return(
      <div className="App">
        <input hidden/><input type="password" hidden/>
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="wrapBox">
            <Register historyPush={this.historyPush}/>
          </div>
          <p className="foot">智锐达认证 · 权威发布</p>
        </header>
      </div>
    )
  }
}
export default Login;
