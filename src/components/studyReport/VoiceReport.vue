<template>
    <div class="voice-report">
        <div class="auto">
            <!-- search -->
            <div class="search-bar flex space-between" v-if="showNothing == false">
                <div class="list">目录</div>
                <!--  v-if="voiceList.length!=0" -->
                <div class="screen-text" v-if="kind!='' || time!=''">
                    {{kind == '' ? '' : (kind == 1 ? `书籍` : `视频`)}} <span v-if="kind!='' && time!=''"> · </span>{{time}}
                </div>
                <div class="condition flex">
                    <span class="flex shaixuan" @click="condition">
                        <img src="https://static.tope365.com/report/images/study/icon_shaixuan.webp" alt="" srcset="">
                        筛选
                    </span>
                    <span v-if="orderBy == 1" class="flex" @click="paixu">
                        <img src="https://static.tope365.com/report/images/study/icon_zhengxu.webp" alt="" srcset="">
                        倒序
                    </span>
                    <span v-if="orderBy == 0" class="flex" @click="paixu">
                        <img src="https://static.tope365.com/report/images/study/icon_daoxu.webp" alt="" srcset="">
                        正序
                    </span>
                </div>
            </div>
            <!-- content -->
            <div class="voice-report-content" ref="voiceReport">
                <div class="voice-report-content-true">
                    <div class="voice-report-item flex space-between" v-for="(item, index) in voiceList" :key="index" @click="voiceDetail(item.studentEbookID,item.ebookKind)">
                        <!-- 图片 -->
                        <div class="book-img">
                            <img :src="item.coverUrl" alt="">
                        </div>
                        
                        <div class="book-content">
                            <div class="book-content-title">{{item.ebookName}}</div>
                            <div class="book-content-font">{{item.audioHour}}:{{item.audioMinute}}:{{item.audioSecond}}|单词数{{item.wordNum}}</div>
                            <div class="book-content-time">
                                <span>{{item.ebookKind == 1?'书籍':'视频'}}等级：{{item.level}}</span><span>{{`${item.createTime.slice(0,10)}`}}</span>
                            </div>
                        </div>
                        <div class="book-zan">
                            <div>{{item.thumbUpNum}}</div>
                            <img v-if="item.thumbUpNum == 0" src="https://static.tope365.com/report/images/study/praise_unselect.webp" alt="" srcset="">
                            <img v-if="item.thumbUpNum > 0" src="https://static.tope365.com/report/images/study/praise_select.webp" alt="" srcset="">
                        </div>
                    </div>
                    <i-speaking class="longReport" v-if="hasDubbingYesterday == 0 && showNothing == false && showSelectNothing == false" :text="iSpeakingLong"></i-speaking>
                </div>
            </div>

            <!-- 筛选条件 -->
            <div class="screening-conditions" v-if="showCondition">
                <!-- 类型 -->
                <div class="conditions-type flex">
                    <div class="blue">类型</div>
                    <span :class="item.show == true ? 'active' : ''" @click="setType(item.value,index)" v-for="(item, index) in typeList" :key="index">{{item.name}}</span>
                </div>
                <!-- 时间 -->
                <div class="conditions-time flex">
                    <div class="blue">时间</div>
                    <div class="time-bar flex">
                        <span :class="item.show == true ? 'active' : ''" @click="setTime(item.value,index)" v-for="(item, index) in dateList" :key="index">{{item.name}}</span>
                    </div>
                </div>
                <div>
                    <div class="sure text-center" @click="makeSure">确定</div>
                </div>
            </div>

            <!-- modal -->
            <div class="modal" v-if="showCondition"></div>
            <!-- 置顶 -->
            <div class="top" @click="top" v-if="showNothing == false">
                <img src="https://static.tope365.com/report/images/study/icon_top.webp" alt="">
            </div>
        </div>
        <i-speaking v-if="showNothing" class="newReport" :text="iSpeakingNew"></i-speaking>
        <div class="happy-ending text-center" v-if="hasDubbingYesterday == 0 || showNothing == true" @click="toDubbing">去配音</div>
        <nothing :title='nothingText' v-if="showSelectNothing"></nothing>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import URL from "../../assets/js/url"
    import SUCCESS from "../../assets/js/success"
    import ISpeaking from './components/ISpeaking'
    import Nothing from '../nothing/nothing'
    import {Indicator,Toast} from 'mint-ui';
    export default {
        data() {
            return {
                studentID:'',
                voiceList:[],
                pageNo:1,
                orderBy:1,//0-升序 1-降序
                kind:'',//1-书 2-口语
                time:'',
                studentID:'9630',
                typeList:[{show:true,name:'全部',value:''},{show:false,name:'书籍',value:1},{show:false ,name:'视频',value:2}],
                dateList:[],//{show:true,name:'全部',value:''}
                showCondition:false,
                iSpeakingNew:'小i暂时还不能为你生成语音报告，速速去配音吧，生成语音报告，记录下自己的进步，配音越多金币越多哦~',
                iSpeakingLong:'小i昨天未收到你的配音哦，无法更新你的语音报告，赶紧去配音吧，勇于张口，相信你会越来越棒的，小i期待你的新作品！',
                showNothing:false,//列表为空
                nothingText:'暂无数据',
                hasDubbingYesterday:1,
                hasDubbingYesterdayYN:0,
                showSelectNothing:false,//查询数据为空
            }
        },
        components:{ISpeaking,Nothing},
        beforeRouteLeave(to,from,next){
            if(to.path == '/studyReport/listenReport'){
                this.$emit('tabIndex',0)
            };
            this.showCondition = false;
            next()
        },
        methods:{
            condition(){
                this.showCondition = !this.showCondition
                //console.log(this.showCondition)
            },
            paixu(){
                if(this.orderBy == 0){
                    this.orderBy = 1;
                    /**获取语音列表 */
                    this.pageNo =1;
                    this.voiceList = [];
                    this.getDataList();
                }else{
                    this.orderBy = 0;
                    /**获取语音列表 */
                    this.pageNo =1;
                    this.voiceList = [];
                    this.getDataList();
                }
            },
            toDubbing(){
                //去配音 toDubbingBook()
                if(typeof commInteract !='undefined' && commInteract){
                    if(this.kind == 1){
                        commInteract.toDubbingBook();
                    }else{
                        commInteract.toDubbingVideo();
                    }  
                }
            },
            //判断昨天是否有配音
            hasDubbing(){
                //count 1 昨天配音  0 没有配音
                this.axios.get(URL.url+'/front/student_report/count_yesterday_ebook/'+this.studentID).then(response=>{
                    if (response.status === SUCCESS.success) {
                        if(response.data.code == 200){
                            this.hasDubbingYesterdayYN = response.data.data.count
                        }
                    }
                })
            },
            getDataList(){
                this.axios.get(URL.url+'/front/student_report/list?studentID='+this.studentID+'&orderBy='+this.orderBy+'&kind='+this.kind+'&time='+this.time+'&pageSize=20&pageNo='+this.pageNo).then(response=>{
                    if (response.status === SUCCESS.success) {
                        Indicator.close();
                        this.voiceList = this.voiceList.concat(response.data.list);
                        
                        /**判断是否数据为空 */
                        if(this.kind == '' && this.time == ''){
                            if(this.voiceList.length == 0){
                                this.showNothing = true
                            }else{
                                this.showSelectNothing = false
                                this.showNothing = false
                            }

                        }else{
                            this.showNothing = false
                            if(this.voiceList.length == 0){
                                
                                this.showSelectNothing = true
                            }else{
                                this.showSelectNothing = false
                            }
                        }
                        
                        if(response.data.list.length < 20){
                            this.hasDubbingYesterday = this.hasDubbingYesterdayYN;
                        }

                        if(response.data.list.length == 0){
                            this.hasDubbingYesterday = this.hasDubbingYesterdayYN;
                            return ;
                        }

                        this.$nextTick(() => {
                            if (!this.betterscroll) {
                                this.betterscroll =new BScroll(this.$refs.voiceReport,{
                                    probeType:3,
                                    scrollY: true,
                                    click:true,
                                    tap: true,
                                    pullUpLoad: {
                                        threshold: 1
                                    }
                                });

                                //下拉
                                this.betterscroll.on('pullingUp', () => {
                                
                                    this.getDataList()

                                });

                            } else {
                                this.betterscroll.finishPullUp();
                                this.betterscroll.refresh();
                            }
                        })
                    }
                })
                this.pageNo++;
            },
            getYearList(){
                this.axios.get(URL.url+'/front/student_report/get_year').then(response=>{
                    if (response.status === SUCCESS.success) {
                        let yearList = response.data.data;
                        let _yearList = [];
                        this.dateList = [{show:true,name:'全部',value:''}];
                        if(yearList.length!=0){
                            _yearList = yearList.map((elem,index)=>{
                                return {
                                    show:false,
                                    name:elem,
                                    value:elem
                                }
                            });
                            this.dateList = this.dateList.concat(_yearList);
                        }
                    }
                })
            },
            setType(kind = '',_index){
                this.kind = kind;
                let _typeList=this.typeList.map((elem,index)=>{
                    if(index == _index){
                        elem.show = true
                    }else{
                        elem.show = false
                    }
                    return elem;
                });
                this.typeList=_typeList;
            },
            setTime(time = '',_index){
                this.time = time;
                let _dateList=this.dateList.map((elem,index)=>{
                    if(index == _index){
                        elem.show = true
                    }else{
                        elem.show = false
                    }
                    return elem
                })
                this.dateList=_dateList
            },
            makeSure(){
                this.showCondition = false;
                /**获取语音列表 */
                this.pageNo =1;
                this.voiceList = [];
                this.getDataList();
            },
            top(){
                //document.body.scrollTop = document.documentElement.scrollTop = 0;
                this.betterscroll.scrollTo(0,0)
            },
            voiceDetail(bookID,ebookKind){
                if(ebookKind == 1){
                    //书籍
                    this.$router.push({
                        path:'/voiceDetail',
                        query:{
                            studentEbookID:bookID
                        }
                    })
                }else if(ebookKind == 2){
                    //视频
                    //window.location.href='http://10.0.3.3:8082/engApi//front/student_ebook/view/1848294'
                    this.$router.push({
                        path:'/videoDetail',
                        query:{
                            studentEbookID:bookID
                        }
                    })
                }
                
            }
        },
        created(){
            this.studentID = this.$route.query.studentID;

            this.hasDubbing();
            /**获取语音列表 */
            this.getDataList();
            this.getYearList();
        }
    }
</script>

<style lang="scss" scoped>
    .voice-report{
        font-size: .68rem;
        color: #433F5C;
        // position: relative;
        background:#fff;
        .screen-text{
            font-size: .5rem;
            font-weight: normal;
            margin-left: 6rem;
        }
        .auto{
            background:#fff;
        }
        .search-bar{
            padding: .8rem 0;
            font-weight: 600;
            margin-top:5rem;
            .list{
                font-size: .72rem;
                background: url('https://static.tope365.com/report/images/study/catalogue.webp') 0 0 no-repeat;
                background-size: 60% 100%;
                padding-left: .1rem;
            }
            .condition{
                font-size: .58rem;
                .shaixuan{
                    margin-right: .3rem;
                }
                span{
                    border: 2px solid #B4B2BE;
                    border-radius: 2rem;
                    padding: .1rem .5rem;
                    img{
                        height: .66rem;
                        margin-right: .2rem;
                    }
                }
                
            }
        }
        .voice-report-content{
            position: absolute;
            width: 100%;
            left: 0;
            top: 7.8rem;
            bottom: 1rem;
            background: #fff;
            z-index: -1;
            overflow: hidden;
            .voice-report-content-true{
                width: 92%;
                margin: 0 auto;
            }
            .voice-report-item{
                background: #fff;
                border-radius: 1rem;
                box-shadow:0rem 0.16rem 1.28rem 0rem rgba(210,233,255,0.8);
                padding: 1rem;
                align-items: center;
                font-weight: bold;
                margin-bottom: 1rem;
                .book-img{
                    width: 4rem;
                    height: 4rem;
                    border-radius: .2rem;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
                .book-content{
                    margin: 0 1rem;
                    .book-content-title{
                        font-size: .78rem;
                        height: 1rem;
                        line-height: 1rem;
                        overflow: hidden;
                    }
                    .book-content-font{
                        font-size: .57rem;
                        color: #B4B2BE;
                        margin: .26rem 0;
                    }
                    .book-content-time{
                        font-size: .57rem;
                        span{
                            margin-right: 1rem;
                        }
                    }
                }
                .book-zan{
                    text-align: center;
                    color: #B4B2BE;
                    img{
                        width: 1.3rem;
                        margin-top: .5rem;
                    }
                }
            }
        }
        .screening-conditions{
            position: absolute;
            top: 7.6rem;
            left: 0;
            background: #fff;
            width: 100%;
            z-index: 6;
            font-size: .78rem;
            font-weight: 500;
            padding: 1rem .8rem;
            border-top: 1px solid #D8D8D8;
            .blue{
                color: #2897F6;
                margin-right: 1rem;
            }
            .conditions-type{
                margin-bottom: 1.6rem;
                span{
                    padding: .1rem .8rem;
                }
                span.active{
                    background: #6EC9FF;
                    color: #fff;
                    border-radius: 2rem;
                }
            }
            .conditions-time{
                margin-bottom: 1.6rem;
                
                .time-bar{
                    overflow-x: auto;
                    width: 15rem;
                    span{
                        width: 4rem;
                        padding: .1rem 0;
                        text-align: center;
                    }
                    span.active{
                        background: #6EC9FF;
                        color: #fff;
                        border-radius: 2rem;
                    }
                }
            }
        }
        .sure{
            width: 60%;
            margin: 0 auto;
            background: #6EC9FF;
            color: #fff;
            padding: .4rem 0;
            border-radius: 2rem;
        }
        .modal{
            position: fixed;
            top: 9rem;
            left: 0;
            width: 100%;
            height: 100%;
            background:rgba(0,0,0,0.6);
            overflow: hidden;
            z-index: 5;
        }
        .top{
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            width: 2rem;
            z-index: 4;
            img{
                width: 100%;
            }
        }
        .newReport{
            top: 9rem;
            width: 92%;
            border-radius: .2rem;
            overflow: hidden;
        }
        .longReport{
            bottom:0rem;
            left: -4.8%;
            width: 100%;
            display: block;
            margin-left: 5%;
        }
        .happy-ending{
            position: absolute;
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
    }
</style>