<template>
	<div class="page-shell">
		<div class="title">天气查询</div>

		<van-cell-group inset>
			<van-field
				v-model="form.city"
				label="城市"
				required
				clearable
				placeholder="请输入查询城市"
			/>
			<van-field label="起始日期" required>
				<template #input>
					<input
						v-model="form.startDate"
						class="native-input"
						type="date"
						:min="todayDate"
						:max="maxStartDate"
					/>
				</template>
			</van-field>
			<van-field label="终止日期" required>
				<template #input>
					<input
						v-model="form.endDate"
						class="native-input"
						type="date"
						:min="endMinDate()"
						:max="endMaxDate()"
					/>
				</template>
			</van-field>
		</van-cell-group>

		<div class="footer">
			<van-button type="primary" block round @click="handleConfirm">确定</van-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { showToast } from 'vant'

const dayMs = 24 * 60 * 60 * 1000

const toDateString = (date: Date) => {
	const year = date.getFullYear()
	const month = `${date.getMonth() + 1}`.padStart(2, '0')
	const day = `${date.getDate()}`.padStart(2, '0')
	return `${year}-${month}-${day}`
}

const todayDate = toDateString(new Date())
const maxStartDate = toDateString(new Date(Date.now() + 7 * dayMs))

const getEndDateFromStart = (startDate: string) => {
	const baseDate = startDate ? new Date(`${startDate}T00:00:00`) : new Date(`${todayDate}T00:00:00`)
	return toDateString(new Date(baseDate.getTime() + 7 * dayMs))
}

interface WeatherPayload {
	city: string
	startDate: string
	endDate: string
}

const emit = defineEmits<{
	(e: 'confirm', payload: WeatherPayload): void
}>()

const form = reactive({
	city: '',
	startDate: '',
	endDate: '',
})

const endMinDate = () => form.startDate || todayDate
const endMaxDate = () => getEndDateFromStart(form.startDate)

const handleConfirm = () => {
	if (!form.city.trim()) {
		showToast('请填写城市')
		return
	}
	if (!form.startDate) {
		showToast('请选择起始日期')
		return
	}
	if (!form.endDate) {
		showToast('请选择终止日期')
		return
	}
	if (form.startDate < todayDate) {
		showToast('起始日期只能从今天开始选择')
		return
	}
	if (form.endDate < form.startDate) {
		showToast('终止日期不能早于起始日期')
		return
	}
	if (form.endDate > endMaxDate()) {
		showToast('天气查询最多跨7天')
		return
	}

	const payloadEndDate = form.endDate
	const payloadStartDate = form.startDate

	emit('confirm', {
		city: form.city.trim(),
		startDate: payloadStartDate,
		endDate: payloadEndDate,
	})
	showToast('天气查询已确认')
}
</script>

<style lang="less" scoped>
.page-shell {
	padding: 12px;
	padding-bottom: 88px;
	min-height: 100vh;
	background: #f6f8fb;
}

.title {
	font-size: 18px;
	font-weight: 700;
	color: #222;
	margin: 8px 2px 12px;
}

.native-input {
	width: 100%;
	border: none;
	outline: none;
	font-size: 14px;
	color: #323233;
	background: transparent;
}

.footer {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 10px 14px 14px;
	background: linear-gradient(180deg, rgba(246, 248, 251, 0.1) 0%, #f6f8fb 36%);
	box-sizing: border-box;
}

:deep(.van-cell-group--inset) {
	margin: 0;
	border-radius: 12px;
}
</style>
