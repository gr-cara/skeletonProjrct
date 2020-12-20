<template>
    <div style="background:#fff;" :class="hasStudy == 0?'':'bottom2'">
        <!-- 内容 -->
        <div class="container" v-if="hasStudy == 1">
            <!-- start -->
            <div class="content-start auto box-shadow text-center bottom2rem">
                <div class="content-start-days"><span class="purple">{{totalData.diffDay}}</span> Days Study Report</div>
                <div class="content-start-tips">让我们来看看你的进步吧～</div>
            </div>
            <!-- 书籍视频等级 -->
            <div class="books-level auto box-shadow bottom2rem borderRadius">
                <img class="cloud" src="https://static.tope365.com/report/images/study/cloud.webp" alt="" srcset="">
                <div class="container-content-title text-center auto">
                    <div>书籍、视频等级</div>
                </div>
                <div class="books-audio-content">
                    <!-- 头像 -->
                    <div class="text-center">
                        <img v-if="!totalData.portraitUrl" src="https://static.tope365.com/report/images/study/photo.webp" alt="headerImg">
                        <img v-if="!!totalData.portraitUrl" :src="totalData.portraitUrl" alt="headerImg">
                    </div>
                    <!-- 等级 -->
                    <div class="level-progress">
                        <div class="progress-bar litterBlue">
                            <div class="books-progress-bar" :style="{width:`${bookWidth}%`}"></div>
                        </div>
                        <div class="progress-bar litterYellow">
                            <div class="audio-progress-bar" :style="{width:`${audioWidth}%`}"></div>
                        </div>
                    </div>
                    <!-- 等级说明 -->
                    <div class="level-explain flex space-between">
                        <div>
                            <span>LV.{{bookLevel}}</span><span class="blue" style="margin-left: 1rem;">书籍等级</span>
                        </div>
                        <div>
                            <span class="yellow" style="margin-right: 1rem;">视频等级</span><span>LV.{{oralLevel}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 中国功力值 -->
            <div v-if="skillInfo.isShowSkill == 1" class="china-power auto box-shadow bottom2rem borderRadius">
                <img class="cloud" src="https://static.tope365.com/report/images/study/cloud.webp" alt="" srcset="">
                <div class="container-content-title text-center auto">
                    <div>中国功力值</div>
                </div>
                <div class="china-power-now text-center">
                    当前中国功力值：<span class="purple">{{skillInfo.studentSkill}}</span>
                </div>
                <!-- has highest level -->
                <div class="china-power-up relative" v-if="skillInfo.isShowDiagram == 1 && hasHighestLevel == true">
                    <img src="https://static.tope365.com/report/images/study/up.webp" alt="" srcset="">
                    <!-- 等级 -->
                    <div class="power-level">
                        <div class="future">{{skillInfo.nextGradeLevel}}</div>
                        <div class="futureTip">预计再坚持学习{{skillInfo.needTime}}小时可挑战</div>
                        <div class="now">{{skillInfo.studentSkill}}</div>
                        <div class="school">{{skillInfo.gardeSkill}}</div>
                    </div>
                </div>
                <!-- has not highest level -->
                <div class="china-power-up relative" v-if="skillInfo.isShowDiagram == 1 && hasHighestLevel == false">
                    <img src="https://static.tope365.com/report/images/study/up_g.webp" alt="" srcset="">
                    <!-- 等级 -->
                    <div class="power-level">
                        <div class="now">{{skillInfo.studentSkill}}</div>
                        <div class="school">{{skillInfo.gardeSkill}}</div>
                    </div>
                </div>
                <encourage-tip v-if="skillInfo.isShowDiagram == 1" :tip='encourageTip1'></encourage-tip>
                <img class="pen" src="https://static.tope365.com/report/images/study/pen.webp" alt="">
            </div>
            <!-- 学习时长与学习书籍 -->
            <div class="studyLen-books auto box-shadow bottom2rem borderRadius">
                <img class="cloud" src="https://static.tope365.com/report/images/study/cloud.webp" alt="" srcset="">
                <div class="container-content-title text-center auto">
                    <div>学习时长与学习书籍</div>
                </div>
                <div class="time-stage text-center"><span>{{totalData.beginTime}}-{{readInfo.endTime}}</span>因为你的坚持和积累</div>
                <div class="study-books flex space-around">
                    <div>听读<span class="purple">{{readInfo.totalBooks}}</span>本</div>
                    <!-- <div>精读<span class="purple">0</span>本</div> -->
                </div>
                <!-- 学习时长 -->
                <div class="studyLen-content">
                    <div class="studyLen-content-item">
                        <div class="item-title flex">
                            <div class="item-no text-center">1</div>
                            <div>累计学习总时长</div>
                        </div>
                        <div class="studyLen-content-item-content">
                            <div><span>{{readInfo.totalReadHour}}</span>时<span>{{readInfo.totalReadMinutes}}</span>分</div>
                            <div>你平均每天用{{readInfo.avgHoursPerDay}}分钟提升自己的英语能力</div>
                        </div>
                    </div>
                    <div class="studyLen-content-item">
                        <div class="item-title flex">
                            <div class="item-no text-center">2</div>
                            <div>历史最高学习时长</div>
                        </div>
                        <div class="studyLen-content-item-content">
                            <div><span>{{readInfo.maxReadHours}}</span>时<span>{{readInfo.maxReadMinutes}}</span>分</div>
                            <div>{{readInfo.maxDate}} 你创造了自己的历史最高纪录</div>
                        </div>
                    </div>
                    <div class="studyLen-content-item">
                        <div class="item-title flex">
                            <div class="item-no text-center">3</div>
                            <div>连续学习天数</div>
                        </div>
                        <div class="studyLen-content-item-content">
                            <div><span>{{readInfo.maxContinueReadDay}}</span>天</div>
                            <div>滴水可穿石，小i每天在这里等你涨知识</div>
                        </div>
                    </div>
                </div>
                <!-- 图表展示 -->
                <div class="studyLen-chart">
                    <div class="chart-title flex space-between">
                        <div :class="tabShow[0] == true ? 'active' : ''" @click="tabSwitch('input','day')">每日投入</div>
                        <!-- <div :class="tabShow[1] == true ? 'active' : ''" @click="tabSwitch('input','week')">每周投入</div> -->
                        <div :class="tabShow[2] == true ? 'active' : ''" @click="tabSwitch('input','month')">每月投入</div>
                    </div>
                    <div class="chart-container box-shadow">
                        <div id="chart-graph"></div>
                        <chart-nothing v-if="isShowStudyChart" class="chart-nothingTip" :text="chartNothing"></chart-nothing>
                        <!-- 月份详情显示年份 -->
                        <div class="yearBar flex" v-if="isShowYearBar">
                            <div class="yearOne red" :style="{width:`${yearOneWidth}%`}">{{yearOne}}</div>
                            <div class="yearTwo poo" :style="{width:`${yearTwoWidth}%`}">{{yearTwo}}</div>
                        </div>
                        <div class="chart-item flex space-around">
                            <div class="flex">
                                <span class="square"></span>
                                <span>学习时长</span>
                            </div>
                            <div class="flex">
                                <span class="high"><img src="https://static.tope365.com/report/images/study/highest_time.webp" alt=""></span>
                                <span>最高时长</span>
                            </div>
                            <div class="flex">
                                <span class="line">----</span>
                                <span>日均时长</span>
                            </div>  
                        </div>
                    </div>
                </div>
                <encourage-tip :tip='encourageTip3'></encourage-tip>
                <p class="text-center">在学习中，你把时间都分配在了这些地方</p>
                <!-- 分配时间 -->
                <div class="distribution-chart">
                    <div id="distribution-chart"></div>
                    <p style="text-align:right;margin-right:2rem;font-size:.5rem;">单位/分</p>
                </div>
                <encourage-tip :tip='encourageTip2'></encourage-tip>
                <img class="pen" src="https://static.tope365.com/report/images/study/pen.webp" alt="">
            </div>
            <!-- 词汇库 -->
            <div class="words-bank auto box-shadow bottom2rem borderRadius">
                <img class="cloud" src="https://static.tope365.com/report/images/study/cloud.webp" alt="" srcset="">
                <div class="container-content-title text-center auto">
                    <div>词汇库</div>
                </div>
                <!-- 单词 -->
                <div class="words-read">
                    <div class="words-read-describle">
                        你已经听读了 <span class="purple">{{wordInfo.totalWords}}</span>个单词,
                        重复出现的有<span class="purple">{{wordInfo.repeatWords}}</span>个。<br/>
                        小学至大学，
                        包括英语四、六级、考研单词7512个，其中，你学过的大纲总量为<span class="purple">{{wordInfo.learnOutlineWords}}</span>个，
                        掌握情况如下：
                    </div>
                    <div class="flex" @click="wordDetail">
                        <div class="words-read-bar flex">
                            <div class="bar-item bgblue" :style="{width:`${wordInfo.learnOutlineWordsY/(wordInfo.learnOutlineWords)*100}%`}"></div>
                            <!-- <div class="bar-item bgyellow" :style="{width:`${unMasterWords/(masterWords+unMasterWords)*100}%`}"></div> -->
                        </div>
                        <i class="iconfont iconyoujiantou blue"></i>
                    </div>
                    <div class="words-read-text flex space-between">
                        <div>已掌握 {{wordInfo.learnOutlineWordsY}}/{{wordInfo.learnOutlineWords}}</div>
                        <div>未掌握 {{wordInfo.learnOutlineWordsN}}/{{wordInfo.learnOutlineWords}}</div>
                    </div>
                </div>
                <!-- 用语 -->
                <div class="words-read bottom2rem">
                    <div class="words-read-describle">
                        你已经听读了 <span class="purple">{{wordInfo.totalPhrases}}</span> 组习惯用语或固定搭，
                        重复出现的有<span class="purple">{{wordInfo.repeatPhrases}}</span>组。<br/>
                        小学至大学，
                        包括英语四、六级、考研习惯用语7512个，其中，你学过的大纲总量为<span class="purple">{{wordInfo.learnOutlinePhrases}}</span>组，
                        掌握情况如下：
                    </div>
                    <div class="flex" @click="phraseDetail">
                        <div class="words-read-bar flex">
                            <div class="bar-item bgblue" :style="{width:`${wordInfo.learnOutlinePhrasesY/wordInfo.learnOutlinePhrases *100}%`}"></div>
                            <!-- <div class="bar-item bgyellow" :style="{width:`${unMasterWords/(masterWords+unMasterWords)*100}%`}">未掌握 {{unMasterWords}}/{{masterWords+unMasterWords}}</div> -->
                        </div>
                        <i class="iconfont iconyoujiantou blue"></i>
                    </div>
                    <div class="words-read-text flex space-between">
                        <div>已掌握 {{wordInfo.learnOutlinePhrasesY}}/{{wordInfo.learnOutlinePhrases}}</div>
                        <div>未掌握 {{wordInfo.learnOutlinePhrasesN}}/{{wordInfo.learnOutlinePhrases}}</div>
                    </div>
                </div>
                <!-- 图表展示 -->
                <div class="studyLen-chart">
                    <div class="chart-title flex space-between">
                        <div :class="showTabShow[0] == true ? 'active' : ''" @click="tabSwitch('show','day')">每日表现</div>
                        <!-- <div :class="showTabShow[1] == true ? 'active' : ''" @click="tabSwitch('show','week')">每周表现</div> -->
                        <div :class="showTabShow[2] == true ? 'active' : ''" @click="tabSwitch('show','month')">每月表现</div>
                    </div>
                    <div class="chart-container box-shadow">
                        <div id="showChart-graph"></div>
                        <chart-nothing v-if="isShowWordChart" class="chart-nothingTip" :text="chartNothing"></chart-nothing>
                        <div class="yearBar flex" v-if="isShowYearBarWord">
                            <div class="yearOne red" :style="{width:`${yearOneWidthWord}%`}">{{yearOneWord}}</div>
                            <div class="yearTwo poo" :style="{width:`${yearTwoWidthWord}%`}">{{yearTwoWord}}</div>
                        </div>
                        <div class="chart-item flex space-around">
                            <div class="flex">
                                <span class="square" style="background:#FFE54A"></span>
                                <span>单词量</span>
                            </div>
                            <div class="flex">
                                <span class="high"><img src="https://static.tope365.com/report/images/study/highest_time.webp" alt=""></span>
                                <span>最高单词量</span>
                            </div>
                            <div class="flex">
                                <span class="line">----</span>
                                <span>日均单词</span>
                            </div>  
                        </div>
                    </div>
                </div>
                <encourage-tip v-if="hasProgress" :tip="encourageTip4"></encourage-tip>
                <!-- 小i小课堂 -->
                <i-classroom :text='iText1'></i-classroom>
            </div>
            <!-- 语速测算 -->
            <div class="speed-rate auto box-shadow bottom2rem borderRadius">
                <img class="cloud" src="https://static.tope365.com/report/images/study/cloud.webp" alt="" srcset="">
                <div class="container-content-title text-center auto">
                    <div>语速测算</div>
                </div>
                <div class="speed-rate-content">
                    <div class="speed-rate-decrible" v-if="moreReadInfo.isShowMoreWord == 1">
                        <span v-if="voiceInfo.isShowMoreWeekVoice == 1">昨日比前一周提升了{{voiceInfo.moreWeekVoice}}词/分钟<br/></span>
                        <span v-if="voiceInfo.isShowVoice == 1">与第一天的速度相比提升了{{voiceInfo.moreStartVoice}}个单词/每分钟<br/></span>
                        <span v-if="voiceInfo.eclassRank">班级第<span class="purple">{{voiceInfo.eclassRank}}</span>名。<br/></span>
                    </div>
                    <!-- 目标 -->
                    <div class="speed-old speed-rate-goal flex">
                        <div class="my-goal">你的目标</div>
                        <div class="my-goal-content">
                            <div>
                                <p v-for="(item,index) in speedList" :key="index">
                                    第<span>{{item.name}}</span>天语速为<span>{{item.value}}</span>词/分钟,
                                </p>
                            </div>
                            <span>当前</span>语速<span class="purple">{{voiceInfo.currerntVoice}}</span>词/分钟，<br/>
                            随着听读量的增加，<br/>语速将逐渐靠近<br/>正常语速(每分钟100-200词)。
                        </div>
                    </div>
                    <!-- <div class="speed-rate-chart box-shadow bottom2rem borderRadius">
                        <div id="speed-rate-chart"></div>
                        <div class="chart-item flex space-around">
                            <div class="flex">
                                <span class="square" style="background:#C61AFF"></span>
                                <span>语速</span>
                            </div>
                            <div class="flex">
                                <span class="high"><img src="https://static.tope365.com/report/images/study/highest_time.webp" alt=""></span>
                                <span>最快语速</span>
                            </div>
                            <div class="flex">
                                <span class="line" style="color:#6DD400">----</span>
                                <span>当前语速</span>
                            </div>  
                        </div>
                    </div> -->
                </div>
                <encourage-tip :tip="encourageTip5"></encourage-tip>
                <div class="text-center tips">
                    书籍、视频学习之后可以试试i配音哦！<br/>
                    还能在语音报告中直观感受你的口语提升
                </div>
                <!-- 目标 -->
                <div class="speed-rate-goal flex">
                    <div class="my-goal">你的目标</div>
                    <div class="my-goal-content">
                        若每天听读{{goal.n}}钟，
                        一年可听读{{goal.firstYear}}万词，
                        三年可听读{{goal.threetYear}}万词。
                        这将是新课标要求初中生课外阅读量15万单词的{{goal.muldiMultiple}}倍，
                        是新课标要求高中生课外阅读量35万单词的{{goal.highMultiple}}倍
                    </div>
                </div>
                <!-- 小i小课堂 -->
                <i-classroom :text="iText2"></i-classroom>
            </div>
            <!-- iEnglish建议学习进度 -->
            <div class="study-progress auto box-shadow bottom2rem borderRadius">
                <img class="cloud" src="https://static.tope365.com/report/images/study/cloud.webp" alt="" srcset="">
                <div class="container-content-title text-center auto">
                    <div>iEnglish建议学习进度</div>
                </div>
                <div class="study-progress-content">
                    <study-progress></study-progress>
                </div>
            </div>
        </div>
        <div class="happy-ending text-center" @click="toRead">开始为自己努力吧！</div>
        <i-speaking v-if="hasStudy == 0" class="newReport" :text="iSpeakingNew"></i-speaking>
        
    </div>
</template>

<script>
    import '../../assets/css/studyReport.css'
    import URL from "../../assets/js/url"
    import SUCCESS from "../../assets/js/success"
    import EncourageTip from './components/EncourageTip'
    import StudyProgress from './components/StudyProgress'
    import IClassroom from './components/IClassroom'
    import ISpeaking from './components/ISpeaking'
    import ChartNothing from './components/ChartNothing'
    export default {
        inject:['reload'],
        data() {
            return {
                selectYear:'',
                maxYear:2019,
                minYear:2016,
                studentID:'',
                today:'',
                bookWidth:'',
                audioWidth:'',
                bookLevel:'',
                oralLevel:'',
                tabShow:[true,false,false],
                showTabShow:[true,false,false],
                inputList:[],
                distributionList:[],
                speedList:[{name:1,value:38},{name:7,value:38},{name:15,value:38},{name:21,value:38}],
                masterWords:367,
                unMasterWords:53,
                basicInfo:{},
                moreReadInfo:{},
                readInfo:{},
                skillInfo:{},
                voiceInfo:{},
                wordInfo:{},
                totalData:{},
                goal:{},
                encourageTip1:'',
                encourageTip2:'你的恒心是你制胜法宝，在你连续的学习中不断的积累才能达到更高的目标，比其他人你在坚持学习上做的很棒，如果能每日的学习上时间坚持得更久一些，那你会更上一层楼',
                encourageTip3:'',
                encourageTip4:'',
                encourageTip5:'第一天你每分钟读24词/分钟，经过186天的努力，现在你每分钟读34词/分钟，语速提升了10词/分钟，You‘re best！你的突飞猛进，都源于你的一点一滴的努力。',
                iText1:'单纯的背单词并不能真正的掌握单词，同一词汇或许有很多意思，需要在不同的语境中反复出现，体验单词在不同场景的用法，才能真正掌握。《国家英语新课程标准》要求初中毕业生要学会使用。1500～1600个单词和200～300个习惯用语或规定搭配；高中毕业生要学会使用3500个单词和400～500个习惯用语或规定搭配',
                iText2:'国家英语新课标要求中学生课外英语阅读量应累计达15万词以上；高中生英语课外阅读量应累计达到35万词以上，iEnglish听读系统涉及“看、听、说“三个步骤，比新课标要求的的阅读（看）效率提高三倍。',
                isShowYearBar:false,
                yearOne:'',
                yearOneWidth:'',
                yearTwo:'',
                yearTwoWidth:'',
                isShowYearBarWord:false,
                yearOneWord:'',
                yearOneWidthWord:'',
                yearTwoWord:'',
                yearTwoWidthWord:'',
                /**没有学习报告 */
                hasStudy: 0,
                iSpeakingNew:'你好！我是你的新朋友小i。今天是你进步的第一天，因为没有足够的学习数据，小i还不能为你生成学习报告，明天再来吧！学伴小i和你一起体验精彩书籍、有趣视频等丰富学习内容！',
                hasProgress:true,
                hasHighestLevel:true,//功力值预测是否还有年级
                isShowVoice:false,
                chartNothing:'最近没有学习数据',
                isShowStudyChart:false,
                isShowWordChart:false  
            }
        },
        components:{
            StudyProgress,IClassroom,EncourageTip,ISpeaking,ChartNothing
        },
        beforeRouteLeave(to,from,next){
            if(to.path == '/studyReport/voiceReport'){
                this.$emit('tabIndex',1)
            }
            next()
        },
        methods:{
            log (str1, str2 = '') {
                //console.log(str1, str2)
            },
            onConfirm (val) {
                /* console.log('on-confirm arg', val)
                console.log('current value', this.value1) */
            },
            change (value) {
                this.selectYear = value;
                this.getSpeedList().then((res)=>{
                    this.$nextTick(()=>{
                        this.chartsGraph('speed-rate-chart','speed',16);
                    })
                })
            },
            wordDetail(){
                this.$router.push({path:'/word',query:{studentID:this.studentID}})
            },
            phraseDetail(){
                this.$router.push({path:'/phrase',query:{studentID:this.studentID}})
            },
            /*tab切换请求数据*/
            tabSwitch(showtype,type){
                if(showtype == 'input' && type == 'day'){
                    this.tabShow = [true,false,false];
                    
                    let that = this;
                    this.getLineData('read','day').then((res)=>{
                        that.$nextTick(()=>{
                            that.chartsGraph('chart-graph','day',16);
                        })
                    });
    
                }else if(showtype == 'input' && type == 'week'){
                    this.tabShow = [false,true,false];
                    this.inputList=[
                        {date:'07/02-07/08',value:40},
                        {date:'07/02-07/08',value:50},
                        {date:'07/02-07/08',value:46},
                        {date:'07/02-07/08',value:34},
                        {date:'07/02-07/08',value:38},
                        {date:'07/02-07/08',value:40},
                        {date:'07/02-07/08',value:46},
                    ];
                    this.chartsGraph('chart-graph','week',16);
                }else if(showtype == 'input' && type == 'month'){
                    this.tabShow = [false,false,true];
                    
                    let that = this;
                    this.getLineData('read','month').then((res)=>{
                        that.$nextTick(()=>{
                            that.chartsGraph('chart-graph','month',16);
                        })
                    });

                }
                if(showtype == 'show' && type == 'day'){
                    this.showTabShow = [true,false,false];

                    let that = this;
                    this.getLineData('word','day').then((res)=>{
                        that.$nextTick(()=>{
                            that.chartsGraph('showChart-graph','day',16);
                        })
                    });
                    
                }else if(showtype == 'show' && type == 'week'){
                    this.showTabShow = [false,true,false];
                    this.inputList=[
                        {date:'07/02-07/08',value:40},
                        {date:'07/02-07/08',value:50},
                        {date:'07/02-07/08',value:46},
                        {date:'07/02-07/08',value:34},
                        {date:'07/02-07/08',value:38},
                        {date:'07/02-07/08',value:40},
                        {date:'07/02-07/08',value:46},
                    ];
                    this.chartsGraph('showChart-graph','week',16);
                }else if(showtype == 'show' && type == 'month'){
                    this.showTabShow = [false,false,true];
                    
                    let that = this;
                    this.getLineData('word','month').then((res)=>{
                        that.$nextTick(()=>{
                            that.chartsGraph('showChart-graph','month',16);
                        })
                    });
                }
            },
            getLineData(type1,type2){
                /**
                 * type1 read word 
                 * 
                 * type2 day month
                 */
                let that=this;
                var p = new Promise(function(resolve, reject){
                    //做一些异步操作
                    that.axios.get(URL.url+'/front/student_report/'+type1+'/'+type2+'/'+that.studentID+'/'+that.today).then(response=>{
                        if (response.status === SUCCESS.success) {
                            if(response.data.code == 200){
                                let _data = response.data.data.info;
                                that.inputList = [];

                                
                                if(type2 == 'day'){
                                    
                                    that.inputList = _data.map((elem,index)=>{
                                        return {
                                            date:elem.week+elem.readDay.slice(5,10),
                                            value:elem.total
                                        }
                                    })
                                    /**隐藏滚动条 */
                                    if(type1 == 'read'){
                                        that.isShowYearBar = false;
                                    }else if(type1 == 'word'){
                                        that.isShowYearBarWord = false;
                                    }
                                }else if(type2 == 'month'){
                                    
                                    that.inputList = _data.map((elem,index)=>{
                                        let month=parseInt(elem.readMonth.slice(5,7));
                                        if(month>9){
                                            return {
                                                date:elem.readMonth.slice(5,7)+'月',
                                                value:elem.total
                                            }
                                        }else{
                                            return {
                                                date:elem.readMonth.slice(6,7)+'月',
                                                value:elem.total
                                            }
                                        }
                                        
                                    })

                                    /**计算年份滚动条 */
                                    let YearList = _data.map((elem,index)=>{
                                        return elem.readMonth.slice(0,4)
                                    })

                                    let sw=0;

                                    for(let i=0;i<YearList.length;i++){
                                        if(YearList[0] == YearList[i]){
                                            sw+=1;
                                        }else{
                                            break
                                        }
                                        
                                    }

                                    if(type1 == 'read'){
                                        that.isShowYearBar = true;
                                        that.yearOneWidth = sw/YearList.length*100;
                                        that.yearOne = YearList[0];
                                        that.yearTwoWidth = (YearList.length-sw)/YearList.length*100;
                                        that.yearTwo = YearList[sw];
                                    }else if(type1 == 'word'){
                                        that.isShowYearBarWord = true;
                                        that.yearOneWidthWord = sw/YearList.length*100;
                                        that.yearOneWord = YearList[0];
                                        that.yearTwoWidthWord = (YearList.length-sw)/YearList.length*100;
                                        that.yearTwoWord = YearList[sw];
                                    }
                                }
                                resolve(that.inputList)
                            }
                        }
                    })
                })

                return p;
            },
            chartsGraph(id,type,fontSize){
                let myChart=this.$echarts.init(document.getElementById(id));

                let _color='';
                let lineColor='#FFC313';
                let itemColor='';
                let showDW='单位/分';
                if(id == 'chart-graph'){
                    _color='rgba(158,217,254,1)'
                    lineColor='#FFC313';
                    itemColor='#2897F6';
                    showDW='单位/分';
                }else if(id == 'showChart-graph'){
                    _color='#FFE54A'
                    lineColor='#FFC313';
                    itemColor='#FF9C13';
                    showDW='';
                }else{
                    _color='#BDA7FF'
                    lineColor='#6DD400'
                    itemColor='#C61AFF';
                    showDW='';
                }

                let linnerColor={
                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: _color
                        },
                        {
                            offset: 1,
                            color: 'rgba(255,255,255, 0)'
                        }
                    ], false),
                    shadowColor: 'rgba(255,255,255, 1)', //阴影颜色
                    shadowBlur: 60 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                };

                let option={
                    grid:{
                        //right:'15%'
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLine: { //坐标轴轴线相关设置。数学上的x轴
                            show: true,
                            lineStyle: {
                                color: '#979797'
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#ADADAD',
                                type:'dotted'
                            }
                        },
                        axisLabel: { //坐标轴刻度标签的相关设置
                            interval:0,
                            textStyle: {
                                color: '#000',
                                margin: 10,
                            },
                            //rotate:60,
                            fontSize:fontSize,
                            formatter: function (value, index) {
                                // 格式化成月/日，只在第一个刻度显示年份
                                if(type == 'day'){
                                    return value.slice(0,2)+'\n\n'+value.slice(2);
                                }else if(type == 'week'){
                                    return value.slice(0,5)+'\n|\n'+value.slice(6);
                                }else if(type == 'month'){
                                    return value;
                                }else if(type == 'speed'){
                                    return value.slice(0,2)+'\n|\n'+value.slice(2);
                                }else{
                                    return value;
                                }
                                
                            }
                            
                        },
                        axisTick: {
                            show: true,
                        },
                        data: [],
                    }],
                    yAxis: [
                        {
                        name: showDW,
                        type: 'value',
                        min: 0,
                        nameTextStyle: {
                            color: "#000",
                            fontSize:fontSize
                        },
                        // max: 140,
                        splitNumber: 7,
                        minInterval: 1,//保证刻度值为整数
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#ADADAD',
                                type:'dotted'
                            }
                        },
                        axisLine: { //坐标轴轴线相关设置。数学上的x轴
                            show: true,
                            lineStyle: {
                                color: '#979797'
                            },
                        },
                        axisLabel: {
                            margin: 5,
                            textStyle: {
                                color: '#000',

                            },
                            fontSize:fontSize
                        },
                        axisTick: {
                            show: true,
                        },
                    }],
                    series: [{
                        name: '阅读时长',
                        type: 'line',
                        // smooth: true, //是否平滑曲线显示
                        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 4,
                        lineStyle: {
                            normal: {
                                color: itemColor, // 线条颜色
                            },
                            //borderColor: '#f0f'
                        },
                        label: {
                            show: true,
                            position: 'insideBottomLeft',
                            textStyle: {
                                color: '#000',
                            },
                            fontSize:fontSize,
                        },
                        itemStyle: {
                            normal: {
                                color: itemColor,
                            }
                        },
                        tooltip: {
                            show: false
                        },
                        areaStyle: { //区域填充样式
                            normal: linnerColor
                        },
                        markPoint : {
                            data : [
                                {
                                    type : 'max', 
                                    name : '最大值'
                                }
                                
                            ],
                            symbol:'image://data:image/png;base64,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',//image://../../../assets/flag.png
                            symbolSize:25,
                            symbolOffset:[0,'-130%'],
                            label:{
                                show:false
                            }
                        },
                        markLine : {
                            data : [
                                {type : 'average', name : '平均值'}
                            ],
                            label:{
                                position:'end'
                            },
                            lineStyle:{
                                color:lineColor
                            }
                        },
                        data: []
                    }]

                };
                myChart.setOption(option);
                let newOption = myChart.getOption();
                let xaxis=[];
                let dataList=[];
                /**转换数据 */
                this.inputList.map((elem,index)=>{
                    xaxis.push(elem.date);
                    if(elem.value != -1){
                        dataList.push(elem.value);
                    } 
                })

                /**判断数据是否全为0 是则显示没有数据 */
                let num0 = 0;
                for(let i=0;i<dataList.length;i++){
                    if(dataList[i]==0){
                        num0++
                    }
                }
                
                if(dataList.length == num0 && id == 'chart-graph'){
                    dataList = [];
                    this.isShowStudyChart = true
                    
                }else if(dataList.length != num0 && id == 'chart-graph'){
                    this.isShowStudyChart = false
                }

                if(dataList.length == num0 && id == 'showChart-graph'){
                    dataList = [];
                    this.isShowWordChart = true
                }else if(dataList.length != num0 && id == 'showChart-graph'){
                    this.isShowWordChart = false
                }
                

                newOption.xAxis[0].data = xaxis;
                newOption.series[0].data = dataList;
                myChart.setOption(newOption);
            },
            pieGraph(fontSize){
                let myChart = this.$echarts.init(document.getElementById('distribution-chart'))
                
                let option = {
                    color:['#FFA4B7','#3FA7F6','#FD8602','#9A65F3','#25E0E5','#FFB500','#0BBF3A','#007CFF','#FFE54A'],
                    series: [
                        // 主要展示层的
                        {
                            radius: ['30%', '50%'],
                            center: ['50%', '50%'],
                            selectedMode: 'single',
                            selectedOffset: 5,
                            type: 'pie',
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#433F5C',
                                        fontSize: fontSize
                                    },
                                    formatter: "{b} : {c}"
                                },
                                emphasis: {
                                    show: true
                                },
                                
                                
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                    length:10,
                                    length2:10
                                },
                                emphasis: {
                                    show: true
                                },
                            },
                            animation: false,
                            data: this.distributionList
                        },
                        
                        
                    
                    ]
                };
                myChart.setOption(option);
            },
            getYearList(){
                let that = this;
                this.axios.get(URL.url+'/front/student_report/voice/years/'+this.studentID).then(response=>{
                    if (response.status === SUCCESS.success) {
                        if(response.data.code == 200){
                            let yearList = response.data.data;
                            if(yearList.length != 0){
                                let min = parseInt(yearList[0])
                                let max = parseInt(yearList[yearList.length-1])
                                this.selectYear = yearList[yearList.length-1];
                                this.maxYear = max;
                                this.minYear = min;
                            }

                            this.getSpeedList().then((res)=>{
                                that.$nextTick(()=>{
                                    that.chartsGraph('speed-rate-chart','speed',16);
                                })
                            })
                        }
                    }
                })
            },
            getSpeedList(){
                let that = this;
                let p = new Promise((resolve,reject)=>{
                    that.axios.get(URL.url+'/front/student_report/voice/year/'+that.studentID+'/'+that.selectYear).then(response=>{
                        if (response.status === SUCCESS.success) {
                            if(response.data.code == 200){
                                let dataList = response.data.data;
                                this.inputList = dataList.map((elem,index)=>{
                                    return {
                                        date:elem.date.slice(5,7)+elem.date.slice(8),
                                        value:elem.num
                                    }
                                })
                                resolve();
                            }
                        }
                    })
                })
                return p;
            },
            //开始
            start(){
                let that = this;
                let piePromise = new Promise((resolve,reject)=>{
                    that.axios.get(URL.url+'/front/student_report/'+that.studentID+'/1/'+that.today).then(response=>{
                        if (response.status === SUCCESS.success) {
                            if(response.data.code == 200){
                                /**是否有学习报告 */
                                that.hasStudy = response.data.data.isShow;
                                
                                if(response.data.data.isShow == 1){
                                    that.totalData = JSON.parse(response.data.data.jsonContent);
                                    
                                    that.basicInfo = that.totalData.basicInfo;
                                    that.moreReadInfo = that.totalData.moreReadInfo;
                                    that.readInfo = that.totalData.readInfo;
                                    that.skillInfo = that.totalData.skillInfo;
                                    that.voiceInfo = that.totalData.voiceInfo;
                                    that.wordInfo = that.totalData.wordInfo;
                                    that.goal = that.totalData.goalInfo;
                                    
                                    if(that.totalData['beginTime']!=''){
                                        that.totalData['beginTime'] = that.totalData['beginTime'].slice(0,4)+'.'+that.totalData['beginTime'].slice(5,7)+'.'+that.totalData['beginTime'].slice(8)
                                    };
                                    if(that.totalData.readInfo['endTime']!=''){
                                        that.totalData.readInfo['endTime'] = that.totalData.readInfo['endTime'].slice(0,4)+'.'+that.totalData.readInfo['endTime'].slice(5,7)+'.'+that.totalData.readInfo['endTime'].slice(8)
                                    };
                                    
                                    that.bookWidth = that.totalData.basicInfo.bookLevel/that.totalData.basicInfo.topLevel * 100;
                                    that.audioWidth = that.totalData.basicInfo.oralLevel/that.totalData.basicInfo.topLevel * 100;
                                    that.bookLevel = that.totalData.basicInfo.bookLevel;
                                    that.oralLevel = that.totalData.basicInfo.oralLevel;
                                   
                                    /**
                                     * encourageTip1   中国功力值
                                     * encourageTip2   学习时长饼图下面
                                     * encourageTip3   学习时长饼图上面  根据进步状态改变
                                     * encourageTip4   词汇库
                                     * encourageTip5   语速测算
                                     */
                                    if(that.wordInfo.enaourage){
                                        that.encourageTip2 = that.wordInfo.enaourage;
                                    }else{
                                        that.encourageTip2 = '你的恒心是你制胜法宝，在你连续的学习中不断的积累才能达到更高的目标，比其他人你在坚持学习上做的很棒，如果能每日的学习上时间坚持得更久一些，那你会更上一层楼'
                                    }
                                    
                                    //根据进步条件判断显示数据
                                    if(that.moreReadInfo.isShowMoreRead == 1){
                                        that.encourageTip3 = '你真了不起～<br/>';  
                                        that.encourageTip3 += '你昨天比前天多听读了'+that.moreReadInfo.moreReadSecond+'分钟～<br/>';
                                        if(that.moreReadInfo.isShowMoreAvg && that.moreReadInfo.isShowMoreAvg == 1){
                                            that.encourageTip3 += '超过了日均时长'+that.moreReadInfo.moreAvgReadSecond+'分钟～<br/>';
                                        }
                                        if(that.voiceInfo.eclassRank){
                                            that.encourageTip3 += '班级第'+that.voiceInfo.eclassRank+'名'
                                        }
                                    }else{
                                        that.encourageTip3 = that.moreReadInfo.encourage;
                                    }

                                    //是否有功力值
                                    if(that.skillInfo.isShowSkill == 1){
                                        /**判断是否有预测年级 */
                                        if(that.skillInfo.isShowMaxSkill == 1){
                                            that.hasHighestLevel = true
                                        }else{
                                            that.hasHighestLevel = false
                                        }

                                        that.encourageTip1 = '你真了不起～<br/>你当前的英语年级为'+that.skillInfo.studentSkill+'，这已经超过了你的实际学龄';
                                    }
                                    

                                    if(that.moreReadInfo.isShowMoreWord == 1){
                                        that.hasProgress = true ;
                                        that.encourageTip4 = '你真了不起～<br/>昨日学习单词比前天多'+that.moreReadInfo.moreWordNum+'个';
                                    }else{
                                        //无进步 
                                        that.hasProgress = false;
                                    }

                                    
                                    that.encourageTip5 = that.voiceInfo.encourage;
                                    
                                    
                                    console.log(that.totalData)
                                    resolve(response.data.data);
                                    
                                }
                            }
                        }
                    })
                })
                return piePromise
            },
            //语速老的
            getSpeedList(){
                this.axios.get(URL.url+'/front/student_report/voice/'+this.studentID).then(response=>{
                    if (response.status === SUCCESS.success) {
                        if(response.data.code == 200){
                            this.speedList = response.data.data
                        }
                    }
                })
            },
            toRead(){
                if(typeof commInteract !='undefined' && commInteract){
                    commInteract.toDubbingRead();
                }   
            }
        },
        created(){
            
            this.studentID = this.$route.query.studentID;
            
            this.studentID = '111989'
            let _date = new Date();
            let year = _date.getFullYear();
            let month = (_date.getMonth()+1) > 9 ? (_date.getMonth()+1) : ('0'+(_date.getMonth()+1));
            let day = _date.getDate() > 9 ? _date.getDate() : '0'+_date.getDate()
            this.today = year+''+month+''+day;

            //this.today = '20190809'

            let that = this;

            //饼状图
            this.start().then((data)=>{
                let _pieChart = that.totalData.pieChart.map((elem,index)=>{
                    return {
                        name:elem.title,
                        value:elem.number
                    }
                });
                that.distributionList = _pieChart;
                that.totalData.pieChart = _pieChart;

                that.$nextTick(()=>{
                    that.pieGraph(16);
                })


                
                 // 有学习报告调用
                 
                
                if(that.hasStudy == 1){
                    //学习时长线图
                    that.getLineData('read','day').then((res)=>{
                        that.$nextTick(()=>{
                            that.chartsGraph('chart-graph','day',16);
                        })
                    });
                    //单词量线图
                    that.getLineData('word','day').then((res)=>{
                        that.$nextTick(()=>{
                            that.chartsGraph('showChart-graph','day',16);
                        })
                    });

                    //语速分析
                    //that.getYearList();
                    that.getSpeedList()
                }

            }); 
   
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss" scoped>
    .chart-title div{
        width: 46%;
        text-align: center;
    }
    .words-bank{
        font-size: .68rem;
        font-weight: 600;
        color: #433F5C;
        .words-read{
            margin-top: 1rem;
            .words-read-describle{
                width: 60%;
                margin: 0 auto;
                line-height: 1.3rem;
                padding-bottom: .6rem;
                span{
                    margin: 0 .3rem;
                }
            }
            .words-read-bar{
                width: 80%;
                margin:0 auto;
                font-size: .5rem;
                background-color: #E5E5E5;
                border-radius: 2rem;
                overflow: hidden;
                .bar-item {
                    padding: .4rem 0;
                    border-radius: 2rem;
                    text-align: center;
                }
                .bgblue{
                    background-color: #31B2FD;
                    color: #fff;
                }
                .bgyellow{
                    background-color: #F7B500;
                    color: #fff;
                }
            }
            .words-read-text{
                width: 80%;
                font-size:0.52rem;
                font-weight: 500;
                margin: .3rem 0rem 0 1rem;
            }
        }
    }
    .speed-rate{
        .speed-rate-decrible{
            width: 60%;
            margin: 1rem auto;
            font-weight: 600;
            .purple{
                margin: 0 .2rem;
            }
        }
        .speed-old{
            padding: 1rem 0;
            margin-top: 3rem !important;
            .my-goal{
                margin-top: -4.0rem;
            }
            .my-goal-content{
                div{
                    margin-bottom: 1rem;
                    span{
                        font-size: .8rem;
                    }
                }
                span{
                    font-size: .8rem;
                }
            }
        }
        .speed-rate-chart{
            width: 90%;
            margin: 0 auto;
            padding-bottom: 1.5rem;
        }
        .encourage-tips{
            margin: 2rem auto 3rem;
        }
        .tips{
            font-weight: 600;
            margin: 0 0 2rem;
            line-height:0.96rem;
        }
        .speed-rate-goal{
            background: #EAF7FF;
            padding: 1rem 0;
            width: 82%;
            margin: 0 auto 2rem;
            position: relative;
            .my-goal{
                background: url('https://static.tope365.com/report/images/study/task.webp') 0 0 no-repeat;
                background-size: 100% 100%;
                color: #fff;
                font-size: .68rem;
                padding: .2rem .8rem .7rem;
                margin-left: -.5rem;
            }
            .my-goal-content{
                font-size:0.63rem;
                line-height:0.86rem;
                font-weight:600;
                width: 60%;
                margin-left: 1rem;
            }
        }
    }
    .words-read{
        i{
            font-size: .8rem;
            padding: 0 1rem 0 0;
            margin-top:1px;
        }
    }
    .yearBar{
        width: 82%;
        color: #fff;
        margin:0 auto;
        div{
            padding: .2rem 0;
            text-align: center;
            font-size: .5rem;
        }
        .red{
            background: #DD7A6A;
        }
        .poo{
            background: #876FD4;
        }
    }
    .study-progress{
        .study-progress-content{
            width: 80%;
            margin: 1rem auto;
            
        }
    }
    .happy-ending{
        position: fixed;
        width: 10rem;
        background: url('https://static.tope365.com/report/images/study/button_start.webp') 0 0 no-repeat;
        background-size: 100% 100%;
        font-size:0.68rem;
        font-family:'PingFangSC-Semibold';
        font-weight:600;
        color:rgba(255,255,255,1);
        padding: .8rem 0 1rem 0;
        left: 5rem;
        bottom:.6rem;
        z-index: 10;
    }
    .litterYellow{
        background: #FFF6D2;
    }
    .litterBlue{
        background: #D2E9FF;
    }
    .level-progress{
        overflow: hidden
    }
    .chart-nothingTip{
        position: absolute;
        top:5rem;
        left: 5rem;
    }
</style>