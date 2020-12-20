<template>
    <div>
        <header class="header-noscroll">
            <img src="https://static.tope365.com/report/images/study/background.webp" alt="bg" srcset="">
            <div class="title-content">
                <div class="title-header text-center">
                    <img src="https://static.tope365.com/report/images/study/button_return_white.webp" alt="" @click="back">
                    <span>我的学习报告</span>
                </div>
                <div class="title-innercontent">
                    <div class="day">{{day}}</div>
                    <div class="month">{{month}}.{{year}}</div>
                    <div class="updatetime">每日6点更新</div>
                    <div class="upadtedata">更新至昨天24:00前数据</div>
                </div>
            </div>
            <div class="tab box-shadow">
                <router-link :class="status == 0 ? 'active' : ''"  @click.native="listenReport" :to="{path:'/studyReport/listenReport',query:{studentID:studentID}}">听读报告</router-link>
                <router-link :class="status == 1 ? 'active' : ''" @click.native="voiceReport" :to="{path:'/studyReport/voiceReport',query:{studentID:studentID}}">语音报告</router-link>
            </div>
        </header>
    </div>
</template>

<script>
    import '../../../assets/css/studyReport.css'
    export default {
        props:['status','studentID'],
        data() {
            return {
                year:'',
                month:'',
                day:''
                
            }
        },
        methods:{
            back(){
                if(typeof commInteract !='undefined' && commInteract){
                    commInteract.closeWin();
                    localStorage.removeItem('tabSelect');
                } 
            },
            listenReport(){
                
                //this.$router.push('/studyReport/listenReport');
                
                this.$emit('status',0)
            },
            voiceReport(){
                
                //this.$router.push('/studyReport/voiceReport');
               
                this.$emit('status',1)
            },
            timeInit(){
                let date = new Date();
                this.day = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
                let month = date.getMonth()+1;
                this.year = date.getFullYear();
                switch(month){
                    case 1:this.month='January';break;
                    case 2:this.month='February';break;
                    case 3:this.month='March';break;
                    case 4:this.month='April';break;
                    case 5:this.month='May';break;
                    case 6:this.month='June';break;
                    case 7:this.month='July';break;
                    case 8:this.month='August';break;
                    case 9:this.month='September';break;
                    case 10:this.month='October';break;
                    case 11:this.month='November';break;
                    case 12:this.month='December';break;
                }
            }
        },
        mounted(){
            this.timeInit()
        }
    }
</script>

<style lang="scss" scoped>
    /* no scroll header */
    header.header-noscroll{
        position: relative;
        z-index: 2;
        background: #fff;
        min-height: 17rem;
    }
    header.header-noscroll img{
        width: 100%;
    }
    header.header-noscroll .title-content{
        position: absolute;
        top: 0;
        width: 100%;
    }
    header.header-noscroll .title-content .title-header{
        padding: 1rem 0;
        color: #fff;
    }
    header.header-noscroll .title-content .title-innercontent{
        padding-left: 1rem;
        color: #59B8FE;
        font-size: .63rem;
        font-weight: 600;
    }
    header.header-noscroll .title-content .title-innercontent .day{
        font-size: 1.04rem;
        
    }
    header.header-noscroll .title-content .title-innercontent .updatetime,.upadtedata{
        padding: .5rem 1rem;
    }
    .upadtedata{
        padding-top: 0;
    }
</style>