<template>
    <div>
        <picker ref="picker" class="my-picker" :slots="slots" @change="onValuesChange"></picker>
    </div>
</template>

<script>
    import { Picker } from 'mint-ui';
    export default {
        components:{
          picker:Picker
        },
        methods: {
            onValuesChange(picker, values) {
                if (values[0] > values[2] || (values[0] == values[2] && values[3] < values[1])) {
                    picker.setSlotValue(2, values[0]);
                    if(values[0] == values[2]){
                        picker.setSlotValue(3, values[1]);
                    }
                    
                }
            }
        },
        data() {
            return {
                slots: [
                    {
                        flex: 1,
                        values: ['01', '02', '03', '04', '05', '06','07','08','09','10','11', '12', '13', '14', '15', '16','17','18','19','20','21','22','23','00'],
                        className: 'slot1',
                        textAlign: 'left',

                    },{
                        divider: true,
                        content: ':',
                        className: 'slot2'
                    },{
                        flex: 1,
                        values: ['00','01', '02', '03', '04', '05', '06','07','08','09','10','11', '12', '13', '14', '15', '16','17','18','19','20','21','22','23','24'],
                        className: 'slot1',
                        textAlign: 'left'
                    },{
                        divider: true,
                        content: '-',
                        className: 'slot5'
                    },{
                        flex: 1,
                        values: ['01', '02', '03', '04', '05', '06','07','08','09','10','11', '12', '13', '14', '15', '16','17','18','19','20','21','22','23','00'],
                        className: 'slot3',
                        textAlign: 'right'
                    },{
                        divider: true,
                        content: ':',
                        className: 'slot4'
                    }, {
                        flex: 1,
                        values: ['00','01', '02', '03', '04', '05', '06','07','08','09','10','11', '12', '13', '14', '15', '16','17','18','19','20','21','22','23','24'],
                        className: 'slot3',
                        textAlign: 'right'
                    }
                ]
            }
        },
        created() {
          this.$nextTick(function () {
            var itemAll = this.$refs.picker.$el.querySelectorAll('.picker-item'),
            len = itemAll.length,
            item = null;
            for(var i=0;i<len;i++) {
              item = itemAll[i]
              item.innerHTML = '<span>'+item.innerHTML +'</span>'
            }
          })
        }
    }
</script>

<style lang="scss" scoped>
    .my-picker /deep/ {
        .picker-item {
            transition: all linear;
            &.picker-selected {
                span {
                    color: #fff;
                    z-index: 8;
                    height:29px;
                    background:rgba(69,192,23,1);
                    box-shadow:0px 4px 12px 0px rgba(48,177,0,0.3);
                    border-radius:3px
                }
            }
            span {
                display: block;
                text-align: center;
                margin-top: 3px;
                line-height: 29px;
            }
        }
        .picker-slot-center {
            color: #45C017;
            font-weight: 700
        }
        .picker-center-highlight {
            display: none;
        }
    } 
</style>