<template>
    <div class='phrase'>
        <div class="header_box">
            <div class="header_content">
                <div class="header_left" @click="closeBox()">
                    <img src="https://static.tope365.com/report/images/study/button_return_white.webp" alt="">
                </div>
                <div class="header_btns">
                    <span class="header_btn btn_left" :class="isActive == 1 ? 'active' : ''" id="know" @click="openWord(1)">掌握搭配及语块</span>
                    <span class="header_btn btn_right" :class="isActive == 2 ? 'active' : ''" id="unknow" @click="openWord(2)">未掌握搭配及语块</span>
                </div>
            </div>
        </div>
        <div class="word_content" >
            <div class="word_list">
                <div class="word_item" v-for="(item,index) in phrase" :key="index">
                    <div class="item_num">{{index+1}}</div>
                    <div class="item_content">
                        <span class="item_word">{{item}}</span>
                        <span class="item_tag">(重点)</span>
                    </div>
                </div>
            </div>
        </div>
        <nothing v-if="iShow"></nothing>
    </div>
</template>

<script>
    import URL from "../../assets/js/url.js"
    import SUCCESS from "../../assets/js/success"
    import { Indicator } from 'mint-ui'
    import Nothing from '../nothing/nothing';

export default {
    name:'phrase',
    components: {
        Nothing
    },
    data() {
        return {
            studentID:'',
            contentHeight:0,
            iShow:false,
            isActive:1,
            knowList:[],//掌握
            unKnowList:[],//未掌握
            phrase:[]
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        closeBox(){
            this.$router.go(-1);
        },
        openWord(type){
            this.isActive = type ;

            /**掌握 1 未掌握 2 */
            if(type == 1){
                this.phrase = this.knowList.phrase;

            }else if(type == 2){
                this.phrase = this.unKnowList.phrase
            }

            if(this.phrase.length == 0){
                this.iShow =true
            }else{
                this.iShow =false
            }

        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.studentID = this.$route.query.studentID; 
        this.contentHeight=document.documentElement.clientHeight;
        this.axios.get(URL.url+"/front/view_report_detail/"+this.studentID).then(
            response => {
            if(response.status == SUCCESS.success){
                if(response.data.code == 200){

                    if(response.data.data.knowWord){
                        this.knowList = response.data.data.knowWord;
                    }
                    if(response.data.data.unKnowWord){
                        this.unKnowList = response.data.data.unKnowWord;
                    }
                    
                    Indicator.close();
                    this.$nextTick(()=>{
                        this.openWord(1);
                    })
                }
            }
            }
        )
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        //this.studentID =  sessionStorage.getItem('studyStudentID');
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
    .phrase{
        .header_box{
            width:100%;
            padding: .3rem 0;
            position: fixed;
            top: 0;
            left: 0;
            background: #fff;
            z-index: 20;
            .header_content{
                width: 90%;
                margin: 0rem auto;
                display: flex;
                font-size: .68rem;
                .header_left{
                    img{
                        width: 1.6rem;
                    }
                }
                .header_btns{
                    width:70%;
                    margin: 0 auto;
                    border:1px solid #0AC905;
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-around;
                    position: relative;
                    text-align: center;
                    span{
                        display: inline-block;
                        padding: .3rem .3rem;
                    }
                }
                .header_btn{
                    flex: 1;
                }
                .active{
                    background: #0AC905;
                    color:#fff;
                }
                .btn_left{
                    border-radius: 10px 0 0 10px;
                }
                .btn_right{
                    border-radius: 0 10px 10px 0;
                }


            }
        }
        .word_content{
            width:90%;
            margin: 2.5rem auto 0;
        
            .word_item{
                width:90%;
                margin: 1rem auto 0;
                background: #FCDA91;
                border-radius: 10px;
                overflow: hidden;
                display: flex;
                
            }
            .item_num{
                width:5rem;
                text-align: center;
                background: #33C330;
                color:#fff;
                border-radius: 10px;
                font-size:.6rem;
                padding: .6rem;
            }
            .item_content{
                flex: 1;
                color:#8F3F04;
                font-size: .5rem;
                padding: .6rem 1.6rem;
                display: flex;
                justify-content: space-between;
            }
            
        }
    }

</style>
