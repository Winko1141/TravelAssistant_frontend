<template>
  <div class="questionnaire">
    <div class="title">行程问卷</div>

    <van-cell-group inset>
      <van-field
        v-model="form.destination"
        label="目的地"
        required
        clearable
        placeholder="请输入游玩城市"
      />
      <van-field
        v-model="form.days"
        label="游玩天数"
        type="digit"
        required
        placeholder="请输入天数"
      />
      <van-field
        v-model="form.people"
        label="出行人数"
        type="digit"
        required
        placeholder="请输入人数"
      />
      <van-field label="出行日期" placeholder="可选">
        <template #input>
          <input v-model="form.travelDate" class="native-input" type="date" />
        </template>
      </van-field>
    </van-cell-group>

    <div class="card">
      <div class="label required">游玩节奏</div>
      <div class="chip-wrap">
        <button
          v-for="item in rhythmOptions"
          :key="item"
          type="button"
          class="chip"
          :class="{ active: form.rhythm === item }"
          @click="form.rhythm = item"
        >
          {{ item }}
        </button>
      </div>
      <van-field
        v-if="form.rhythm === '其他'"
        v-model="form.rhythmOther"
        class="other-input"
        clearable
        placeholder="请输入其他游玩节奏"
      />
    </div>

    <div class="card">
      <div class="label required">人群标签</div>
      <div class="chip-wrap">
        <button
          v-for="item in crowdOptions"
          :key="item"
          type="button"
          class="chip"
          :class="{ active: form.crowdTags.includes(item) }"
          @click="toggleCrowd(item)"
        >
          {{ item }}
        </button>
      </div>
      <van-field
        v-if="form.crowdTags.includes('其他')"
        v-model="form.crowdOther"
        class="other-input"
        clearable
        placeholder="请输入其他人群标签"
      />
    </div>

    <div class="footer">
      <van-button type="primary" block round @click="handleConfirm">确定</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { showToast } from 'vant'

type RhythmType = '悠闲慢逛' | '常规打卡' | '紧凑暴走' | '其他'
type CrowdType = '老人' | '孩童' | '学生' | '情侣' | '亲子' | '团建' | '其他'

interface QuestionnairePayload {
  destination: string
  days: number
  people: number
  travelDate?: string
  rhythm: string
  crowdTags: string[]
}

const emit = defineEmits<{
  (e: 'confirm', payload: QuestionnairePayload): void
}>()

const rhythmOptions: RhythmType[] = ['悠闲慢逛', '常规打卡', '紧凑暴走', '其他']
const crowdOptions: CrowdType[] = ['老人', '孩童', '学生', '情侣', '亲子', '团建', '其他']

const form = reactive({
  destination: '',
  days: '',
  people: '',
  travelDate: '',
  rhythm: '' as RhythmType | '',
  rhythmOther: '',
  crowdTags: [] as CrowdType[],
  crowdOther: '',
})

const toggleCrowd = (tag: CrowdType) => {
  const index = form.crowdTags.indexOf(tag)
  if (index > -1) {
    form.crowdTags.splice(index, 1)
    if (tag === '其他') {
      form.crowdOther = ''
    }
    return
  }
  form.crowdTags.push(tag)
}

const handleConfirm = () => {
  const days = Number(form.days)
  const people = Number(form.people)

  if (!form.destination.trim()) {
    showToast('请填写目的地')
    return
  }
  if (!Number.isInteger(days) || days <= 0) {
    showToast('请填写正确的游玩天数')
    return
  }
  if (!Number.isInteger(people) || people <= 0) {
    showToast('请填写正确的出行人数')
    return
  }
  if (!form.rhythm) {
    showToast('请选择游玩节奏')
    return
  }
  if (form.rhythm === '其他' && !form.rhythmOther.trim()) {
    showToast('请填写其他游玩节奏')
    return
  }
  if (form.crowdTags.length === 0) {
    showToast('请至少选择一个人群标签')
    return
  }
  if (form.crowdTags.includes('其他') && !form.crowdOther.trim()) {
    showToast('请填写其他人群标签')
    return
  }

  const rhythmValue = form.rhythm === '其他' ? form.rhythmOther.trim() : form.rhythm
  const crowdValues = form.crowdTags
    .filter((item) => item !== '其他')
    .map((item) => item.trim())

  if (form.crowdTags.includes('其他')) {
    crowdValues.push(form.crowdOther.trim())
  }

  const payload: QuestionnairePayload = {
    destination: form.destination.trim(),
    days,
    people,
    travelDate: form.travelDate || undefined,
    rhythm: rhythmValue,
    crowdTags: crowdValues,
  }

  emit('confirm', payload)
  showToast('问卷已确认')
}

</script>

<style lang="less" scoped>
.questionnaire {
  padding: 12px;
  padding-bottom: 90px;
  background: #f6f8fb;
  min-height: 100vh;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #222;
  margin: 8px 2px 12px;
}

.card {
  background: #fff;
  border-radius: 12px;
  margin-top: 12px;
  padding: 14px 12px;
}

.label {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-bottom: 10px;
}

.required::after {
  content: '*';
  color: #ee0a24;
  margin-left: 4px;
}

.chip-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.other-input {
  margin-top: 10px;
}

.chip {
  border: 1px solid #d8dde5;
  background: #fff;
  color: #444;
  border-radius: 18px;
  padding: 7px 14px;
  font-size: 13px;
  line-height: 1;
}

.chip.active {
  border-color: #1989fa;
  color: #1989fa;
  background: #edf4ff;
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