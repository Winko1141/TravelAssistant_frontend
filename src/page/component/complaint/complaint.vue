<template>
	<div class="complaint-page">
		<div class="title">投诉模版</div>

		<van-cell-group inset>
			<van-field
				v-model="form.city"
				label="事发城市"
				required
				clearable
				placeholder="请输入事发城市"
			/>
			<van-field
				v-model="form.address"
				label="详细地址"
				required
				clearable
				placeholder="请输入详细地址"
			/>
			<van-field
				label="问题类型"
				required
			>
				<template #input>
					<div class="tag-group">
						<button
							v-for="item in issueOptions"
							:key="item"
							type="button"
							class="tip-tag"
							:class="{ active: form.issueType === item }"
							@click="form.issueType = item"
						>
							{{ item }}
						</button>
					</div>
				</template>
			</van-field>
			<van-field
				v-if="form.issueType === '其他权益纠纷'"
				v-model="form.issueOther"
				class="other-input"
				clearable
				placeholder="请输入其他问题类型"
			/>
			<van-field
				v-model="form.description"
				label="问题描述"
				required
				rows="4"
				autosize
				type="textarea"
				maxlength="500"
				show-word-limit
				placeholder="请详细描述发生了什么、涉及谁、造成了什么影响"
			/>
		</van-cell-group>

		<div class="tips-card">
			<div class="tips-title">常见问题类型参考</div>
			<div class="tips-list">
				<span v-for="item in issueOptions.slice(0, -1)" :key="item" class="tip-tag">{{ item }}</span>
			</div>
		</div>

		<div class="footer">
			<van-button type="primary" block round @click="handleConfirm">确认并提交</van-button>
		</div>

	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { showToast } from 'vant'

interface ComplaintPayload {
	city: string
	address: string
	issueType: string
	description: string
}

const emit = defineEmits<{
	(e: 'confirm', payload: ComplaintPayload): void
}>()

const issueOptions = [
	'阴阳菜单',
	'天价出租车',
	'门票黄牛',
	'食品变质',
	'虚假宣传',
	'强制消费',
	'退改签纠纷',
	'住宿纠纷',
	'购物欺诈',
	'服务态度问题',
	'其他权益纠纷',
]

const form = reactive({
	city: '',
	address: '',
	issueType: '',
	issueOther: '',
	description: '',
})

const handleConfirm = () => {
	if (!form.city.trim()) {
		showToast('请填写事发城市')
		return
	}
	if (!form.address.trim()) {
		showToast('请填写详细地址')
		return
	}
	if (!form.issueType) {
		showToast('请选择问题类型')
		return
	}
	if (form.issueType === '其他权益纠纷' && !form.issueOther.trim()) {
		showToast('请补充其他问题类型')
		return
	}
	if (!form.description.trim()) {
		showToast('请填写问题描述')
		return
	}

	const payload: ComplaintPayload = {
		city: form.city.trim(),
		address: form.address.trim(),
		issueType: form.issueType === '其他权益纠纷' ? form.issueOther.trim() : form.issueType,
		description: form.description.trim(),
	}

	emit('confirm', payload)
	showToast('投诉模板已生成')
}
</script>

<style lang="less" scoped>
.complaint-page {
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

.other-input {
	margin-top: 8px;
}

.tag-group {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	width: 100%;
	padding: 4px 0;
}

.tips-card {
	margin-top: 12px;
	background: #fff;
	border-radius: 12px;
	padding: 14px 12px;
}

.tips-title {
	font-size: 14px;
	font-weight: 600;
	color: #333;
	margin-bottom: 10px;
}

.tips-list {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.tip-tag {
	display: inline-flex;
	align-items: center;
	padding: 6px 10px;
	border-radius: 999px;
	background: #f3f7ff;
	color: #3969d6;
	font-size: 12px;
	border: 1px solid transparent;
	line-height: 1;
	box-sizing: border-box;
	cursor: pointer;
}

.tip-tag.active {
	background: #e8f0ff;
	border-color: #3969d6;
	font-weight: 600;
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
