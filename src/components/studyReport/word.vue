<!--  -->
<template>
    <div class='word'>
        <div class="header_box box-shadow">
            <div class="header_content">
                <div class="header_left" @click="closeBox()">
                    <img src="https://static.tope365.com/report/images/study/button_return_white.webp" alt="">
                </div>
                <div class="header_btns">
                    <span class="header_btn btn_left" id="know" @click="openWord(1)">掌握大纲单词</span>
                    <span class="header_btn btn_right" id="unknow" @click="openWord(2)">未掌握大纲单词</span>
                </div>
            </div>
        </div>
        <div class="word_content" >
            <div class="word_list">
                <div class="word_item" v-for="(item,index) in wordList" :key="index">
                    <div class="item_num">{{index+1}}</div>
                    <div class="item_content">
                        <span class="item_word">{{item.word}}</span>
                        <span class="item_tag">{{item.type}}</span>
                    </div>
                </div>
            </div>
        </div>
        <nothing v-if="iShow"></nothing>
    </div>
</template>

<script>
    //import '../../assets/common/input.scss';
    // import '../../assets/common/study.js';
    import URL from "../../assets/js/url"
    import SUCCESS from "../../assets/js/success"
    import { Indicator } from 'mint-ui'
    import Nothing from '../nothing/nothing';
    import { resolve } from 'url';

    export default {
        name:'word',
        components: {
            Nothing
        },
        data() {
            return {
                studentID:'',
                data:{},
                iShow:false,
                wordList:[],
                wordList1:[],
                // 2 认知 1 重点
                wordList2:[]
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
                console.log(this.data)
                this.wordList = [];
                var btnObj ;
                
                let btnArr = document.getElementsByClassName('header_btn');
                for(let i = 0 ; i<btnArr.length;i++){
                    btnArr[i].classList.remove('active');
                }
                if(type == 1){
                    btnObj = document.getElementById('know');
                }else{
                    btnObj = document.getElementById('unknow');
                }
                if(btnObj.className.indexOf('active') > 0){
                    btnObj.classList.remove('active');
                }else{
                    btnObj.classList.add('active');
                }
                
                this.wordList = [];
                
                if(type == 1){   
                    if(JSON.stringify(this.data.knowWord.word) == "{}" || this.data.knowWord.word == null){
                        this.iShow = true;
                        return ;
                    } else{
                        this.iShow = false;
                    }
                    if(this.data.knowWord.word[1] == null ||this.data.knowWord.word[1].length == 0){
                                return;
                            }else{
                                let wordList1 = this.data.knowWord.word[1];
                                for(let i=0;i<wordList1.length;i++){
                                    let obj = {};
                                    obj.word = wordList1[i];
                                    obj.type = '重点';
                                    this.wordList.push(obj);
                                }
                            }
                        
                            if(this.data.knowWord.word[2] == null || this.data.knowWord.word[2].length == 0){
                                return;
                            }else{
                                let wordList2 = this.data.knowWord.word[2];
                                for(let i=0;i<wordList2.length;i++){
                                    let obj = {};
                                    obj.word = wordList2[i];
                                    obj.type = '认知';
                                    this.wordList.push(obj);

                                }
                            }
                        }else if(type == 2){
                            if(JSON.stringify(this.data.unKnowWord.word) == "{}"){
                                this.iShow = true;
                                return ;
                            }else{
                                this.iShow = false;
                            }
                            if(this.data.unKnowWord.word[1] == null || this.data.unKnowWord.word[1].length == 0){
                                return;
                            }else{
                                let wordList1 = this.data.unKnowWord.word[1];
                                for(let i=0;i<wordList1.length;i++){
                                    let obj = {};
                                    obj.word = wordList1[i];
                                    obj.type = '重点';
                                    this.wordList.push(obj);

                                }
                            }
                    
                            if(this.data.unKnowWord.word[2] == null || this.data.unKnowWord.word[1].length == 0){
                                return;
                            }else{
                                let wordList2 = this.data.unKnowWord.word[2];
                                for(let i=0;i<wordList2.length;i++){
                                    let obj = {};
                                    obj.word = wordList2[i];
                                    obj.type = '认知';
                                    this.wordList.push(obj);

                                }
                            }
                        
                        }
            
            },
            getData(){
                let that = this;
                let p = new Promise((resolve,reject)=>{
                    that.axios.get(URL.url+"/front/view_report_detail/"+this.studentID).then(
                        response => {
                        if(response.status == SUCCESS.success){
                            if(response.data.code == 200){
                                Indicator.close();
                                resolve(response.data.data)
                            }
                        }
                        }
                    )   
                })
                return p;
            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.studentID = this.$route.query.studentID; 
            let that = this;
            this.getData().then((dataList)=>{
                that.data = dataList;
                that.$nextTick(function(){
                    that.openWord(1);
                })
            })
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
    
    .word{
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