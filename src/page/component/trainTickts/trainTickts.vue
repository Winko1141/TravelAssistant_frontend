<template>
	<div class="page-shell">
		<div class="title">火车票查询</div>

		<van-cell-group inset>
			<van-field
				v-model="form.origin"
				label="起始地"
				required
				clearable
				placeholder="请输入出发城市"
			/>
			<van-field
				v-model="form.destination"
				label="目的地"
				required
				clearable
				placeholder="请输入到达城市"
			/>
			<van-field label="出行日期" required>
				<template #input>
					<input
						v-model="form.travelDate"
						class="native-input"
						type="date"
						:min="minTravelDate"
						:max="maxTravelDate"
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

const today = new Date()
const minTravelDate = toDateString(today)
const maxTravelDate = toDateString(new Date(today.getTime() + 15 * dayMs))

interface TrainTicketPayload {
	origin: string
	destination: string
	travelDate: string
}

const emit = defineEmits<{
	(e: 'confirm', payload: TrainTicketPayload): void
}>()

const form = reactive({
	origin: '',
	destination: '',
	travelDate: '',
})

const handleConfirm = () => {
	if (!form.origin.trim()) {
		showToast('请填写起始地')
		return
	}
	if (!form.destination.trim()) {
		showToast('请填写目的地')
		return
	}
	if (!form.travelDate) {
		showToast('请选择出行日期')
		return
	}
	if (form.travelDate < minTravelDate || form.travelDate > maxTravelDate) {
		showToast('出行日期只能选择今天到15天内')
		return
	}

	emit('confirm', {
		origin: form.origin.trim(),
		destination: form.destination.trim(),
		travelDate: form.travelDate,
	})
	showToast('火车票查询已确认')
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
