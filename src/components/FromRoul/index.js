import React,{Component} from 'react'
import { Form, Input, Icon, Button, Spin, message } from 'antd'
import './FromRoul.css'
import Get from '../../api/Get'
import Post from '../../api/Post'
import * as actions from '../../actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
const FormItem = Form.Item;





const post = new Post()
const get = new Get()
const formItemLayout = {  //样式
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
  };

  let NameId = 0

  class FromRoul extends Component{
    constructor(props) {
      super(props);
      this.state={
        isFetching:false,
        submitBtnLoading:false
      }
    }
   
    initialValue(){
      const { form } = this.props;
      form.setFieldsValue({
        keys: [],
      });
    }
    formItems(){                     //表单
           const { getFieldDecorator, getFieldValue } = this.props.form;
           getFieldDecorator('keys', { initialValue: [] });
           const keys = getFieldValue('keys');
           const formItems = keys.map((k, index) => {
              return (
                <FormItem
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? '规则' : ''}
                  required={false}
                  key={k}
                >
                  {getFieldDecorator(`names${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "请输入您要设置的规则.",
                    }],
                  })(
                    <Input placeholder="输入规则" style={{ marginRight: 8 }}  className="row-3" autocomplete="off" />
                  )}
                  <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    disabled={keys.length === 1}
                    onClick={() => this.remove(k)}
                  />
                </FormItem>
              )
            })

        return formItems
    }
    add(){                           //新增表单
      NameId++;
      const { form } = this.props;
      // 可以使用数据绑定来得到什么
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(NameId);
      
      // 可以使用数据绑定来设置
      // 重要!通知的形式来检测变化
      form.setFieldsValue({
        keys: nextKeys,
      });
    }

  remove(k){
        const { form } = this.props;
        // 可以使用数据绑定来得到什么
        const keys = form.getFieldValue('keys');
        // 我们需要至少一个乘客
        if (keys.length === 1) {
          return;
        }

        // 可以使用数据绑定来设置
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
    }

  processing(values){   //值数据获取过来 进行判断 然后处理 输出app结果
    
    const data = []
   
    delete values.keys
    for (var key in values) {   //把对象进行输出
       data.push(values[key])
    }

    return data
  

  }
  handle(e){  //数据提交
    e.preventDefault();
    this.props.form.validateFields( async(err, values) => {
      if (!err) {
        const data =  {}
        data.plan = this.processing(values)
        
         this.initialValue()

        const res = await post.schedulePlan(data)
        if (res.code == 200) {    //数据提交
            NameId = 0
            this.initialValue()
            message.success("规则提交成功")
            this.setState({submitBtnLoading:false})
            this.props.closeModal()
            const {actions} = this.props
            actions.RuleData()
        }
        else{    //数据提交错误
           NameId = 0
           this.initialValue()
           message.success("规则提交失败")
        }
       }
    })
  }
  RoleRule(){
    
      return (
          
          <Form>
            <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.add.bind(this)} >
                  <Icon type="plus" /> 新增规则
                </Button>
            </FormItem>
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="primary" size="large" onClick={this.handle.bind(this)}>提交</Button>
            </FormItem>
          </Form>
        )
  }
  render(){
    
    return(
        <Spin
          tip="加载中"
          spinning={this.state.isFetching}
          style={{width:"100%"}}
        >

          {this.props.types == 30 ? this.formItems() : ""}
          {this.props.types == 30 ?  this.RoleRule() : ""}
          
          
        </Spin>
      )   

  }
}


const FromRoulData = Form.create()(FromRoul)
const mapStateToProps=state=>{
  const {station,GEtstation,TypesDetail,loading} = state

  const {isFetching, names} = TypesDetail || {isFetching:ture,names:[]}
  return {
    isFetching,
    names,
    GEtstation,
    loading

  }
}

const mapDispatchToProps=(dispatch)=>({
  actions:bindActionCreators(actions,dispatch)
})
export default connect(mapStateToProps,mapDispatchToProps)(FromRoulData)