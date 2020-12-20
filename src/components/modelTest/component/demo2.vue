<template>
    <div class="border-red">
        <h5 class="text-center">这是第二个子组件</h5>
        <input v-model="childData" type="text" />
        <p>{{'父组件传来的'+ childData}}</p>
    </div>
</template>

<script>
    export default {
        props:{
            value:String
        },
        data() {
            return {
                childData: ''
            }
        },
        watch: {
            'value':{
                immediate: true, // immediate选项可以开启首次赋值监听
                handler(newVal, oldVal) {
                    this.childData = newVal
                }
            },
            childData(newV,oldV){
                this.$emit('input',this.childData)
            }
        },
        methods: {
            
        },
        created() {
          
        },
    }
</script>

<style lang="scss" scoped>
    .text-center{
        text-align: center
    }
    .border-red{
        border: 1px solid red
    }
</style>