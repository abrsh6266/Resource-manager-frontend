<template>
    <button class="btn" :style="{background :color}">{{text}}</button>
</template>
<script>
export default{
    name:'Button',
    props:{
        text:String,
        color:String,
    },
    methods:{
        onClick(){
            this.$emit('toggle',this.text)
        }
    }
}
</script>