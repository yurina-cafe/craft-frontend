<script setup lang="ts">
  import { ActivityType } from "~/types/activity";
  import { type CraftFormatTime } from "@/types/time";
  import { useDayStore } from "~/stores/day";

  const open = defineModel();
  const props = defineProps<{
    initType: ActivityType;
    appointmentTime: CraftFormatTime;
  }>();

  const emits = defineEmits<{
    (e: "add", v: object): void;
  }>();

  const { addDayActivity } = useDayStore();

  const modalStatus = computed(() => {
    return open.value ? "modal-open" : "modal-close";
  });

  const close = () => {
    open.value = false;
  };

  const confirm = async () => {
    if (!validate()) return;

    await addDayActivity(form.value.created, form.value);
    emits("add", form.value);
    open.value = false;
  };

  const validate = () => {
    if (!form.value.created) {
      return false;
    }

    if (type.value === ActivityType.CLOCK) {
      // @todo validate clock
    } else if (type.value === ActivityType.NOTE) {
      // @todo validate note
    } else if (type.value === ActivityType.CHECKLIST) {
      // @todo validate checklist
    }
    return true;
  };

  const type = ref(props.initType);
  const typeToTextMapping = {
    [ActivityType.CLOCK]: "番茄钟 Clock",
    [ActivityType.NOTE]: "笔记 Note",
    [ActivityType.CHECKLIST]: "备忘 Check",
  };

  const form = ref();
</script>

<template>
  <button v-show="false" class="btn" onclick="activity_add_dialog.showModal()">
    open modal
  </button>
  <dialog id="activity_add_dialog" class="modal" :class="modalStatus">
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">
        给{{ checkIsTodayOrTomorrow($props.appointmentTime) }}添加一项活动
      </h3>
      <div class="type">
        <span>类型</span>
        <select
          v-model="type"
          class="ml-2 select select-sm select-bordered w-[200px] max-w-xs"
        >
          <option disabled selected>选择添加活动的类型</option>
          <option
            v-for="a in [
              ActivityType.CLOCK,
              ActivityType.NOTE,
              ActivityType.CHECKLIST,
            ]"
            :value="a"
            @click="type = a"
          >
            {{ typeToTextMapping[a] }}
          </option>
        </select>
      </div>

      <div class="form mt-4">
        <DialogActivityForm
          :type="type"
          :appointment-time="props.appointmentTime"
          @update="(v) => (form = v)"
        ></DialogActivityForm>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="close">取消</button>
        </form>
        <button class="btn btn-primary" @click="confirm">确认</button>
      </div>
    </div>
  </dialog>
</template>

<style lang="scss" scoped></style>
