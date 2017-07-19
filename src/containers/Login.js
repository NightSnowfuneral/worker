import React,{Component} from 'react'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {message,Button} from 'antd'
import * as actions from '../actions'
import Ajax from '../api/index'
import md5 from 'md5'
import Post from '../api/Post'

const post = new Post()

class Login extends Component{
  constructor(props) { //初始值
    super(props);
    this.state={
      indentifyCode:"",
      phone:"",
      password:"",
      btnLoading:false
    }
  }
  handleChange(name,even){ //获取表单数据与修改
    let newState={}
    newState[name] = even.target.value

    this.setState(newState)
  }
  componentWillUnmount() { //清理setTimeout等函数，或者任意的在componentDidMount创建的DOM元素
    clearInterval(this.timer)

  }
  async ajaxLogin(data){ //获取随机码
    const ranom = {phone:data.phone}
    const {indentifyCode} = this.state
    const res=await post.RandomCode(ranom)
    this.setState({
        indentifyCode:res.salt
    })
    
    this.submitted()
    
   
  }

  //上传信息填写信息
  async submitted(){
      const {phone, password, indentifyCode} = this.state

      
      if (password === "") {
      this.showMessage("warning","请输入密码！")
         return
      }
      this.setState({btnLoading:true})
      const data ={
        phone,
        password: this.setMD5Password(password),
      

      }
      
  
      const res  = await post.adminSession(data)
  
      if (res.code == 200) {
          this.props.router.replace('/')
          sessionStorage.LoginId = phone
          message.success("登录成功")   //没办法中的办法
          this.time = setTimeout(() =>{
            this.props.router.replace('/')
          },800)

      }
      else{
          this.showMessage("error","登录失败")
          this.setState({btnLoading:false})
      }
       
  } 
  setMD5Password(password){    //加密函数
    const {indentifyCode} = this.state
    const newPassword = md5(password + indentifyCode)
    return newPassword
  }
  handleSubmit(e){ //点击提交之后，state值改变 获取填入的信息
    e.preventDefault()
    const {phone, password, indentifyCode} = this.state
    if (phone ==="") {
      this.showMessage("warning","请输入用户名！")
      return 
    }
    
   
    const data ={   //数据
        phone
        
    }
 
    this.ajaxLogin(data)
  }

  showMessage(type,content){  //弹出提示内容
    switch(type) {
      case "warning":
        message.warning(content)
        break;
      case "error":
        message.error(content)
        break;
      default:
        messgae.success(content)
    }
  }



  render(){
    const {btnLoading} = this.state
    
    return(
        <div className="login">
          <form  onSubmit={this.handleSubmit.bind(this)}>
            <dl className="login_box">
              <dt>
                <strong>运维e把手</strong>
              </dt>
              <dd className="user">
                <input type="text" placeholder="账号" className="login_txtbx" onChange={this.handleChange.bind(this,'phone')}/>

              </dd>
              <dd className="pwd">
                <input type="password" placeholder = "密码" className="login_txtbx" onChange={this.handleChange.bind(this, 'password')} />
              </dd>
              <dd>
                <button disabled={btnLoading} className="submit_btn" type="submit">
                    {btnLoading &&
                      <i className="fa fa-spinner fa-pulse fa-fw" style={{marginRight:"6px"}}></i>
                    }
                    立即登入
                  </button>
               </dd>


            </dl>
          </form>
        </div>
      )
  }
}

const mapStateToProps=state=>{
  const {postsByPostTitle}=state
  return {
    postsByPostTitle
  }
}
const mapDispatchToProps=(dispatch)=>({
  actions:bindActionCreators(actions,dispatch)
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))