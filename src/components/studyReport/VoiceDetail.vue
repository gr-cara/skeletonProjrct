<template>
    <div>
        <header class="text-center box-shadow">
            <div class="back" @click="back">
                <img src="https://static.tope365.com/report/images/study/button_return.webp" alt="">
            </div>
            语音报告
        </header>
        <div class="report-detail">
            <audio ref="audio" @timeupdate="onTimeupdate" @loadedmetadata="onLoadedmetadata"
                :src="dataList.mp3Url"></audio>
            <div class="container">
                <div class="" v-html="dataList.html"></div>
            </div>
            <div class="footer">
                <div class="btn" @click="playAudio()">
                    <p class="suspended" v-show="!playShow">
                        <img  src="https://static.tope365.com/report/images/study/button_play.webp" alt="">
                    </p>
                    <p class="play" v-show="playShow">
                        <img src="https://static.tope365.com/report/images/study/button_psuspend.webp" alt="">
                    </p>
                </div>
                <span class="startTime time">{{dataList.duration}}</span>
                <div class="progress_bar">
                    <div class="progress">
                        <div class="inner"></div>
                    </div>
                </div>
                <span class="endTime time">{{playProgress}}</span>
            </div>
        </div>
        <voice-modal v-if="isDubbing"></voice-modal>
    </div>
</template>

<script>
    import $ from 'jquery'
    import URL from "../../assets/js/url"
    import SUCCESS from "../../assets/js/success"
    import VoiceModal from './components/voiceModal'
    export default {
        inject:['reload'],
        data() {
            return {
                html: "",
                mp3Url:"",
                playShow: false,
                isSelected:false,
                playProgress: "00:00",
                sliderTime: 0,
                audio: {
                    // 音频当前播放时长
                    currentTime: 0,
                    // 音频最大播放时长
                    maxTime: 0
                },
                currentSenIndex:0,
                progressTime:[],
                dataList:{
                  /* coverUrl: "http://dictjson.tope365.com/ipeiyin/book/3268/img/mfe2g9mczc_15177409408491.jpg",
                  createTime: "2019-07-19 05:14:24",
                  duration: "0:24",
                  ebookName: "Level 2-103268 Informational Text",
                  html: "<div class='content'><i></i><div class='img_box'><img src='https://dictjson.tope365.com/ipeiyin/book/3268/img/mfe2g9mczc_15177409408491.jpg'></div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id='1'>Let's Make a Salad!</span></p><div class='img_box'><img src='https://dictjson.tope365.com/ipeiyin/book/3268/img/9k2rbtm11o_15177409407382.jpg'></div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id='2'>He gets the lettuce.</span></p><div class='img_box'><img src='https://dictjson.tope365.com/ipeiyin/book/3268/img/dlcofoxchf_15177409406303.jpg'></div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id='3'>He gets the carrots.</span></p><div class='img_box'><img src='https://dictjson.tope365.com/ipeiyin/book/3268/img/acfgkl0cli_15177409412854.jpg'></div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id='4'>He gets the tomatoes.</span></p><div class='img_box'><img src='https://dictjson.tope365.com/ipeiyin/book/3268/img/ob2plrt1g6_15177409411715.jpg'></div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id='5'>He gets the peppers.</span></p><div class='img_box'><img src='https://dictjson.tope365.com/ipeiyin/book/3268/img/y64iloj3bl_15177409409856.jpg'></div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id='6'>He gets the radishes.</span></p><div class='img_box'><img src='https://dictjson.tope365.com/ipeiyin/book/3268/img/ir7kcexw4c_15177409408767.jpg'></div><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id='7'>He gets the cheese.</span></p></div><audio style='display: none;' preload='auto' id='my_voice' controls='' src='https://dictjson.tope365.com/ipeiyin/student/8470/3268/201907181424_8470-3268.mp3'></audio>",
                  isThumbUp: 1,
                  mp3Url: "https://dictjson.tope365.com/ipeiyin/student/8470/14199/201803140451_8470-14199.mp3",
                  progress: "[[1,0,3],[2,3,6],[3,6,10],[4,10,14],[5,14,17],[6,17,21],[7,21,24]]",
                  readNum: 0,
                  studentName: "张鹏宇",
                  thumbUpNum: 1 */
                },
                studentEbookID:'',
                isDubbing:false
            }
        },
        components:{VoiceModal},
        methods:{
            back(){
               this.$router.go(-1)
            },
            onLoadedmetadata(res) {
                this.audio.maxTime = parseInt(res.target.duration);
            },
            onTimeupdate(res) {
              console.log(res)
                $('#'+(this.currentSenIndex+1)).addClass('bg');
                if(this.currentSenIndex < this.progressTime.length){
                    var timeArray = this.progressTime[this.currentSenIndex];
                    var startTime = timeArray[1];
                    var endTime = timeArray[2];
                    this.audio.currentTime = res.target.currentTime;
                    var currentPayTime = res.target.currentTime;
                    if(currentPayTime >= endTime && currentPayTime <= this.audio.maxTime){
                        this.currentSenIndex++;
                        $('#'+(this.currentSenIndex+1)).addClass('bg').parent().siblings().find('span').removeClass('bg');
                        $('html,body').animate({ scrollTop: $('#'+this.currentSenIndex).parent().offset().top + 160});
                    }
                }
                Number.prototype.formatTime=function(){
                    // 计算
                    var h=0,i=0,s=parseInt(this);
                    if(s>60){
                        i=parseInt(s/60);
                        s=parseInt(s%60);
                        if(i > 60) {
                        i = parseInt(i%60);
                        }
                    }
                    // 补零
                    var zero=function(v){
                        return (v>>0)<10?"0"+v:v;
                    };
                    return [zero(i),zero(s)].join(":");
                };
                this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100);
                this.inner.style.width = this.sliderTime + "%";
                if (this.sliderTime >= 100) {
                    this.playShow = false;
                    this.currentSenIndex=0;
                    this.top()
                    //this.reload()
                    
                }
                this.playProgress=Number(this.audio.currentTime).formatTime();
            },
            playAudio() {
                if (this.playShow) {
                    this.playShow = false;
                    this.$refs.audio.pause();
                } else {
                    this.playShow = true;
                    this.$refs.audio.play();
                } 
            },
            top(){
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            },
            getBookDetail(){
              this.axios.get(URL.url+'/front/student_ebook/get/'+this.studentEbookID).then(response=>{
                if (response.status === SUCCESS.success) {
                    if(response.data.code == 200){
                      this.mp3Url= response.data.data.mp3Url;
                      this.title= response.data.data.studentName;
                      this.summary= response.data.data.ebookName;
                      this.dataList = response.data.data
                      this.html = this.dataList.html;
                      this.progressTime =eval(this.dataList.progress);
            
                    }
                }
              })
            }
        },
        created(){
            this.studentEbookID = this.$route.query.studentEbookID;

            this.getBookDetail()
            /* this.mp3Url= this.dataList.mp3Url;
            this.title= this.dataList.studentName;
            this.summary= this.dataList.ebookName;
            this.dataList = response.data.data
            this.html = this.dataList.html;
            this.progressTime =eval(this.dataList.progress); */
        },
        mounted(){
            this.inner = document.querySelector(".inner");
        }
    }
</script>

<style lang="scss" scoped>
    header{
        position: fixed;
        width: 100%;
        background: #fff;
        color: #71BDFF;
        font-size: .9rem;
        line-height: 3rem;
        top: 0;
        .back{
            position: absolute;
            width: 2rem;
            left: 1rem;
            top: .5rem;
            img{
              width: 100%;  
            }
        }
    }
    img{
        vertical-align: inherit;
    }
    .report-detail {
    width: 100%;
    color: #566776;
    margin-top: 3rem;
    .container {
      width: 100%;
      padding-bottom: 3rem;
      background:#F9F3D3;
      .info {
        width: 100%;
        margin: 0 auto;
        padding: 1rem 0;
        border-bottom: 2px solid #d7d3bd;
        background-color: #fcf9ec;
        .info_con {
          width: 90%;
          height: 5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 auto;
        }
        .coverUrl {
          width: 5rem;
          height: 5rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .center {
          .ebookName {
            font-weight: 400;
            width: 18rem;
            overflow: hidden;
            text-overflow: ellipsis;
            color: rgba(80, 80, 80, 1);
            line-height: 1.4rem;
            word-break: break-all;
            white-space: nowrap;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;

          }
          .bot {
            margin-top: 0.5rem;
            .createTime{
              font-size: .6rem;
            }
            .readNum {
              font-size: .6rem;
              margin-left: 0.8rem;
            }
          }
        }
        .right {
          display: flex;
          font-size: .6rem;
          .thumbUpNum, .collection {
            text-align: center;
          }
          .active{
            color: #34d616;
          }
          .collection {
            margin-left: 1rem;
          }
          img{
              width: 1rem;
          }
        }
      }
    }

    
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 1rem;
      background: #fff;
      border-top: 1px solid rgba(220, 220, 220, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .suspended,.play{
        width: 1rem;
        height: 1rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .time {
        font-size: 0.52rem;
        font-weight: 400;
        color: #34D616;
        line-height: 1.64rem;
      }
      .progress_bar {
        width: 70%;
        .progress {
          position: relative;
          margin: 0 auto;
          width: 100%;
          height: 0.2rem;
          background: #E9E9E9;
          border-radius: 1rem;
          overflow: hidden;
          .inner {
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            height: 0.2rem;
            background: #34D616;
            border-radius: 1rem;
            width: 0%;
          }
        }
      }
    }

  }
</style>
<style>
  .content {
    width: 90%;
    margin: 2rem auto;
    font-size: 1rem;
  }

  .img_box {
    width: 95%;
    height: 21rem;
    margin: 0 auto;
  }

  .img_box img {
    width: 100%;
    height: 100%;
  }

  .content p {
    margin: 1rem 0;
    font-weight: 400;
    display: inline-block;
    color: rgba(80, 80, 80, 1);
    line-height: 1.64rem;
  }
  .bg{
    color: #4caf50;
  }
</style>