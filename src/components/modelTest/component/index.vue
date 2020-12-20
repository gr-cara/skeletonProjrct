<template>
    <div class="border-red">
        <h5 class="text-center">这是一个子组件</h5>
        <input v-model="childData" type="text" />
        <p>{{'父组件传来的'+parentData}}</p>
    </div>
</template>

<script>
    export default {
        model:{
            prop:'parentData',
            event:'fn'
        },
        props:['parentData'],
        data() {
            return {
                childData: 'happy new year!'
            }
        },
        watch: {
            childData(oldV,newV){
                if(oldV!=newV){
                    this.$emit('fn',this.childData)
                }
            },
            parentData(val){
                this.childData = val
            }
        },
        methods: {
            
        },
        created() {
           this.childData = this.parentData 
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