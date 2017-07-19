import React,{Component} from 'react'
import {Link, IndexLink,withRouter } from 'react-router'
import {Form, Row, Col, Input, Button, Icon, Select, Cascader, DatePicker, message, Checkbox, Spin, Menu} from 'antd'
import moment from 'moment'
import {Allbutton} from '../../api/Format'
import objectAssign from 'object-assign'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Get from '../../api/Get'
import Post from '../../api/Post'
import * as actions from '../../actions'

import {FromDataAllSelect,LogDataAllSelect,LongTime,UserName} from '../../utils/config'
import './index.css'
const MenuItemGroup = Menu.ItemGroup
const FormItem = Form.Item
const Option = Select.Option
const { RangePicker,MonthPicker } = DatePicker

const get = new Get()
const post = new Post()
const formItemLayout={  //表单样式
  		labelCol:{span:5},
  		wrapperCol:{span:19}
  	}
let DateUpload = []
class AdvancedSearchForm extends Component {
  constructor(props) {
  	super(props);
  	this.state={
  		expand: false,
  		FormData:[],
      submitBtnLoading:false,
      data:[],//所有初数据
      qxdj:[],//缺陷等级
      qxlx:[], //缺陷类型
      shr:[],   //处理人
      value:[],                           
      searchValue:'',
      listData:[],
      organization:[],
      status:[],  //缺陷状态
      searchValue:""
  	}
  }
  componentDidMount() {
  	this.filterFromData()
    this.setCommonData() //查询初始值
    this.setOrganization()   //组织机构

  }
  filterFromData(){  //初始化表单的名称
    switch(this.props.type) {
      case 60:
        return this.setState({
        FormData: LogDataAllSelect   //日志查询
        })
        break;
      case 70:
       return   this.setState({
        FormData: FromDataAllSelect   //缺陷查询
        })
        break;
      case 80:
        return this.setState({  //值班统计
          FormData:LongTime
        })
      case 90:
        return this.setState({
          FormData:UserName  //人员搜索
        })
  	
  }
}
 
async setCommonData(){  //查询初始值
  
    var Common = await get.commonData()  //启动获取数据的函数

    if (Common.code == 200) {
       
      this.setState({
        data:Common,
        qxdj:Allbutton(Common.qxdj),
        qxlx:Allbutton(Common.qxlx),
        shr:Common.shr,
        status:Allbutton(Common.status)
      })
    } 
  }
  async setOrganization(){   //初始值部门打类
     const res= await get.organization()
     this.setState({
        organization: res.results
     })  
  }
  handleChange(value){   //时间改变
    const Time = value.format('YYYY-MM')
    const Add = value.format("MMM")
    const year = value.format('YYYY') //年份

    const month = parseInt(Add)  //月份
    this.TimeData(year,month)   //数据处理
    
    const {actions} = this.props
    const TimeYear = {Time:Time}
    actions.DataName(Time)
    this.props.handler(this.TimeData(year,month),TimeYear)
  }
  TimeData(year,month,Time){
     const Data = new Date(year,month,0)
     const monthData = Data.getDate()  //获取这个月份有多少天
     const DataWeek = new Date(year,month-1)
     let week = DataWeek.getDay()
     if (week == 0) {
       week = 7
     }
     const DataTime = {week:week,month:monthData}
     return DataTime
     
  }
  getYear(){  //初始时间
    const data = new Date()
    var nowMonth = data.getMonth() + 1
    const yeratr = data.getFullYear()
    const Time = yeratr + (nowMonth > 9 ? "-":"-0" ) + nowMonth
    return Time

  }
  async hendleChange(value){
      const res = await get.users(value)

      this.setState({
        listData:res.list
      })
      
  }
handlerChangNamer(value){  //不太使用
  

}
  formClassiFication(item){  //分配表单样式
          const {getFieldDecorator} = this.props.form
          const {data,listData,qxdj,shr,qxlx,organization,status} = this.state
         
          switch(item.type) {
            case "select":                       '事件类型'
              return(
                    getFieldDecorator(item.dataIndex,{
                       initialValue:item.value,
                        rules:[{required: item.require, message:"请选择"+item.title
                      }]
                    })(
                    <Select 
                      disabled={item.disabled}
                      allowClear={true}
                    > 
                      {
                          item.options.map((item,i) =>{
                            return (
                                <Option key={i} value={item.value}>
                                  {item.label}
                                </Option>
                              )
                          })}                          
                    </Select>   
                    )
                  )
              break
            case "Manually":  //关键词
              return(
                  
                      getFieldDecorator(item.dataIndex,{
                        initialValue:item.value,
                        rules:[{ require: item.require, message: '请输入' + item.title}]
                      })(
                              <Input disabled={item.disabled} disableautocomplete autocomplete="off" />
                      )
                    
                  )
              break
            case 'selectLevel':                                  //缺陷等级
                 return(
                     getFieldDecorator(item.dataIndex,{
                       initialValue:item.value,
                        rules:[{required: item.require, message:"请选择"+item.title
                      }]
                    })(
                    <Select 
                      disabled={item.disabled}
                      allowClear={true}
                    > 
                      {
                          qxdj.map((item,i) =>{
                            return (
                                <Option key={i} value={item.value}>
                                  {item.label}
                                </Option>
                              )
                          })}                          
                    </Select>   
                    )

                  )
       
            break;
            case 'selectType':             //缺陷类型
              return(
                      getFieldDecorator(item.dataIndex,{
                          initialValue:item.value,
                          rules:[{required: item.require, message:"请选择"+item.title
                          }]
                        })(
                        <Select 
                          disabled={item.disabled}
                          allowClear={true}
                        >
                          {
                              qxlx.map((item,i) =>{
                                return (
                                    <Option key={i} value={item.value}>
                                      {item.label}
                                    </Option>
                                  )
                              })}   
                          
                        </Select>
                    )

                  )
                  
            break;
            case 'selectstatus':             //缺陷状态
              return(
                      getFieldDecorator(item.dataIndex,{
                          initialValue:item.value,
                          rules:[{required: item.require, message:"请选择"+item.title
                          }]
                        })(
                        <Select 
                          disabled={item.disabled}
                          allowClear={true}
                        >
                          {
                              status.map((item,i) =>{
                                return (
                                    <Option key={i} value={item.value}>
                                      {item.label}
                                    </Option>
                                  )
                              })}   
                          
                        </Select>
                    )

                  )
                  
            break;
            case 'selectFactory':                                 //厂站名称
        return(
            getFieldDecorator(item.dataIndex,{
              initialValue:item.value,
              rules:[{required: item.require, message:"请选择"+item.title
              }]
            })(
            <Select 
              disabled={item.disabled}
              mode="combobox"
              placeholder="输入厂站名称"
              optionFilterProp="children"
              optionLabelProp="children" 

              labelInValue={false}
              filterOption={false}
              defaultActiveFirstOption={false}
              
            >
             
            
            </Select>
          )

        )
        case 'PeopleSearch':  //人员搜索
          return(
              getFieldDecorator(item.dataIndex,{
              initialValue:item.value,
              rules:[{required: item.require, message:"请选择"+item.title
              }]
            })(
            <Select 
              disabled={item.disabled}
              mode="combobox"
              placeholder="查找人员/部门/手机号"
              optionFilterProp="children"
              optionLabelProp="children" 
              labelInValue={false}
              filterOption={false}
              defaultActiveFirstOption={false}
              onSearch={this.hendleChange.bind(this)}
              onChange={this.handlerChangNamer.bind(this)}
            >
             
              {listData.map((item,i)=>{
                return(
                    <Option key={item.name} value={item.id}>
                      {item.name}
                    </Option>
                  )
              })}
            </Select>
          )
            )
        break
            case 'department':  //所属部门
              return(
                  getFieldDecorator(item.dataIndex,{
                          initialValue:item.value,
                          rules:[{required: item.require, message:"请选择"+item.title
                          }]
                        })(
                        <Cascader 
                          disabled={item.disabled}
                          options={this.state.organization}
                          placeholder="选择部门/人员"
                        >
                          
                        </Cascader>
                    )

                  
                )
            break;
            case 'DataPicker':   //时间查询
              return(
                    getFieldDecorator(item.dataIndex,{
                          initialValue:item.value,
                          rules:[{required: item.require, message:"请选择"+item.title
                          }]
                        })(
                        <RangePicker
                          disabled={item.disabled}
                          showTime
                          format="YYYY-MM-DD HH:mm:ss" 
                        >
                          
                        </RangePicker>
                    )

                )
            break;
            case 'TimeSelect': //值班时间
              return(
                   getFieldDecorator(item.dataIndex,{
                          initialValue:moment(this.getYear(),'YYYY-MM'),
                          rules:[{required: item.require, message:"请选择"+item.title
                          }]
                        })(
                        <MonthPicker
                          disabled={item.disabled}
                          showToday
                          format="YYYY-MM" 
                          onChange={this.handleChange.bind(this)}

                        >
                          
                        </MonthPicker>
                    )
                )
            break
           
          }
  		}
  renderFormItem(item,i){      //通用表单   //根据不同的标题分配不同的表单
  	const {getFieldDecorator} = this.props.form
  
  	 let from = <FormItem
            key={item.dataIndex}
            className={classnames("row", item.rowCn? item.rowCn:"row-3")}  
            label={item.title}
          >

            {this.formClassiFication(item)}  
          </FormItem>
     return from
  }
  handleSubmit(e){   
    this.props.form.validateFieldsAndScroll((err, value) => {
        const data = {}

        if (this.props.type === 60) {
              data.startTime = value.DefectsTime == undefined || value.DefectsTime.length ==0 ? ""  : value.DefectsTime[0].format("YYYY-MM-DD HH:mm:ss") //开始时间
              data.endTime =   value.DefectsTime == undefined  ||  value.DefectsTime.length ==0 ? "" :  value.DefectsTime[1].format("YYYY-MM-DD HH:mm:ss")  //结束时间
              data.key = value.ManuallyNameData == undefined ? "" : value.ManuallyNameData
              data.type = value.sjlx == undefined ? "" : value.sjlx.toString()
             
              const {actions} = this.props
              actions.journalSelect(data)
             
              

        }
        if (this.props.type === 70) {    //缺陷
          
              data.type =  value.qxlx == undefined ? "" : value.qxlx.toString() //缺陷类型
              data.status = value.qxdj == undefined ? "" : value.qxdj.toString() //缺陷状态
              data.level = value.status == undefined ? "" : value.status.toString() //缺陷状态
              data.id =  value.departments == undefined  ? "" : value.departments[1] ? value.departments[1] : value.departments[0] //组织机构 
              // data.startTime = value.DefectsTime ? value.DefectsTime[0].format("YYYY-MM-DD HH:mm:ss") : ""
              data.startTime = value.DefectsTime == undefined || value.DefectsTime.length == 0 ?  "" : value.DefectsTime[0].format("YYYY-MM-DD HH:mm:ss") //开始时间
              data.endTime =   value.DefectsTime == undefined || value.DefectsTime.length  == 0 ? "" : value.DefectsTime[1].format("YYYY-MM-DD HH:mm:ss")  //结束时间
              
              const {actions} = this.props
              actions.postStationSelect(data)
           
            
        }
        if (this.props.type === 90 && !err) {
            this.props.router.replace('/system/Personnel/Assign/' + value.PeopleSearch)
        }
        
      

    })
  }
  ButData(){
    const cm = <div className="antd-modal-footer" style={{width:"100%", marginTop:"10px",textAlign:'right'}}>     
              <Button className="baocun"  type="primary" onClick={this.handleSubmit.bind(this)} >查询</Button>
              <Button key="back" type="ghost"  onClick={this.setOrganization.bind(this)}>导出</Button>
            </div>
    return cm
  }
  ButDataPeople(){
    const cm = <div className="antd-modal-footer peopleMidal" >
                   <Button className="baocun"  type="primary" onClick={this.handleSubmit.bind(this)} >查询</Button>
              </div>
    return cm
  }
  render(){
  	const {FormData} = this.state
  	const {getFieldDecorator} = this.props.form
  	const shownCount =  6;
   
    
  	return(
  			 <Form className="ant-form ant-form-horizontal flex flex-wrap" style={{marginBottom:8}} onSubmit={this.handleSubmit.bind(this)}  autocomplete="off">
            {FormData.map((item,i)=>this.renderFormItem(item,i))}
            {this.props.types ? "" : this.ButData()}
            {this.props.type == 90 ? this.ButDataPeople() : ""}
         </Form>
  		)
  }
}

const FormBar = Form.create()(AdvancedSearchForm)

const mapStateToProps=state=>{
 
}
const mapDispatchToProps=(dispatch)=>({
  actions:bindActionCreators(actions,dispatch)
})
export default withRouter( connect(mapStateToProps,mapDispatchToProps)(FormBar))