<template>
    <div class="site">

        <!--        <h1>组件测试</h1>-->

        <h-search-form :icons="icons" :searchParam="searchParam" :columns="searchColumns" :loading="loading"
                       @search="searchHandler"></h-search-form>
    </div>
</template>
<script lang="ts" setup>
import {Refresh, Search} from '@element-plus/icons-vue'
import {ref} from 'vue'


const icons = ref({search: Search, reset: Refresh})
// 默认参数
const searchParam = ref({
    name:'11111111'
})

const shortcuts = [
    {
        text: 'Last week',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: 'Last month',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: 'Last 3 months',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    }]
const searchColumns = ref([
    {
        key: 'name', label: '名称', type: 'input', attrs: {
            placeholder: '请输入1'
        }
    },
    {
        key: 'class', label: '班级', type: 'select', 
        attrs:{
            placeholder: '请选择',
        },
        children: [
            {label: '一年级', value: '1'}
        ]
    },
    {
        key: 'sex', label: '性别', type: 'switch'
    },
    {
        key: 'book', label: '图书', type: 'radio-group',
        children: [
            {label: '自然', value: 'zr'}
        ]
    }, {
        key: 'date', label: '日期', type: 'date-picker', attrs: {
            type: 'datetimerange',
            'range-separator': "To",
            'start-placeholder': "Start date",
            'end-placeholder': "End date",
            shortcuts: shortcuts
        }
    }
])

const loading = ref(false)

const searchHandler = (e:any) => {
    loading.value = true
    console.log(e, 'searchHandler')
    setTimeout(_ => {
        loading.value = false
    }, 1000)
}
</script>

<style lang="scss" scoped>
.site {
    padding: 20px;
}
</style>
