<template>
    <div>
        <div class="template">
            <div class="header">
                <div class="time">
                    <span>{{createTime}}</span>
                </div>
                <div class="close" @click="close">
                    <img src="https://static.tope365.com/report/images/effect/btn_guanbi.webp" alt="">
                </div>
            </div>
            <div class="content">
                <div class="portrait">
                    <div>
                        <img :src="portraitUrl" alt="">
                    </div>
                    <p class="studentName">{{studentName}}</p>
                </div>
                <div class="reward_gold">
                    <h2 v-show="isShow">{{loginReward.RewardByNationReadDesk}}%</h2>
                    <div class="text">
                        <p v-if="loginReward.currentContinueReadDay>0||loginReward>0">已经连续登录 <span style="color:#FEA01D;" >{{loginReward.currentContinueReadDay}}天</span>，连续登录 <span style="color:#FEA01D;">{{loginReward.nextContinueReadDay}}天</span>将会获取更多金币</p>
                    </div>
                    <p class="rewardByNationReadDesk" v-if="loginReward.RewardByNationReadDesk>0">听读时长超过全国{{loginReward.RewardByNationReadDesk}}%的用户</p>
                    <div class="fortune_bag">
                        <img src="https://static.tope365.com/report/images/effect/img_fudai.webp" alt="">
                    </div>
                   <div class="gold_coins" @click="goldCoins">
                       <span>领取金币</span>
                   </div>
                </div>
            </div>
        </div>
        <div class="coinsTemplate" v-show="show">
            <img src="https://static.tope365.com/report/images/effect/123.webp" alt="">
        </div>
    </div>
</template>
<script>
    import { setTimeout } from 'timers';
    export default {
        data() {
            return {
              show:false,
              loginReward:{},
              studentID:"",
              createTime:"",
              portraitUrl:"",
              studentName:"",
              isShow:false
            }
        },
        methods:{
            close(){
                if(typeof commInteract !='undefined' && commInteract){
                    commInteract.closeWin();
                } 
            },
            goldCoins(){
                this.show=true;
                let _this=this;
                setTimeout(function(){ 
                    _this.show=false;
                    if(typeof commInteract !='undefined' && commInteract){
                        commInteract.closeWin();
                    } 
                }, 2000);
            }
        },
        created(){
            this.studentID=this.$route.query.studentID;
            this.createTime=this.$route.query.createTime;
            this.portraitUrl=this.$route.query.portraitUrl;
            this.studentName=this.$route.query.studentName;
            
            this.axios.get(this.URL.url+'/front/gold_reward/login_reward_info/'+this.studentID).then(response=>{
                if (response.status === this.SUCCESS.success) {
                    if(response.data.code==200){
                        this.loginReward=response.data.data
                        if(this.loginReward.currentContinueReadDay==0 || this.loginReward.nextContinueReadDay==0){
                            this.isShow=true;
                        }
                    }
                }
            },error=>{
                console.log(error)
            })
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
    position: relative;
}
.template .content .portrait{
    position: absolute;
    width: 36%;
    text-align: center;
    top:3.2rem;
}
.template .content .portrait div{
    width:2.34rem;
    height:2.34rem;
    margin:0 auto;
}
.template .content .portrait img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.template .content .portrait .studentName{
    text-align: center;
    font-size:0.57rem;
    font-weight:800;
    color:rgba(47,95,190,1);
}
.reward_gold{
    width: 100%;
    position: absolute;
    top:7rem;
    h2{
        font-size:1.56rem;
        text-align: center;
        font-weight:800;
        color:rgba(255,162,0,1);
    }
    .text{
        width: 100%;
        text-align: center;
        font-size:0.63rem;
        font-weight:bold;
        color:rgba(12,87,252,1);
        line-height:0.78rem;
        margin-top:0.47rem;
    }
    .rewardByNationReadDesk,.headDesk{
        font-size:0.63rem;
        font-weight:bold;
        color:rgba(12,87,252,1);
        line-height:0.78rem;
        text-align: center;
        margin-top:1.5rem;
    }
    .fortune_bag{
        width:100%;
        text-align: center;
        margin-left:0.5rem;
        margin-top:4.8rem;
        img{
            width:4.32rem;
            height:3.28rem;
            box-shadow:0rem 0rem 0rem 0rem rgba(207,207,207,1);
        }
    }
    .gold_coins{
        width:4.38rem;
        padding:0.3rem 0;
        margin:1rem auto 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url("https://static.tope365.com/report/images/effect/btn_lingqujinbi.webp");
        background-size:100% 100%;
        span{
            font-size:0.63rem;
            font-weight:bold;
            color:rgba(255,255,255,1);
        }
    }
}
.coinsTemplate{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    background:rgba(0,0,0,0.6);
    z-index: 10;
    padding-top:3rem;
    text-align: center
  /*   p{
        text-align: center;
        margin-top:-3rem;
        margin-left:-2rem;
    } */
}

</style>