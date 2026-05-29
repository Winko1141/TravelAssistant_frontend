<template>
  <div class="complaint-card">
    <h3 class="complaint-title">投诉建议</h3>

    <div class="section">
      <h4>推荐受理部门</h4>
      <ul>
        <li v-for="(d, i) in (data.recommendedDepartments || [])" :key="i" class="dept-item">
          <div class="dept-name">{{ d.name }}</div>
          <div class="dept-reason">{{ d.reason }}</div>
          <div class="dept-contact">{{ d.contact }}</div>
        </li>
      </ul>
    </div>

    <div class="section">
      <h4>投诉渠道</h4>
      <ul>
        <li v-for="(c, i) in (data.channels || [])" :key="i" class="channel-item">
          <div class="channel-name">{{ c.name }}</div>
          <div class="channel-desc">{{ c.description }}</div>
        </li>
      </ul>
    </div>

    <div class="section phones">
      <h4>举报电话</h4>
      <div class="phones-list">
        <span v-for="(p, i) in (data.reportPhones || [])" :key="i" class="phone">{{ p }}</span>
      </div>
    </div>

    <div class="section">
      <h4>投诉话术（可复制）</h4>
      <pre class="script">{{ data.script }}</pre>
      <button class="copy-btn" @click="copyText(data.script || '')">复制话术</button>
    </div>

    <div class="section timeline">
      <h4>时间线</h4>
      <ol>
        <li v-for="(t, i) in (data.timeline || [])" :key="i" class="timeline-item">
          <div class="timeline-head"><strong>{{ t.stage }}</strong> <span class="duration">{{ t.expectedDuration }}</span></div>
          <ul>
            <li v-for="(m, k) in (t.requiredMaterials || [])" :key="k">{{ m }}</li>
          </ul>
        </li>
      </ol>
    </div>

    <div class="section materials">
      <h4>材料核对清单</h4>
      <ul>
        <li v-for="(it, i) in (data.materialsChecklist || [])" :key="i"><strong>{{ it.item }}：</strong>{{ it.description }}</li>
      </ul>
    </div>

    <div class="section summary">
      <h4>总结</h4>
      <p>{{ data.summary }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">


const props = defineProps<{ data: any }>();
const data = props.data || {};

const copyText = async (text: string) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      alert('已复制到剪贴板');
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert('已复制到剪贴板');
    }
  } catch (e) {
    console.error('复制失败', e);
    alert('复制失败，请手动复制');
  }
}
</script>

<style lang="less" scoped>
.complaint-card {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-left: 8px;
  margin-top: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  max-width: 720px;
}

.complaint-card .complaint-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #111;
}

.complaint-card .section { margin-bottom: 10px; }
.complaint-card h4 { margin: 4px 0; font-size: 14px; color:#333 }
.complaint-card .dept-name, .complaint-card .channel-name { font-weight: 600 }
.complaint-card .dept-reason, .complaint-card .channel-desc { color:#666; margin-top:4px }
.complaint-card .dept-contact { color:#007acc; margin-top:4px }
.complaint-card .phones-list { display:flex; gap:8px; flex-wrap:wrap }
.complaint-card .phone { background:#f5f7fb; padding:4px 8px; border-radius:4px; color:#333 }
.complaint-card .script { background:#f7f7f9; padding:8px; border-radius:4px; white-space:pre-wrap }
.complaint-card .copy-btn { margin-top:6px; background:#007acc; color:#fff; border:none; padding:6px 10px; border-radius:4px; cursor:pointer }
.complaint-card .timeline-head { margin-bottom:6px }
.complaint-card .duration { color:#888; margin-left:8px; font-size:12px }
.complaint-card .materials ul, .complaint-card .timeline ul { margin:6px 0 0 16px }
</style>
