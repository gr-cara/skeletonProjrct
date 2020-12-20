<template>
    <div class="time-picker">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </div>
</template>

<script>
    export default {
        methods: {
            onValuesChange(picker, values) {
                if (values[0] > values[2]) {
                    picker.setSlotValue(2, values[0]);
                }else if(values[0] == values[2]){
                    picker.setSlotValue(3, values[1]);
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
                        textAlign: 'center'
                    },{
                        divider: true,
                        content: ':',
                        className: 'slot2'
                    },{
                        flex: 1,
                        values: ['00','01', '02', '03', '04', '05', '06','07','08','09','10','11', '12', '13', '14', '15', '16','17','18','19','20','21','22','23','24'],
                        className: 'slot1',
                        textAlign: 'center'
                    },{
                        divider: true,
                        content: '-',
                        className: 'slot5'
                    },{
                        flex: 1,
                        values: ['01', '02', '03', '04', '05', '06','07','08','09','10','11', '12', '13', '14', '15', '16','17','18','19','20','21','22','23','00'],
                        className: 'slot3',
                        textAlign: 'center'
                    },{
                        divider: true,
                        content: ':',
                        className: 'slot4'
                    }, {
                        flex: 1,
                        values: ['00','01', '02', '03', '04', '05', '06','07','08','09','10','11', '12', '13', '14', '15', '16','17','18','19','20','21','22','23','24'],
                        className: 'slot3',
                        textAlign: 'center'
                    }
                ]
            };
        }
    }
</script>

<style lang="scss" scoped>
    .time-picker{
        width: 80%;
        margin: 0 auto;
    }
    
</style>
<style>
    .picker-selected{
        background:#45C017;
        border-radius: 3px;
        box-shadow:0px 4px 12px 0px rgba(48,177,0,0.3);
    }
    .picker-item.picker-selected{
        color: #fff;
    }
    .picker-item{
        left: 10%;
        width: 80%;
    }
    .picker-slot.picker-slot-divider{
        color: #45C017;
        font-weight: bold;
    }
    .picker-center-highlight:before, .picker-center-highlight:after{
        background-color: rgba(0, 0, 0, 0);
    }
</style> 