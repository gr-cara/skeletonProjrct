<template>
    <div>
          <div class="template" :style="{height:`${contentHeight}px`}">
            <div class="header">
                <div class="time">
                    <span>{{reportData.createTime}}</span>
                </div>
                <div class="close" @click="closePage()">
                    <img src="https://static.tope365.com/report/images/effect/btn_guanbi.webp" alt="">
                </div>
            </div>
            <div class="content">
                <div class="portrait">
                    <div>
                        <img :src="reportData.portraitUrl" alt="">
                    </div>
                    <p class="studentName">{{reportData.studentName}}</p>
                </div>
                <div class="con_box">
                    <div class="imgDesc">
                        <img :src="iPicture" alt="">
                    </div>
                    <h2>
                        {{tipKind}}
                    </h2>
                    <p class="summary">
                        <span v-html="content"></span>
                    </p>
                    <div class="thumbsUpImg" v-if="thumbsUpImgShow">
                        <div class="head_portrait" v-for="(item,index) in listStduent" :key="index">
                            <img :src="item.portraitUrl" alt="">
                        </div>
                        <div v-if="listStduent.length>=3">...</div>
                    </div>
                    <div class="thumbs_up">
                        <div class="thumbs_up_img"  @click="isFabulous">
                            <img src="https://static.tope365.com/report/images/effect/btn_dianzan.webp" v-show="!fabulousShow" alt="">
                            <img src="https://static.tope365.com/report/images/effect/btn_dianzan_anxia.webp" v-show="fabulousShow" alt="">
                        </div>
                        <p>快给自己点个赞，开启今日的学习之旅吧！</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
               show:false,//控制分享模态框
               isShow:0,
               fabulousShow:false,
               thumbsUpImgShow:false,
               content:"",//内容
               iPicture:"",//小 i
               tipKind:"",
               readonly:false,
               reportData:{},
               listStduent:[],
               contentHeight:""
            }
        },
        methods:{
            goldCoinsData(){
                this.axios.get(this.URL.url+'/front/gold_reward/login_reward_info/'+this.studentID).then(response=>{
                        if (response.status === this.SUCCESS.success) {
                            if(response.data.code==200){
                                if(response.data.data.isShowGold==0||!response.data.data.isShowGold){//不可领取金币
                                    if(typeof commInteract !='undefined' && commInteract){
                                        commInteract.closeWin();
                                    }
                                }else if(response.data.data.isShowGold==1){//可领取金币
                                    this.$router.push({path:"/rewardGold",query:{studentID:this.studentID,studentName:this.reportData.studentName,createTime:this.reportData.createTime,portraitUrl:this.reportData.portraitUrl}})
                                }else{
                                    if(typeof commInteract !='undefined' && commInteract){
                                        commInteract.closeWin();
                                    }
                                }
                            }
                        }
                    },error=>{
                        console.log(error)
                    })
            },
            //close
            closePage(){
                if( this.isShow ==1){ //达标
                   this.goldCoinsData();
                }else if(this.isShow ==2){//不达标
                    if(typeof commInteract !='undefined' && commInteract){
                        commInteract.closeWin();
                    }
                }
            },
            //点赞
            isFabulous(){
                if(this.fabulousShow ==true){
                    this.fabulousShow=false; 
                }else{
                    this.fabulousShow=true;
                        if( this.isShow ==1){ //达标
                           this.goldCoinsData();
                        }else if(this.isShow ==2){//不达标
                            if(typeof commInteract !='undefined' && commInteract){
                            commInteract.closeWin();
                        }
                    } 
                }
            }
        },
        created(){
             let studentID=this.$route.query.studentID;
            //let studentID=8470;
            this.axios.get(this.URL.url+'/front/student_report/view/2/'+studentID).then(response=>{
                if (response.status === this.SUCCESS.success) {
                   if(response.data.code==200){
                        this.reportData=response.data.data;
                        if(!this.reportData.portraitUrl){
                            this.reportData.portraitUrl="https://static.tope365.com/report/images/effect/noHead.webp";
                        }
                        this.reportViewID=response.data.data.reportViewID;
                        this.studentID=this.reportData.studentID;
                        this.isShow=this.reportData.isShow;
                        this.reportDataObj= JSON.parse(this.reportData.jsonContent);
                        if(this.isShow==1){ //达标
                            //阅读活动
                            if(this.reportDataObj.isShowPrize==1){
                                this.tipKind=this.reportDataObj.prizeKind;
                                this.iPicture="https://static.tope365.com/report/images/effect/img_yueduhuodong.webp";
                                this.content=`恭喜你！你参加的${this.reportDataObj.activtyTime},${this.reportDataObj.activityTitle}获得了${  this.reportDataObj.prizeKind},坚持努力一定会有回报的`;
                                return;
                            }
                            //连续听读时长
                            if(this.reportDataObj.isShowContinueRead==1){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_lianxushichang.webp";
                                this.content=`你已经连续 <span class="importantText">${this.reportDataObj.continueReadDay}天</span>听读${this.reportDataObj.minSecond}分钟以上了，最高时长${this.reportDataObj.maxSecond}分钟,小小的积累会有大大的成就~`;
                                return;
                            }
                            //功力值级别
                            if(this.reportDataObj.isShowSkill==1){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_gonglizhi.webp";
                                //书籍
                                if(this.reportDataObj.addBookLevel){
                                    this.tipKind=`${this.reportDataObj.addBookLevel}级`;
                                    this.content=`你的书籍级别又升了${this.reportDataObj.addBookLevel}级，你的努力小i都看在眼里，继续加油！`;
                                    return;
                                }
                                //口语
                                if(this.reportDataObj.addOralLevel){
                                    this.tipKind=`${this.reportDataObj.addOralLevel}级`;
                                    this.content=`你的视频级别又升了${this.reportDataObj.addOralLevel}级，你的努力小i都看在眼里，继续加油！`;
                                    return;
                                }
                                //功力值
                                if(this.reportDataObj.termName){
                                    this.tipKind=this.reportDataObj.termName;
                                    this.content=`你的功力值已达到${this.reportDataObj.termName}了，这已经超过了你的实际学龄，真厉害！`;
                                    return;
                                }
                            }
                            //听读时长
                            if(this.reportDataObj.isShowReadSecond==1){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_shichang.webp";
                                //昨日阅读时长比前天多了
                                if(this.reportDataObj.moreSecond){
                                    this.tipKind=`${this.reportDataObj.moreSecond}分钟`;
                                    this.content=`昨日阅读时长比前天多了${this.reportDataObj.moreSecond}分钟,今天要比昨天更棒哦~`;
                                    return;
                                }
                                //昨日听读时长比平均时长多听读
                                if(this.reportDataObj.moreAvg){
                                    this.tipKind=`${this.reportDataObj.moreAvg}分钟`;
                                    this.content=`昨日听读时长比平均时长多听读了${this.reportDataObj.moreAvg}分钟,超越自己才是最大的骄傲~`;
                                    return;
                                }
                                //昨日听读时长位于全班第几
                                if(this.reportDataObj.readSecondEclassRange){
                                    this.tipKind=`全班第${this.reportDataObj.readSecondEclassRange}`;
                                    this.content=`昨日听读时长位于全班第${this.reportDataObj.readSecondEclassRange},取得小成绩不能骄傲哦~还要更加努力`;
                                    return;
                                }
                            }
                            //书籍本书
                            if(this.reportDataObj.isShowReadBook==1){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_shuji.webp";
                                //昨日听读书籍数比前天多
                                if(this.reportDataObj.moreBook){
                                    this.tipKind=`${this.reportDataObj.moreBook}本`
                                    if(this.reportDataObj.moreBook==0){
                                        this.content=`你昨日听读了${this.reportDataObj.readBook}本书`
                                    }else{
                                        this.content=`你昨日听读了${this.reportDataObj.readBook}本书，比前天多读了${this.reportDataObj.moreBook}本`
                                    }
                                }
                                //昨日听读书籍数比平均阅读书籍数多
                                if(this.reportDataObj.moreAvgBook){
                                    this.tipKind=`${this.reportDataObj.moreAvgBook}本`
                                    if(this.reportDataObj.moreAvgBook==0){
                                        this.content=`你昨日读了${this.reportDataObj.readBook}本书`
                                    }else{
                                        this.content=`你昨日读了${this.reportDataObj.readBook}本书，比你的平均阅读书量多了${this.reportDataObj.moreAvgBook}本`
                                    }
                                }
                                //昨日听读书籍位于全班第几
                                if(this.reportDataObj.readBookEclassRange){
                                    this.tipKind=`第${this.reportDataObj.readBookEclassRange}名`;
                                    this.content=`昨日听读书籍数排在了全班第${this.reportDataObj.readBookEclassRange}名`;
                                    return;
                                }
                            }
                            //习题正确率
                            if(this.reportDataObj.isShowAcc==1){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_xitizhengqulv.webp";
                                this.tipKind=`${this.reportDataObj.rightAcc}%`
                                this.content=`amazing！你昨日的习题测试的正确率最高已达到了${this.reportDataObj.rightAcc}%`;
                                return;
                            }
                            //点赞数
                            if(this.reportDataObj.isShowUp==1){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_peiyindianzzan.webp";
                                for(let i=0;i<this.reportDataObj.listStduent.length;i++){
                                    this.studentName= this.reportDataObj.listStduent[i].studentName;
                                    if(!this.reportDataObj.listStduent[i].portraitUrl){//没有头像显示默认头像
                                        this.reportDataObj.listStduent[i].portraitUrl="https://static.tope365.com/report/images/effect/noHead.webp";
                                    }
                                }
                                this.thumbsUpImgShow=true;
                                //判断点赞人数是否大于3
                                let listStduent=this.reportDataObj.listStduent;
                                if(listStduent.length>3){
                                    this.listStduent=listStduent.slice(0,3);
                                }else{
                                    this.listStduent=listStduent;
                                }
                                if(this.reportDataObj.ebookUp>0&&this.reportDataObj.ebookUp<2){
                                    this.content=`${this.studentName}给你的配音作品点了赞`;
                                    
                                }else if(this.reportDataObj.ebookUp>=2){
                                    this.content=`昨日你的配音作品被${this.reportDataObj.ebookUp}人点赞`;
                                }
                            }
                            //老师奖励金币
                            if(this.reportDataObj.isShowGold==1){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_laoshijianglijinbi.webp";
                                this.tipKind=`${this.reportDataObj.goldBill}个`;
                                this.content=`你的表现有目共睹，老师昨日奖励给你${this.reportDataObj.goldBill}个金币`;
                                return;
                            }
                            //日有所思
                            if(this.reportDataObj.isShowHeart==1){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_riyousuosi.webp";
                                this.tipKind=`${this.reportDataObj.heart}次`;
                                if(this.reportDataObj.heart==1){
                                    this.content=`学而不思则罔，思而不学则殆，学习与思考同时进行更有利于你的进步，昨天的你完成了${this.reportDataObj.heart}次思考。`;
                                }else if(this.reportDataObj.heart>=2){
                                    this.content=`阅读是开始，思考是终点。我思故我在，恭喜你，你已经完成了${this.reportDataObj.heart}次思考。`;
                                }
                            }
                            //写信
                            if(this.reportDataObj.isShowHeartTalk==1){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_xiexin.webp";
                                //"isParent":"0",是否给家长写信0-否  1-是
                                //"isTeacher":"1"是否给教师写信0-否  1-是
                                if(this.reportDataObj.isParent==1){
                                    this.tipKind=`${this.reportDataObj.heartTalk}封`;
                                    this.content=`感到困惑和迷茫时，沟通能为你打开一扇窗户,你昨日给家长写了${this.reportDataObj.heartTalk}封信`;
                                    return;
                                }
                                if(this.reportDataObj.isTeacher==1){
                                    this.tipKind=`${this.reportDataObj.heartTalk}封`;
                                    this.content=`感到困惑和迷茫时，沟通能为你打开一扇窗户,你昨日给老师写了${this.reportDataObj.heartTalk}封信`;
                                    return;
                                }
                                if(this.reportDataObj.isParent==1&&this.reportDataObj.isTeacher==1){
                                    this.tipKind=`${this.reportDataObj.heartTalk}封`;
                                    this.content=`感到困惑和迷茫时，沟通能为你打开一扇窗户,你昨日给老师和家长都写了${this.reportDataObj.heartTalk}封信`;
                                    return;
                                } 
                            }
                        }else{
                            if(this.reportDataObj.isShowFail==1){ //听读时长
                                this.iPicture="https://static.tope365.com/report/images/effect/img_lianxushichang.webp";
                                this.content=`再听读 <span class="importantText">${this.reportDataObj.moreReadTimeEclassRange}</span> 进入全班前三了`;
                            }else if(this.reportDataObj.isShowFail==2){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_lianxushichang.webp";
                                this.content=`再听读 <span class="importantText"> ${this.reportDataObj.readMins}</span>分钟就可以超过全国 <span class="importantText"> ${this.reportDataObj.readMinsPer}%</span>的用户了`;
                            }else if(this.reportDataObj.isShowFail==3){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_lianxushichang.webp";
                                this.content=`再听读<span class="importantText">${this.reportDataObj.readGradeMins}</span> 分钟就可以超过全年级 <span class="importantText">${this.reportDataObj.readGradeMinsPer}%</span> 的用户了`;
                            }else if(this.reportDataObj.isShowFail==4){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_lianxushichang.webp";
                                this.content=`再听读 <span class="importantText">${this.reportDataObj.lastTime}</span> 分钟就达到 <span class="importantText">${this.reportDataObj.totalTime}</span> 个小时了`;
                            }else if(this.reportDataObj.isShowFail==5){//听读单词量
                                this.iPicture="https://static.tope365.com/report/images/effect/img_lianxushichang.webp";
                                this.content=`当前单词量超过了全国 <span class="importantText">${this.reportDataObj.nowNationPer}%</span> 的用户，再听读 <span class="importantText">${this.reportDataObj.readWords}</span> 个单词就可以超过 <span class="importantText">${this.reportDataObj.nextNationPer}%</span> 的用户了`;
                            }else if(this.reportDataObj.isShowFail==6){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_lianxushichang.webp";
                                this.content=`再听读 <span class="importantText">${this.reportDataObj.lastReadWords}个</span> 单词,听读单词总量就达到 <span class="importantText">${this.reportDataObj.totalWords}</span> 个了`;
                            }else if(this.reportDataObj.isShowFail==7){//排行榜
                                this.iPicture="https://static.tope365.com/report/images/effect/img_paihngbng.webp";
                                this.content=`再听读<span class="importantText">${this.reportDataObj.lastReadTime}</span> 分钟就可以进入排行榜前三`;
                            }else if(this.reportDataObj.isShowFail==8){//书籍
                                this.iPicture="https://static.tope365.com/report/images/effect/img_shuji.webp"
                                this.content=`再听读 <span class="importantText">${this.reportDataObj.lastReadBook}</span> 本书进入全班前三了`;
                            }else if(this.reportDataObj.isShowFail==9){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_shuji.webp";
                                this.content=`当前阅读的书籍量已超过全国 <span class="importantText">${this.reportDataObj.nowNationBookPer}%</span> 的用户，再听读 <span class="importantText">${this.reportDataObj.nationReadBook}</span> 本书就可以超过全国 <span class="importantText">${this.reportDataObj.nextNationBookPer}%</span>的用户`;
                            }else if(this.reportDataObj.isShowFail==10){
                                this.iPicture="https://static.tope365.com/report/images/effect/img_shuji.webp";
                                this.content=`当前阅读的书籍量已超过全班 <span class="importantText"> ${this.reportDataObj.nowEclassBookPer}%</span>的用户，再听读 <span class="importantText"> ${this.reportDataObj.eclassReadBook}</span>本书就可以超过全班
                                <span class="importantText">${this.reportDataObj.nextEclassBookPer}%</span>的用户`;
                            }
                        }
                        
                    }
                }
            },error=>{
                console.log(error)
            })
        },
        mounted(){
            this.contentHeight=document.documentElement.clientHeight;
        }
    }
</script>

<style lang="scss" scoped>
.template{
    width: 100%;
    height: 100%;
    background-image:url("https://static.tope365.com/report/images/effect/img_beijing.webp");
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% 100%;
    overflow: hidden;
    position: absolute;
}
.template .heade{
    position: relative;
    width: 100%;
    height: auto;
}
.template .header .close{
    width:1.98rem;
    height:2.01rem;
    position: absolute;
    right:0;
    top:1.17rem;
    right:1rem;
}
.template .close img{
    width: 100%;
    height: 100%;
}
.template .header .time{
    width: 24%;
    text-align: center;
    font-size:0.63rem;
    font-weight:800;
    color:rgba(1,86,210,1);
    position: absolute;
    top:1.2rem;
}
.template .content{
    width: 100%;
}
.template .content .portrait{
    position: absolute;
    width: 36%;
    text-align: center;
    top:12%;
}
.template .content .portrait div{
    width:2.34rem;
    height:2.34rem;
    border-radius:50%;
    margin:0 auto;
}
.template .content .portrait img{
    width: 100%;
    height: 100%;
    border-radius:50%;
}
.template .content .portrait .studentName{
    text-align: center;
    font-size:0.57rem;
    font-weight:800;
    color:rgba(47,95,190,1);
    margin-top:0.5rem;
}
.template .content .con_box{
    text-align: center;
}
.template .content .con_box h2{
    font-size:1.5rem;
    font-weight:800;
    color:rgba(255,162,0,1);
    margin:0.5rem 0;
}
.template .content .con_box .imgDesc{
    width:10rem;
    height:10rem;
    margin:5rem auto 0;

}
.template .content .con_box .imgDesc img{
    width: 100%;
    height: 100%;
}
.template .content .con_box .summary{
    width:70%;
    margin: 0 auto;
    span{
        font-size: 0.68rem;
    }
}
.template .content .con_box .summary i{
    font-style: normal;
    color: #FFA200;
}
.thumbsUpImg{
    display: flex;
    justify-content: center;
    align-items: center;
    .head_portrait img{
        width:1.8rem;
        height:1.8rem;
        line-height: 2.55rem;
        border-radius:50%;
        margin-right:0.2rem;
    }
}
.template .content .con_box .thumbs_up{
    margin-top:0.5rem;
}
.template .content .con_box .thumbs_up .thumbs_up_img{
    width:2.24rem;
    height:2.24rem;
    margin: 0 auto;
}
.template .content .con_box .thumbs_up .thumbs_up_img img{
    width: 100%;
    height: 100%;
}
.template .content .con_box .thumbs_up p{
    font-size:0.52rem;
    font-weight:bold;
    color:rgba(1,85,211,1);
    margin-top:0.2rem;
}
</style>
<style lang="">
    .importantText{
        color: #FFA200;
    }
</style>