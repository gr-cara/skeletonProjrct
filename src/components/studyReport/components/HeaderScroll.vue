<template>
    <div>
        <header class="header-scroll">
            <div class="title">
                <img src="https://static.tope365.com/report/images/study/button_return_white.webp" alt="" @click="back">
                <span>我的学习报告</span>
            </div>
            <div class="tab box-shadow">
                <router-link :class="status == 0 ? 'active' : ''"  @click.native="listenReport" :to="{path:'/studyReport/listenReport',query:{studentID:studentID}}">听读报告</router-link>
                <router-link :class="status == 1 ? 'active' : ''" @click.native="voiceReport" :to="{path:'/studyReport/voiceReport',query:{studentID:studentID}}">语音报告</router-link>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
        props:['status','studentID'],
        data() {
            return {
                tabActive:[true,false]
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
                this.$emit('status',0)
            },
            voiceReport(){
                this.$emit('status',1)
            }
        },
        mounted(){
    
        }
    }
</script>

<style lang="scss" scoped>
    /* scroll header */
    header.header-scroll{
        position: fixed;
        top: 0;
        width: 20rem;
        background: #fff;
        z-index: 1000;
    }
    header.header-scroll .title{
        padding: .6rem;
        background: #4DBAFF;
        color: #fff;
        text-align: center;
    }
    header.header-scroll .title img,header.header-noscroll .title-content .title-header img{
        position: absolute;
        left: 1rem;
        top: .5rem;
        width: 1.6rem;
        height: 1.6rem;
    }
    header.header-scroll .title span,header.header-noscroll .title-content .title-header span{
        font-size: 1rem;
        font-family:AliHYAiHei;
        text-shadow:0px 0px 0px rgba(60,204,255,1);
    }
    header.header-scroll .tab,header.header-noscroll .tab{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    header.header-scroll .tab{
        box-shadow:0rem 0.08rem 1.04rem 0rem rgba(42,153,247,0.6);
    }
    header.header-scroll .tab a,header.header-noscroll .tab a{
        padding: .6rem 0;
        font-size: .78rem;
        font-weight: 500;
        color: #433F5C;
    }
    header.header-scroll .tab a.active,header.header-noscroll .tab a.active{
        border-bottom: 5px solid #2897F6;
        color: #2897F6;
    }
</style>