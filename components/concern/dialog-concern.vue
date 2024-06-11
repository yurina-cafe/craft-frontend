<script setup lang="ts">
  const open = defineModel();

  const emits = defineEmits<{
    (e: "addConcern", value: string): void;
  }>();

  const modalStatus = computed(() => {
    return open.value ? "modal-open" : "modal-close";
  });

  const close = () => {
    open.value = false;
  };

  const confirm = () => {
    if (addConcern(concernAddValue.value)) {
      close();
    }
  };

  const concernAddValue = ref("");
  const addConcern = (name: string) => {
    if (name.length < 2 || name.length > 7) {
      alert("ID 长度应为 2 到 7 位");
      return;
    }
    const csInStorage = localStorage.getItem("concern");
    const concerns: string[] = csInStorage ? JSON.parse(csInStorage) : [];
    if (concerns.includes(name)) {
      alert("已关注该用户");
      return;
    }
    concerns.push(name);
    localStorage.setItem("concern", JSON.stringify(concerns));
    emits("addConcern", name);
    return true;
  };
</script>

<template>
  <button v-show="false" class="btn" onclick="concern_modal.showModal()">
    open modal
  </button>
  <dialog id="concern_modal" class="modal" :class="modalStatus">
    <div class="modal-box">
      <h3 class="font-bold text-lg">添加更多用户</h3>
      <p class="py-4">输入你想关注的用户 ID</p>
      <input
        v-model="concernAddValue"
        type="text"
        class="input input-bordered w-full max-w-xs"
        placeholder="请输入用户 ID"
      />
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
