export const ModuleMenu=[
	{sub:{name:"缺陷模块",iconCn:"fa fa-eye"},menu:[{text:"当前缺陷 ",linkTo:"/defects/management"},{text:'历史缺陷',linkTo:'/defects/current'},{text:"缺陷查询",linkTo:"/defects/query"}]},
    {sub:{name:"日志管理",iconCn:"fa fa-headphones"},menu:[{text:"运维日志",linkTo:'/operations'},{text:"日志查询",linkTo:'/logquery'}]},
    {sub:{name:"值班排班",iconCn:"fa fa-magnet"},menu:[{text:"值班统计",linkTo:'/statistics'},{text:"排班规则",linkTo:'/regulation'},{text:'人员排班',linkTo:'/Schedulin'} ]},
    {sub:{name:"系统管理",iconCn:"fa fa-gear fa-fw"},menu:[{text:"角色管理",linkTo:'/system/Role'},{text:"人员分配",linkTo:'/system/Personnel'}]},

	
]

//A == 数据库无数据 有字段
//所有表头

//事件类型
const eventType = [
    {label:'未指定',value:0},
    {label:'图形维护',value:1},
    {label:'投运对点',value:2},
    {label:'巡视联调',value:3},
    {label:'厂家运维',value:4}
]
const eventTypeAll = [
    {label:'未指定',value:0},
    {label:'图形维护',value:1},
    {label:'投运对点',value:2},
    {label:'巡视联调',value:3},
    {label:'厂家运维',value:4},
    {label:'全部',value:""}
]
const handoverData =[
    {label:'否',value:0},
    {label:'是',value:1}
]
const SourceTypeOptions = [
    {label:'一般',value:10},
    {label:'重要',value:20},
    {label:'紧急',value:30}
]
//缺陷类型
const OrderTypeOptions = [
    {label:'通讯故障',value:10},
    {label:'终端缺陷',value:20},
    {label:'主站缺陷',value:30}
]

//所有按钮操作
export const actionsBtnsAll=[
	{name:"编辑",funIndex:"0",pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {name:"删除",funIndex:'9',pageId:['1','2','3','4','5','6','7','8','9',"10","11"]},
    {name:'详情',funIndex:'8',pageId:['1','2','3','4','5','6','7','8','9','10','11']}	
]


export const OperationaAll = [ //运维日志表头
    {title:'日志时间',dataIndex:'time',width:230,key:'TimeOfLog',pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'白班人员',dataIndex:'day',width:200,key:'workers',pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'夜班人员',dataIndex:'night',width:200,key:'graveyard ',pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'联系部门',dataIndex:'onSiteOrg',width:150,key:'department ',pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'联系人员',dataIndex:'onSite',width:200,key:'personnel',pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'事件类型',dataIndex:'type',width:150,key:'eventType',pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'事件内容',dataIndex:'record',width:400,key:'eventContent',pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'是否交接',dataIndex:'shift',width:150,key:'handover',pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'备注',dataIndex:'comment',width:350,key:'remarks',pageId:["1","2","3","4","5","6","7","8","9","10","11"]}
]



export const FromDataAllCeshi = [ //填报
      {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectType',rowCn:'row-8',require:false,options:SourceTypeOptions},
      {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-8',options:OrderTypeOptions},
      {title:'派单人', dataIndex:'submitUserIDs', key:'dealWith', type:'selectPeople',options:"",rowCn:'row-8',require:true,options:[]}, 
      {title:'缺陷状态', dataIndex:'status',key:'status',type:'statusid',rowCn:'row-8',require:false,options:[],disabled:true},
      {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-8",require:true,station:{}},

]
export const FromDataAllCeshiGuidang = [ //填报
      {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectType',rowCn:'row-8',require:false,options:SourceTypeOptions},
      {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-8',options:OrderTypeOptions},
    
      {title:'缺陷状态', dataIndex:'status',key:'status',type:'statusid',rowCn:'row-8',require:false,options:[],disabled:true},
      {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-3",require:true,station:{}},

]

export const FromDataAllmiaoshu = [
    {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:''}
]
export const FromDataAllmiaoshuData = [
      {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:''},
      {title:"处理情况", dataIndex:'content', key:'content', type:'textareaFound',rowCn:'row-1',require:true,value:''}
]





export const FromDataAll=[ //基本工单title   //填报中
    {title:'填报人',dataIndex:'createUserName', key:'Quot', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true,PeoVale:10},
    
    {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectLevel',rowCn:'row-3',require:false,options:SourceTypeOptions},
    {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-3',options:OrderTypeOptions},
   
    {title:'派单人', dataIndex:'submitUserIDs', key:'dealWith', type:'selectPeople',options:"",rowCn:'row-3',require:true,options:[]}, 
   
     {title:'缺陷状态', dataIndex:'status',key:'status',type:'statusid',rowCn:'row-3',require:false,options:[],disabled:true},
     {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-1",require:true,station:{}},
   
    {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:''},
     
]
export const FromDataAllData=[ //基本工单title   //填报中
    {title:'填报人',dataIndex:'createUserName', key:'Quot', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true,PeoVale:10},
    
    {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectLevel',rowCn:'row-3',require:false,options:SourceTypeOptions},
    {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-3',options:OrderTypeOptions},
   
    {title:'派单人', dataIndex:'submitUserIDs', key:'dealWith', type:'selectPeople',options:"",rowCn:'row-3',require:true,options:[]}, 
   
     {title:'缺陷状态', dataIndex:'status',key:'status',type:'statusid',rowCn:'row-3',require:false,options:[],disabled:true},
     {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-1",require:true,station:{}},
   
    {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:''},
     
]

export const OperationaAdd=[                 //新增日志数据
    {title:'白班人员', dataIndex:'shift', key:'shift', rowCn:'row-3', require:false, type:'FoundpeopleTwo',disabled:false},
    {title:'夜班人员', dataIndex:'Nightshift', key:'Nightshift', rowCn:'row-3', require:false, type:'FoundpeopleTwo',disabled:false},
    {title:'日志时间', dataIndex:'LogTime', key:'Logtime', rowCn:'row-3', require:true, type:'DataPickerLog',disabled:false},
    {title:'联系部门', dataIndex:'department', key:'department', rowCn:'row-3',require:false, type:'department',disabled:false},
    {title:'联系人员', dataIndex:'ContactPersonnel', key:'ContactPersonnel',rowCn:'row-3', require:false,type:'ContactPersonnel',disabled:false},
    {title:'事件类别', dataIndex:'category', key:'category', rowCn:'row-3',require:true, type:'category',disabled:false,options:eventType},
    {title:'是否交接', dataIndex:'handover', key:'handover', rowCn:'row-3',require:false, type:'handover',disabled:false,options:handoverData},
    {title:"事件内容", dataIndex:'eventContent', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:'',disabled:false},
    {title:"备注", dataIndex:'remarks', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:''},


   

]
export const OperationaEDit=[                 //新增日志数据
    {title:'白班人员', dataIndex:'dayData', key:'shift', rowCn:'row-3', require:false, type:'FoundpeopleTwo',disabled:false},
    {title:'夜班人员', dataIndex:'nightData', key:'Nightshift', rowCn:'row-3', require:false, type:'FoundpeopleTwo',disabled:false},
    {title:'日志时间', dataIndex:'time', key:'Logtime', rowCn:'row-3', require:false, type:'DataPicker',disabled:false},
    {title:'联系部门', dataIndex:'onSiteOrgID', key:'departmentData', rowCn:'row-3',require:false, type:'department',disabled:false,options:[]},
    {title:'联系人员', dataIndex:'onSiteData', key:'onSiteData',rowCn:'row-3', require:false,type:'ContactPersonnel',disabled:false,options:[]},
    {title:'事件类别', dataIndex:'typeData', key:'category', rowCn:'row-3',require:true, type:'category',disabled:false,options:eventType},
    {title:'是否交接', dataIndex:'shiftData', key:'handover', rowCn:'row-3',require:false, type:'handover',disabled:false,options:handoverData},
    {title:"事件内容", dataIndex:'comment', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:'',disabled:false},
    {title:"备注", dataIndex:'record', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:''},


   

]
export const OperationaEDitData=[                 //新增日志数据
    {title:'白班人员', dataIndex:'dayData', key:'shift', rowCn:'row-3', require:false, type:'FoundpeopleTwo',disabled:false},
    {title:'夜班人员', dataIndex:'nightData', key:'Nightshift', rowCn:'row-3', require:false, type:'FoundpeopleTwo',disabled:false},
    {title:'日志时间', dataIndex:'time', key:'Logtime', rowCn:'row-3', require:false, type:'DataPicker',disabled:false},
    {title:'联系部门', dataIndex:'onSiteOrgID', key:'departmentData', rowCn:'row-3',require:false, type:'department',disabled:false,options:[]},
    {title:'联系人员', dataIndex:'onSite', key:'onSiteData',rowCn:'row-3', require:false,type:'ContactPersonnel',disabled:false,options:[]},
    {title:'事件类别', dataIndex:'type', key:'category', rowCn:'row-3',require:true, type:'category',disabled:false,options:eventType},
    {title:'是否交接', dataIndex:'shift', key:'handover', rowCn:'row-3',require:false, type:'handover',disabled:false,options:handoverData},
    {title:"事件内容", dataIndex:'comment', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:'',disabled:false},
    {title:"备注", dataIndex:'record', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:''},


   

]
export const OperationaEDitDetail=[                 //新增日志数据
    {title:'白班人员', dataIndex:'dayData', key:'shift', rowCn:'row-3', require:false, type:'FoundpeopleTwo',disabled:false},
    {title:'夜班人员', dataIndex:'nightData', key:'Nightshift', rowCn:'row-3', require:false, type:'FoundpeopleTwo',disabled:false},
    {title:'日志时间', dataIndex:'time', key:'Logtime', rowCn:'row-3', require:false, type:'DataPicker',disabled:true},
    {title:'联系部门', dataIndex:'onSiteOrgID', key:'departmentData', rowCn:'row-3',require:false, type:'department',disabled:false,options:[]},
    {title:'联系人员', dataIndex:'onSiteData', key:'onSiteData',rowCn:'row-3', require:false,type:'ContactPersonnel',disabled:false,options:[]},
    {title:'事件类别', dataIndex:'typeData', key:'category', rowCn:'row-3',require:true, type:'category',disabled:false,options:eventType},
    {title:'是否交接', dataIndex:'shiftData', key:'handover', rowCn:'row-3',require:false, type:'handover',disabled:false,options:handoverData},
    {title:"事件内容", dataIndex:'comment', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:'',disabled:false},
    {title:"备注", dataIndex:'record', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:''},


   

]
export const BasicFormDataAdd=[ //基本工单title
    {title:'填报人',dataIndex:'createUserName', key:'Quot', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
    {title:'派单人',dataIndex:'SendSingle', key:'QuotData', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
    {title:'消缺人',dataIndex:'SendSingleData', key:'QuotData', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
   

    {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectLevel',rowCn:'row-3',require:false,options:SourceTypeOptions},
    {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-3',options:OrderTypeOptions},
    {title:'归档人', dataIndex:'submitUserIDs', key:'dealWith', type:'SubmitPeople',options:"",rowCn:'row-3',require:true,options:[]}, 
    {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-1",require:true,station:{}},
    {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:''},
    {title:"处理情况", dataIndex:'content', key:'content', type:'textareaFound',rowCn:'row-1',require:true,value:''}
   
    
     
]
export const BasicFormDataAddData=[ //基本工单title
    {title:'填报人',dataIndex:'createUserName', key:'Quot', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
    {title:'派单人',dataIndex:'SendSingle', key:'QuotData', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
    {title:'消缺人',dataIndex:'SendSingleData', key:'QuotData', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
  

  {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectLevel',rowCn:'row-3',require:false,options:SourceTypeOptions},
    {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-3',options:OrderTypeOptions},
      {title:'归档人', dataIndex:'submitUserIDs', key:'dealWith', type:'SubmitPeople',options:"",rowCn:'row-3',require:true,options:[]}, 
    {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-1",require:true,station:{}},
    {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:''},
    {title:"处理情况", dataIndex:'content', key:'content', type:'textareaFound',rowCn:'row-1',require:true,value:''}
   
    
     
]
export const BasicFormDataAddTo = [   //处理
    {title:'填报人' ,dataIndex:'createUserName', key:'Quot', rowCn:'row-3', require:true, type:'Foundpeople',disabled:true},
    {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectLevel',rowCn:'row-3',require:true,options:SourceTypeOptions},
    {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-3',options:OrderTypeOptions,require:true,},
    {title:'派单人', dataIndex:'handleUserID', key:'dealWith', type:'selectPeople',options:"",rowCn:'row-3',require:true,options:[]}, 
    // {title:'缺陷时间',dataIndex:'DefectsTime', key:'DefectsTime', type:'DataPicker',rowCn:'row-3',require:true,options:[]},
    {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-1",require:true,station:{}},
    {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:false,value:''}
   


]
export const BasicFormDataArchive=[ //基本工单title   //归档
     {title:'填报人',dataIndex:'createUserName', key:'Quot', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
     {title:'派单人',dataIndex:'SendSingle', key:'QuotData', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
    {title:'消缺人',dataIndex:'SendSingleData',key:'QuotData',rowCn:'row-3',require:true,type:'Foundpeople',disabled:true},
    {title:'归档人',dataIndex:'SendSingleDataNASm', key:'QuotDataD', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
   {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectLevel',rowCn:'row-3',require:false,options:SourceTypeOptions},
    {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-3',options:OrderTypeOptions},
   
    {title:'缺陷状态', dataIndex:'status',key:'status',type:'statusid',rowCn:'row-3',require:false,options:[],disabled:true},
    {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-1",require:true,station:{}},
    {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:true,value:''},

    {title:"处理情况", dataIndex:'content', key:'content', type:'textareaFound',rowCn:'row-1',require:true,value:''}

   
    
     
]
export const BasicFormDataArchiveData=[ //基本工单title   //归档
     {title:'填报人',dataIndex:'createUserName', key:'Quot', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
     {title:'派单人',dataIndex:'SendSingle', key:'QuotData', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
    {title:'消缺人',dataIndex:'SendSingleData',key:'QuotData',rowCn:'row-3',require:true,type:'Foundpeople',disabled:true},
    {title:'归档人',dataIndex:'SendSingleDataNASm', key:'QuotDataD', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
    {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectLevel',rowCn:'row-3',require:false,options:SourceTypeOptions},
    {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-3',options:OrderTypeOptions},
  
   
    {title:'缺陷状态', dataIndex:'status',key:'status',type:'statusid',rowCn:'row-3',require:false,options:[],disabled:true},
    {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-1",require:true,station:{}},
    {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:true,value:''},

    {title:"处理情况", dataIndex:'content', key:'content', type:'textareaFound',rowCn:'row-1',require:true,value:''}

   
    
     
]

export const Parain = [ //派单中
    
        {title:'填报人',dataIndex:'createUserName', key:'Quot', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
        {title:'派单人',dataIndex:'SendSingle', key:'QuotData', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
      
        {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectLevel',rowCn:'row-3',require:false,options:SourceTypeOptions},
        {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-3',options:OrderTypeOptions},
        {title:'缺陷状态', dataIndex:'status',key:'status',type:'statusid',rowCn:'row-3',require:false,options:[],disabled:true},
        {title:'消缺人', dataIndex:'submitUserIDs', key:'dealWith', type:'selectPeople',options:"",rowCn:'row-3',require:true,options:[]},  
        {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-1",require:true,station:{}},
        
      
       
        {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:true,value:''},
    
]
export const ParainData = [ //派单中
    
        {title:'填报人',dataIndex:'createUserName', key:'Quot', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
        {title:'派单人',dataIndex:'SendSingle', key:'QuotData', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
       
        {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectLevel',rowCn:'row-3',require:false,options:SourceTypeOptions},
        {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-3',options:OrderTypeOptions},
        {title:'缺陷状态', dataIndex:'status',key:'status',type:'statusid',rowCn:'row-3',require:false,options:[],disabled:true},
        {title:'消缺人', dataIndex:'submitUserIDs', key:'dealWith', type:'selectPeople',options:"",rowCn:'row-3',require:true,options:[]},  
        {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-1",require:true,station:{}},
        
      
       
        {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:true,value:''},
    
]
//缺陷等级


export const detailsData=[
    {title:'填报人',dataIndex:'createUserName',key:'Quot',rowCn:'row-3',require:true, type:'Foundpeople',disabled:true},

    {title:'消缺人' ,dataIndex:'handleUserName', key:'Quot', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
    {title:'归档人' ,dataIndex:'submitUserName', key:'Quot', rowCn:'row-3', require:false, type:'Foundpeople',disabled:true},
    {title:'缺陷状态', dataIndex:'status',key:'status',type:'statusid',rowCn:'row-3',require:false,options:[],disabled:true},
    {title:'缺陷等级', dataIndex:'qxdj', key:'DefectLevels', type:'selectLevel',rowCn:'row-3',require:true,options:SourceTypeOptions,disabled:true},
    {title:'缺陷类型', dataIndex:'qxlx', key:'DefectTypes', type:'selectType', rowCn:'row-3',require:true,options:OrderTypeOptions,disabled:true},
    {title:'厂站名称', dataIndex:'stationID', key:'Station', type:"selectFactory",options:[],rowCn:"row-1",require:true,station:{},disabled:true},
    {title:"缺陷情况", dataIndex:'description', key:'Defects',type:'textareaFound',rowCn:'row-1',require:true,value:'',disabled:true},
    {title:"处理情况", dataIndex:'content', key:'content', type:'textareaFound',rowCn:'row-1',require:true,value:'',disabled:true}



]
export  const FromDataAllSelect = [  //缺陷搜索
    {title:'缺陷类型',type:'selectType',dataIndex:'qxlx',rowCn:'row-3',require:false},
    {title:'缺陷等级', type:'selectLevel',dataIndex:'qxdj',rowCn:'row-3',require:false},
    {title:'所属部门', type:'department',dataIndex:'departments',rowCn:'row-3',require:false}, 
    {title:'缺陷状态', type:'selectstatus',dataIndex:'status',rowCn:'row-3',require:false},
   
    {title:'缺陷时间', type:'DataPicker',dataIndex:'DefectsTime',rowCn:'row-2',require:false},
    
]


export const LogDataAllSelect = [
    {title:'事件类型',type:'select', dataIndex:'sjlx',rowCn:'row-3',require:false,options:eventTypeAll},
    {title:'关键词', type:'Manually', dataIndex:'ManuallyNameData',rowCn:'row-3',require:false},
    {title:'日志时间', type:'DataPicker',dataIndex:'DefectsTime',rowCn:'row-2',require:false}
    
]
export const LongTime = [
    {title:'值班时间', type:'TimeSelect', dataIndex:'id',rowCn:'row-3',require:false}
]

export const columnsAll=[   //缺陷表头
    { title: '缺陷状态', dataIndex:'status',width: 150, key:'status',pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    { title: '填报人', dataIndex:'userName',width: 150, key:'userName', pageId:['1','2','3','4','5','6','7','8','9','10','11']},
    { title: '缺陷时间', dataIndex:'createTime', width:150, key:'createTime', pageId:['1','2','3','4','5','6','7','8','9','10','11']},
    { title: '厂站名称', dataIndex:'stationName', width:150, key:'stationName', pageId:['1','2','3','4','5','6','7','8','9','10','11']}
   

]

export const ruleDataSelect = [    //排班规则Table
    {title:'历史',dataIndex:'key',width:50,key:'lisId',pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'规则详情',dataIndex:'plan',width:150,key:'plan',pageId:["1","2","3","4","5","6","7","8","9","10","11"]}
]

export const assignment = [
    {title:'用户', dataIndex:'planID', key:'planID', rowCn:'row-3',require:true,type:'FoundpeopleTwo',options:[],disabled:false},
    {title:'排班规则', dataIndex:'userID', key:'userID', rowCn:'row-3',require:true,type:'selectDepartment',options:[],disabled:false},
    {title:'启动时间', dataIndex:'date', key:'date', rowCn:'row-3',require:true,type:'DataPicker',options:[],disabled:false}


]

export const assignmentData = [
    {title:'值班人员', dataIndex:'name', width:150, key:'personnel',require:true,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'使用规则', dataIndex:'plan', width:150, key:'ulesDuty',require:true,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'启动时间', dataIndex:'startDate', width:150, key:'startupTime',require:true,pageId:["1","2","3","4","5","6","7","8","9","10","11"]}
]


export const TableData =[
    {title:'序号', dataIndex:'name', width:150, key:'serialNumber',require:true,index:2},
    {title:'姓名', dataIndex:'names', width:150, key:'serialNumber',require:true,index:2}
]



export const replaceData =[
    {title:'操作时间', dataIndex:'createTime', width:180, key:'createTime', require:true,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'操作人', dataIndex:'creator', width:100, key:'creator', require:true,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},

    {title:'换班时间', dataIndex:'fromDate', width:150, key:'fromDate', require:true,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'换班人员', dataIndex:'fromName', width:100, key:'fromName', require:true,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'换班状态', dataIndex:'fromType', width:100, key:'fromType', require:true,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'换班时间', dataIndex:'toDate', width:150, key:'toDate', require:true,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'换班人员', dataIndex:'toName', width:100, key:'toName', require:true,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},
    {title:'换班状态', dataIndex:'toType', width:100, key:'toType', require:true,pageId:["1","2","3","4","5","6","7","8","9","10","11"]},

]

export const RoleName = [
    {title:'角色名称', dataIndex:"name",key:'name', rowCn:'row-10', require:true, type:'Foundpeople',disabled:false},
    {title:"角色描述", dataIndex:'description', key:'description', rowCn:'row-10', require:true, type:'textareaFound',disabled:false }
]
export const RoleNameEdit = [
  {title:'角色名称', dataIndex:"name",key:'name', rowCn:'row-12', require:true, type:'Foundpeople',disabled:true},
  {title:"角色描述", dataIndex:'description', key:'description', rowCn:'row-12', require:true, type:'textareaFound',disabled:true}
]

export const RoleNameDetaol = [
   {title:'姓名', dataIndex:"name",key:'name', rowCn:'row-12', require:true, type:'Foundpeople',disabled:true},
   {title:'部门', dataIndex:"department",key:'department', rowCn:'row-12', require:true, type:'Foundpeople',disabled:true},
   {title:'电话', dataIndex:"phone",key:'phone', rowCn:'row-12', require:true, type:'Foundpeople',disabled:true},
]

export const UserName = [
  {title:'人员搜索', dataIndex:"PeopleSearch",key:'PeopleSearch', rowCn:'row-20', require:true, type:'PeopleSearch',disabled:false},
  
]
